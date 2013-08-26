//by default will use the queue interface, and only if dev wants persistent data he will request other storage interfaces
namespace('Sy.Lib');

Sy.Lib.Storage = function (name) {

    this.name = name || '';
    this.queue = null;
    this.engine = null;

};

Sy.Lib.Storage.prototype = Object.create(Object.prototype, {

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

            this.queue.set('create', entity);

            return this;
        }
    },

    update: {
        value: function (entity) {

            this.queue.set('update', entity);

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

            this.queue.set('remove', entity);

            return this;
        }
    },

    flush: {
        value: function () {

            var self = this,
                toCreate = this.queue.get('create'),
                toUpdate = this.queue.get('update'),
                toRemove = this.queue.get('remove');

            toCreate.forEach(function (entity) {
                self.engine.create(entity.getRaw());
            });

            toUpdate.forEach(function (entity) {
                self.engine.update(entity.get('uuid'), entity.getRaw());
            });

            toRemove.forEach(function (entity) {
                self.engine.remove(entity.get('uuid'));
            });

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
    },

    setName: {
        value: function (name) {

            this.name = name;

            if (!this.engine.name) {
                this.engine.name = name;
            }

        }
    }

});