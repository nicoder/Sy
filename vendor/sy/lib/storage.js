//by default will use the queue interface, and only if dev wants persistent data he will request other storage interfaces
namespace('Sy.Lib');

Sy.Lib.Storage = function (name) {

    this.name = name || '';

};

Sy.Lib.Storage.prototype = Object.create(Object.prototype, {

    name: {
        value: '',
        writable: true,
        configurable: true
    },

    queue: {
        value: null,
        writable: true,
        configurable: false
    },

    engine: {
        value: null,
        writable: true,
        configurable: true
    },

    get: {
        value: function (id) {

        }
    },

    getAll: {
        value: function () {

        }
    },

    create: {
        value: function (entity) {


            return this;
        }
    },

    update: {
        value: function (entity) {


            return this;
        }
    },

    find: {
        value: function (options) {


            return [];
        }
    },

    remove: {
        value: function (entity) {


            return this;
        }
    },

    clear: {
        value: function () {


            return this;
        }
    },

    setQueue: {
        value: function (object) {
            this.queue = object;

            return this;
        }
    },

    setEngine: {
        value: function (object) {
            this.engine = object;

            return this;
        }
    }

});