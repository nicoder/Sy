namespace('Sy.Lib.StorageAdapter');

Sy.Lib.StorageAdapter.LocalStorage = function (name) {

    Sy.Lib.StorageAdapter.WebStorage.call(this, name);

};

Sy.Lib.StorageAdapter.LocalStorage.prototype = Object.create(Sy.Lib.StorageAdapter.WebStorage.prototype, {

    getStore: {
        value: function () {

            var name = 'app::storage::' + this.name,
                store = JSON.parse(localStorage.getItem(name)) || {};

            return store;

        }
    },

    setStore: {
        value: function (store) {

            var name = 'app::storage::' + this.name;

            localStorage.setItem(name, JSON.stringify(store));

            return this;

        }
    }

});