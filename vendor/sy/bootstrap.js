namespace('Sy');

Sy.service = new Sy.Service('core');

Sy.service.set('core::generator::uuid', function () {
    return new Sy.Lib.Generator.UUID();
});

Sy.service.set('core::server::codes', function () {
    return Sy.Lib.HttpCode;
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
    return new Sy.Lib.StorageFactory();
});