namespace('Sy');

Sy.Stack = function (name) {

    this.name = name || '';

};

Sy.Stack.prototype = Object.create(Object.prototype, {

    items: {
        value: {},
        writable: false,
        configurable: true
    },

    length: {
        value: 0,
        writable: true,
        configurable: true
    },

    generator: {
        value: {},
        writable: true,
        configurable: true
    },

    storage: {
        value: {},
        writable: true,
        configurable: true
    },

    persist: {
        value: function (entity) {

            if (!(entity instanceof Sy.Entity)) {
                throw 'Invalid entity';
            }

            if (!this.contains(entity)) {
                entity.set('uuid', this.generator.generate());

                this.length++;
            }

            this.items[entity.get('uuid')] = entity;

            return this;

        }
    },

    remove: {
        value: function (entity) {

            if (!(entity instanceof Sy.Entity)) {
                throw 'Invalid entity';
            }

            if (this.contains(entity)) {
                delete this.items[entity.get('uuid')];

                this.length--;
            }

            return this;

        }
    },

    clear: {
        value: function () {

            var self = this,
                entities = self.getAll();

            entities.forEach(function (entity) {
                self.remove(entity);
            });

            return self;

        }
    },

    get: {
        value: function (uuid) {

            if (this.items[uuid] !== undefined) {
                return this.items[uuid];
            }

            throw 'Entity not found';

        }
    },

    getAll: {
        value: function () {

            var entities = [];

            for (var uuid in this.items) {
                if (this.items.hasOwnProperty(uuid)) {
                    entities.push(this.items[uuid]);
                }
            }

            return entities;

        }
    },

    contains: {
        value: function (entity) {

            if (!(entity instanceof Sy.Entity)) {
                throw 'Invalid entity';
            }

            if (this.items[entity.get('uuid')] !== undefined) {
                return true;
            }

            return false;

        }
    },

    setGenerator: {
        value: function (object) {

            if (!(object instanceof Sy.Lib.Generator.Interface)) {
                throw 'Invalid generator';
            }

            this.generator = object;

            return this;

        }
    },

    setStorage: {
        value: function (object) {

            if (!(object instanceof Sy.Lib.Storage)) {
                throw 'Invalid storage';
            }

            this.storage = object;

            return this;

        }
    },

});