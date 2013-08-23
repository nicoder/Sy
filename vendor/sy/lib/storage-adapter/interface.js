namespace('Sy.Lib.Storage');

Sy.Lib.Storage.Interface = function () {};

Sy.Lib.Storage.Interface.prototype = Object.create(Object.prototype, {

    config: {
        value: {},
        writable: false,
        configurable: true
    },

    get: {
        value: function (options) { return; }
    },

    getAll: {
        value: function (options) { return []; }
    },

    create: {
        value: function (options) { return this; }
    },

    update: {
        value: function (options) { return this; }
    },

    find: {
        value: function (options) { return []; }
    },

    remove: {
        value: function (options) { return this; }
    },

    clear: {
        value: function (options) { return this; }
    },

    setConfig: {

        value: function (object) {

            this.config = object;

            return this;

        }
    }

});