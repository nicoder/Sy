namespace('Sy.Lib.StorageAdapter');

Sy.Lib.StorageAdapter.Server = function (name) {

    Sy.Lib.StorageAdapter.Interface.call(this, name);

};

Sy.Lib.StorageAdapter.Server.prototype = Object.create(Sy.Lib.StorageAdapter.Interface.prototype, {

    rest: {
        value: null,
        writable: true,
        configurable: true
    },

    api: {
        value: {},
        writable: true,
        configurable: true
    },

    get: {
        value: function (identifier) {

            this.rest.get({
                url: this.api.url + this.name + '/' + identifier,
                success: {
                    fn: function (resp) {
                        this.mediator.publish('app::storage::' + this.name + '::entity', [resp.entity]);
                    },
                    context: this
                }
            });

            return this;

        }
    },

    getAll: {
        value: function () {

            this.rest.get({
                url: this.api.url + this.name,
                success: {
                    fn: function (resp) {
                        this.mediator.publish('app::storage::' + this.name + '::entitites', [resp.entitites]);
                    },
                    context: this
                }
            });

            return this;

        }
    },

    create: {
        value: function (data) {

            this.rest.post({
                url: this.api.url + this.name,
                data: data,
                success: {
                    fn: function (resp) {
                        this.mediator.publish('app::storage::' + this.name + '::entity::create', [resp.entity]);
                    },
                    context: this
                }
            });

            return this;

        }
    },

    update: {
        value: function (identifier, data) {

            this.rest.put({
                url: this.api.url + this.name + '/' + identifier,
                data: data,
                success: {
                    fn: function (resp) {
                        this.mediator.publish('app::storage::' + this.name + '::entity::update', [resp.entity]);
                    },
                    context: this
                }
            });

            return this;

        }
    },

    find: {
        value: function (term) {

            this.rest.get({
                url: this.api.url + this.name + '/s/' + term,
                success: {
                    fn: function (resp) {
                        this.mediator.publish('app::storage::' + this.name + '::search', [resp.entitites]);
                    },
                    context: this
                }
            });

            return this;

        }
    },

    remove: {
        value: function (identifier) {

            this.rest.remove({
                url: this.api.url + this.name + '/' + identifier,
                success: {
                    fn: function (resp) {
                        this.mediator.publish('app::storage::' + this.name + '::remove', [identifier]);
                    },
                    context: this
                }
            });

            return this;

        }
    },

    setRest: {
        value: function (object) {

            this.rest = object;

            return this;

        }
    },

    /**
     * Set api config
     */
    setApi: {
        value: function (url) {

            this.api = url;

            return this;

        }
    }

});