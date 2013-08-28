namespace('Sy.Lib.StorageAdapter');

Sy.Lib.StorageAdapter.SessionStorage = function (name) {

    Sy.Lib.StorageAdapter.WebStorage.call(this, name);

};

Sy.Lib.StorageAdapter.SessionStorage.prototype = Object.create(Sy.Lib.StorageAdapter.WebStorage.prototype, {

    getStore: {
        value: function () {

            var name = 'sy::storage::' + this.name,
                store = JSON.parse(sessionStorage.getItem(name)) || {};

            return store;

        }
    },

    setStore: {
        value: function (store) {

            var name = 'sy::storage::' + this.name;

            sessionStorage.setItem(name, JSON.stringify(store));

            return this;

        }
    }

});