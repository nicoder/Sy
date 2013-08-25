namespace('Sy.Lib');

Sy.Lib.StorageFactory = function () {};

Sy.Lib.StorageFactory.prototype = Object.create(Object.prototype, {

    adapters: {
        value: {
            // indexeddb: Sy.Lib.StorageAdapter.IndexedDB,
            // localstorage: Sy.Lib.StorageAdapter.LocalStorage,
            server: Sy.Lib.StorageAdapter.Server
            // sessionstorage: Sy.Lib.StorageAdapter.SessionStorage
        },
        writable: false,
        configurable: false
    },

    config: {
        value: null,
        writable: true,
        configurable: true
    },

    rest: {
        value: null,
        writable: true,
        configurable: true
    },

    mediator: {
        value: null,
        writable: true,
        configurable: true
    },

    get: {
        value: function (name, adapter) {

            var storage = new Sy.Lib.Storage(name),
                queue = new Sy.Lib.StorageQueue(),
                engine = null;

            if (adapter !== undefined) {

                if (this.adapters[adapter]) {

                    engine = new this.adapters[adapter](name);

                } else {

                    throw 'Unknown adapter';

                }

                if(!(engine instanceof Sy.Lib.StorageAdapter.Interface)) {

                    throw 'Invalid adapter';

                }

                storage.setEngine(engine);
                engine.setStorage(storage);
                engine.setMediator(this.mediator);

                switch (adapter) {
                    case 'server':
                        engine.setRest(this.rest);
                        engine.setApi(this.config.get('server').api);
                        break;
                }

            }

            storage.setQueue(queue);

            return storage;

        }
    },

    setConfig: {
        value: function (object) {

            this. config = object;

            return this;

        }
    },

    setRest: {
        value: function (object) {

            this.rest = object;

            return this;

        }
    },

    setMediator: {
        value: function (object) {

            this.mediator = object;

            return this;

        }
    }

});