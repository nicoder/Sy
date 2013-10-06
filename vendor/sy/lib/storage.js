//by default will use the queue interface, and only if dev wants persistent data he will request other storage interfaces
namespace('Sy.Lib');

Sy.Lib.Storage = function (name) {

    this.name = '';
    this.bundle = '';
    this.entity = '';
    this.queue = null;
    this.engine = null;

    this.setName(name);

};

Sy.Lib.Storage.prototype = Object.create(Object.prototype, {

    get: {
        value: function (id) {

            this.engine.get(id);

            return this;

        }
    },

    getAll: {
        value: function () {

            this.engine.getAll();

            return this;

        }
    },

    create: {
        value: function (entity) {

            if (this.checkValidity(entity)) {
                this.queue.set('create', entity);
            }

            return this;
        }
    },

    update: {
        value: function (entity) {

            if (this.checkValidity(entity)) {
                this.queue.set('update', entity);
            }

            return this;
        }
    },

    remove: {
        value: function (entity) {

            if (this.checkValidity(entity)) {
                this.queue.set('remove', entity);
            }

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

    checkValidity: {
        value: function (data) {

            if (data instanceof Sy.Entity) {
                return true;
            }

            return false;

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

            var name = name || '';

            infos = name.split('::');

            if (infos.length !== 2) {
                throw new Error('Invalid storage name');
            }

            this.name = name.toLowerCase();
            this.bundle = infos[0].charAt(0).toUpperCase() + infos[0].substr(1).toLowerCase();
            this.entity = infos[1].charAt(0).toUpperCase() + infos[1].substr(1).toLowerCase();

            if (this.engine) {
                this.engine.setName(name);
            }

        }
    }

});