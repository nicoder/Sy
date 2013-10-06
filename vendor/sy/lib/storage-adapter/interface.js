namespace('Sy.Lib.StorageAdapter');

Sy.Lib.StorageAdapter.Interface = function (name) {

    this.name = '';
    this.bundle = '';
    this.entity = '';

    this.config = {};
    /**
     * Adapters need to be aware of the storage, so when the data is retrieved we can inject it in
     * @type {Sy.Lib.Storage}
     */
    this.storage = {};
    this.mediator = {};

    this.setName(name);

};

Sy.Lib.StorageAdapter.Interface.prototype = Object.create(Object.prototype, {

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
    },

    setName: {
        value: function (name) {

            var name = name || '';

            infos = name.split('::');

            if (infos.length !== 2) {
                throw new Error('Invalid stack name');
            }

            this.name = name.toLowerCase();
            this.bundle = infos[0].charAt(0).toUpperCase() + infos[0].substr(1).toLowerCase();
            this.entity = infos[1].charAt(0).toUpperCase() + infos[1].substr(1).toLowerCase();

        }
    }

});