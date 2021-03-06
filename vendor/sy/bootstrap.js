namespace('Sy');

Sy.service = new Sy.ServiceContainer('sy::core');

Sy.service.set('sy::core::generator::uuid', function () {

    return new Sy.Lib.Generator.UUID();

});

Sy.service.set('sy::core::mediator', function () {

    var m = new Sy.Lib.Mediator();

    m.setGenerator(this.get('sy::core::generator::uuid'));
    m.setLogger(this.get('sy::core::logger'));

    return m;

});

Sy.service.set('sy::core::logger', function () {

    var logger = new Sy.Lib.Logger.CoreLogger('core'),
        info = new Sy.Lib.Logger.Handler.Console(logger.INFO),
        debug = new Sy.Lib.Logger.Handler.Console(logger.DEBUG),
        error = new Sy.Lib.Logger.Handler.Console(logger.ERROR),
        log = new Sy.Lib.Logger.Handler.Console(logger.LOG);

    logger.setHandler(info, logger.INFO);
    logger.setHandler(debug, logger.DEBUG);
    logger.setHandler(error, logger.ERROR);
    logger.setHandler(log, logger.LOG);

    return logger;

});

Sy.service.set('sy::core::http', function () {

    var parser = new Sy.HTTP.HeaderParser(),
        manager = new Sy.HTTP.Manager();

    manager.setParser(parser);
    manager.setGenerator(this.get('sy::core::generator::uuid'));

    return manager;

});

Sy.service.set('sy::core::http::rest', function () {

    var rest = new Sy.HTTP.REST();

    rest.setManager(this.get('sy::core::http'));

    return rest;

});

Sy.service.set('sy::core::storage', function () {

    var meta = [
            {
                name: 'DefaultBundle::Todo',
                repository: Sy.Storage.Repository,
                entity: App.Bundle.DefaultBundle.Entity.Todo,
                indexes: [],
                uuid: 'uuid'
            }
        ],
        storage = new Sy.Storage.Core(),
        managerFact = new Sy.Storage.ManagerFactory(),
        repositoryFact = new Sy.Storage.RepositoryFactory(),
        engineFact = new Sy.Storage.EngineFactory(),
        conf = Sy.config.get('storage');

    repositoryFact
        .setMetaRegistry(new Sy.Registry())
        .setRepoRegistry(new Sy.Registry())
        .setMeta(meta)
        .setGenerator(Sy.service.get('sy::core::generator::uuid'));

    for (var engineName in conf.engines) {
        if (conf.engines.hasOwnProperty(engineName)) {
            engineFact.setEngine(engineName, conf.engines[engineName]);
        }
    }

    managerFact
        .setEngineFactory(engineFact)
        .setRepositoryFactory(repositoryFact);

    for (var name in conf.managers) {
        if (conf.managers.hasOwnProperty(name)) {
            var manager = managerFact.make(name, conf.managers[name], meta);

            storage.setManager(name, manager);
        }
    }

    return storage;

});

Sy.config = new Sy.Configurator();

Sy.config.set({
    env: 'prod',
    storage: {
        engines: {
            rest: function (version, entitiesMeta) {

                var engine = new Sy.Storage.Engine.Rest(version);

                engine.setManager(Sy.service.get('sy::core::http::rest'));
                engine.setPattern('/api/{{version}}/{{path}}/{{key}}');

                for (var i = 0, l = entitiesMeta.length; i < l; i++) {
                    engine.setStore(
                        entitiesMeta[i].name,
                        entitiesMeta[i].name.toLowerCase().replace('::', '/'),
                        entitiesMeta[i].uuid,
                        entitiesMeta[i].indexes
                    );
                }

                return engine;

            },
            indexeddb: function (version, entitiesMeta) {

                var engine =  new Sy.Storage.Engine.IndexedDB(version);

                for (var i = 0, l = entitiesMeta.length; i < l; i++) {
                    engine.setStore(
                        entitiesMeta[i].name,
                        entitiesMeta[i].name.toLowerCase(),
                        entitiesMeta[i].uuid,
                        entitiesMeta[i].indexes.concat(entitiesMeta[i].uuid)
                    );
                }

                engine
                    .setConnection(
                        window.indexedDB ||
                        window.webkitIndexedDB ||
                        window.mozIndexedDB ||
                        window.msIndexedDB
                    )
                    .setTransaction(
                        window.IDBTransaction ||
                        window.webkitIDBTransaction
                    )
                    .setKeyRange(
                        window.IDBKeyRange ||
                        window.webkitIDBKeyRange
                    )
                    .setLogger(
                        Sy.service.get('sy::core::logger')
                    )
                    .open();

                return engine;

            },
            localstorage: function (version, entitiesMeta) {

                var engine = new Sy.Storage.Engine.Localstorage(version);

                for (var i = 0, l = entitiesMeta.length; i < l; i++) {
                    engine.setStore(
                        entitiesMeta[i].name,
                        entitiesMeta[i].name.toLowerCase(),
                        entitiesMeta[i].uuid,
                        entitiesMeta[i].indexes
                    );
                }

                engine.setStorage(window.localStorage);
                engine.open();

                return engine;

            }
        }
    }
});