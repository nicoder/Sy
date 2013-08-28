namespace('Sy.Lib.StorageAdapter');

Sy.Lib.StorageAdapter.WebStorage = function (name) {

    Sy.Lib.StorageAdapter.Interface.call(this, name);

};

Sy.Lib.StorageAdapter.WebStorage.prototype = Object.create(Sy.Lib.StorageAdapter.Interface.prototype, {

    get: {
        value: function (identifier) {

            var store = this.getStore();

            if (store[identifier] !== undefined) {
                setTimeout(
                    function (data, m, name) {
                        m.publish('app::storage::' + name + '::entity', [data]);
                    },
                    0,
                    store[identifier],
                    this.mediator,
                    this.name
                );
            }

            return this;

        }
    },

    getAll: {
        value: function () {

            var store = this.getStore(),
                entities = [];

            for (var k in store) {
                if (store.hasOwnProperty(k)) {
                    entities.push(store[k]);
                }
            }

            setTimeout(
                function (entities, m, name) {
                    m.publish('app::storage::' + name + '::entities', [entities]);
                },
                0,
                entities,
                this.mediator,
                this.name
            );

            return this;

        }
    },

    create: {
        value: function (data) {

            var store = this.getStore();

            store[data.uuid] = data;

            this.setStore(store);

            setTimeout(
                function (data, m, name) {
                    m.publish('app::storage::' + name + '::entity::create', [data]);
                },
                0,
                data,
                this.mediator,
                this.name
            );

            return this;

        }
    },

    update: {
        value: function (identifier, data) {

            var store = this.getStore();

            if (store[identifier] !== undefined) {

                store[identifier] = data;

                this.setStore(store);

                setTimeout(
                    function (data, m, name) {
                        m.publish('app::storage::' + name + '::entity::update', [data]);
                    },
                    0,
                    data,
                    this.mediator,
                    this.name
                );

            }

            return this;

        }
    },

    remove: {
        value: function (identifier) {

            var store = this.getStore();

            if (store[identifier] !== undefined) {

                delete store[identifier];

                this.setStore(store);

                setTimeout(
                    function (identifier, m, name) {
                        m.publish('app::storage::' + name + '::entity::create', [{uuid: identifier}]);
                    },
                    0,
                    identifier,
                    this.mediator,
                    this.name
                );

            }

            return this;

        }
    },

    getStore: {
        value: function () {

            return {};

        }
    },

    setStore: {
        value: function (store) {

            return this;

        }
    }

});