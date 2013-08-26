namespace('Sy.Lib.StorageAdapter');

Sy.Lib.StorageAdapter.LocalStorage = function (name) {

    Sy.Lib.StorageAdapter.Interface.call(this, name);

};

Sy.Lib.StorageAdapter.LocalStorage.prototype = Object.create(Sy.Lib.StorageAdapter.Interface.prototype, {

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
                function (data, m, name) {
                    m.publish('app::storage::' + name + '::entities', [data]);
                },
                0,
                data,
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

            return this;

        }
    },

    getStore: {
        value: function () {

            var name = 'sy::storage::' + this.name,
                store = JSON.parse(localStorage.getItem(name)) || {};

            return store;

        }
    },

    setStore: {
        value: function (store) {

            var name = 'sy::storage::' + this.name;

            localStorage.setItem(name, JSON.stringify(store));

            return this;

        }
    }

});