namespace('Sy.Lib.Storage');

/**
 * This is not a real adapter as it's a temp storage
 *
 * When you make actions in a storage object, it's written here until you flush the storage
 * then the data here will be sent to the real adapter and persist changes
 */
Sy.Lib.StorageQueue = function () {

    this. pending = {
        create: [],
        update: [],
        remove: []
    };

};

Sy.Lib.StorageQueue.prototype = Object.create(Object.prototype, {

    set: {
        value: function (action, data) {

            if (this.pending[action] === undefined) {
                throw 'Unknown queueable status (available: create|update|delete)';
            }

            this.pending[action].push(data);

            return this;

        }
    },

    get: {
        value: function (action) {

            if (this.pending[action] === undefined) {
                throw 'Unknown queueable status (available: create|update|delete)';
            }

            return this.pending[action];

        }
    },

    clear: {
        value: function (action) {

            if (this.pending[action] !== undefined) {

                for (var i in this.pending[action]) {
                    this.pending[action].splice(i, 1);
                }

            }

            return this;

        }
    }

});