namespace('Sy.Lib.StorageAdapter');

Sy.Lib.StorageAdapter.Interface = function (name) {

    this.name = name || {};

};

Sy.Lib.StorageAdapter.Interface.prototype = Object.create(Object.prototype, {

    config: {
        value: {},
        writable: false,
        configurable: true
    },

    /**
     * Adapters need to be aware of the storage, so when the data is retrieved we can inject it in
     * @type {Sy.Lib.Storage}
     */
    storage: {
        value: {},
        writable: true,
        configurable: true
    },

    mediator: {
        value: null,
        writable: true,
        configurable: true
    },

    get: {
        value: function (options) { return this; }
    },

    getAll: {
        value: function (options) { return this; }
    },

    create: {
        value: function (options) { return this; }
    },

    update: {
        value: function (options) { return this; }
    },

    find: {
        value: function (options) { return this; }
    },

    remove: {
        value: function (options) { return this; }
    },

    setConfig: {

        value: function (object) {

            this.config = object;

            return this;

        }
    },

    setStorage: {
        value: function (object) {

            this.storage = object;

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