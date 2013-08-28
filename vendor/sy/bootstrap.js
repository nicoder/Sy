namespace('Sy');

Sy.service = new Sy.Service('core');

Sy.service.set('core::generator::uuid', function () {
    return new Sy.Lib.Generator.UUID();
});

Sy.service.set('core::mediator', function () {
    var m = new Sy.Lib.Mediator();
    m.setGenerator(Sy.service.get('core::generator::uuid'));

    return m;
});

Sy.service.set('core::server::codes', function () {
    return new Sy.Lib.HttpCode();
});

Sy.service.set('core::server::rest', function () {
    var rest = new Sy.Lib.REST();

    rest.setHttpCode(Sy.service.get('core::server::codes'));

    return rest;
});

Sy.service.set('core::config', function () {
    return new Sy.Configurator();
});

Sy.service.set('core::storage::factory', function () {
    var factory =  new Sy.Lib.StorageFactory();

    factory.setConfig(Sy.service.get('core::config'));
    factory.setRest(Sy.service.get('core::server::rest'));
    factory.setMediator(Sy.service.get('core::mediator'));

    return factory;
});

Sy.service.set('core::stack::factory', function () {
    var factory = new Sy.StackFactory();

    factory.setGenerator('uuid', Sy.service.get('core::generator::uuid'));
    factory.setMediator(Sy.service.get('core::mediator'));

    return factory;
});