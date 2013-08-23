namespace('Sy.Lib');

Sy.Lib.StorageFactory = function () {};

Sy.Lib.StorageFactory.prototype = Object.create(Object.prototype, {

    adapters: {
        value: {
            // 'indexeddb': Sy.Lib.StorageAdapter.IndexedDB,
            // 'localstorage': Sy.Lib.StorageAdapter.LocalStorage,
            // 'server': Sy.Lib.StorageAdapter.Server,
            // 'sessionstorage': Sy.Lib.StorageAdapter.SessionStorage
        },
        writable: false,
        configurable: false
    },

    get: {
        value: function (adapter) {

            var storage = new Sy.Lib.Storage(),
                queue = new Sy.Lib.StorageQueue(),
                engine = null;

            if (adapter !== undefined) {

                if (exist(this.adapters[adapter])) {

                    engine = new this.adapters[adapter]();

                } else {

                    throw 'Unknown adapter';

                }

                if(!(engine instanceof Sy.Lib.StorageAdapter.Interface)) {

                    throw 'Invalid adapter';

                }

                storage.setEngine(engine);

            }

            storage.setQueue(queue);

            return storage;

        }
    }

});