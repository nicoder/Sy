namespace('Sy');

Sy.Stack = function (name) {

    this.name = '';
    this.bundle = '';
    this.entity = '';
    this.items = {};
    this.length = 0;
    this.generator = null;
    this.storage = null;
    this.mediator = null;
    this.listeners = {
        get: null,
        getAll: null,
        create: null,
        update: null,
        remove: null
    };

    this.setName(name);

    this.constructor = App.Bundle[this.bundle].Entity[this.entity];

};

Sy.Stack.prototype = Object.create(Object.prototype, {

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

    persist: {
        value: function (entity) {

            if (!(entity instanceof Sy.Entity)) {
                throw 'Invalid entity';
            }

            if (!this.contains(entity)) {

                entity.set('uuid', this.generator.generate());

                this.length++;

                if (this.storage) {
                    this.storage.create(entity);
                }

            } else if (this.storage) {

                this.storage.update(entity);

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

                if (this.storage) {

                    this.storage.remove(entity);

                }
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

    flush: {
        value: function () {

            if (this.storage) {

                this.storage.flush();

            }

            return this;

        }
    },

    retrieve: {
        value: function (identifier) {

            if (identifier !== undefined && this.storage) {
                this.storage.get(identifier);
            } else if (this.storage) {
                this.storage.getAll();
            }

            return this;

        }
    },

    /**
     * Transform raw data into an entity and add it to the stack
     * @type {Sy.Stack}
     */
    create: {
        value: function (rawData) {

            var entity = this.buildEntity(rawData);

            this.items[entity.get('uuid')] = entity;

            this.length++;

            return this;

        }
    },

    buildEntity: {
        value: function (rawData) {

            var entity = null;

            entity = new this.constructor(rawData);

            if (!(entity instanceof Sy.Entity)) {
                throw 'Invalid entity';
            }

            return entity;

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

            if (!this.storage.name) {

                this.storage.setName(this.name);

            }

            return this;

        }
    },

    setMediator: {
        value: function (object) {

            this.mediator = object;

            return this;

        }
    },

    setConstructor: {
        value: function (constructor) {

            this.constructor = constructor;

            return this;

        }
    },

    initListeners: {
        value: function () {

            this.listeners.get = this.mediator.subscribe({
                channel: 'app::storage::' + this.name + '::entity',
                fn: function (rawData) {

                    this.create(rawData);

                    this.mediator.publish('app::stack::' + this.name + '::entity', [this.items[rawData.uuid]]);

                },
                context: this
            });

            this.listeners.getAll = this.mediator.subscribe({
                channel: 'app::storage::' + this.name + '::entities',
                fn: function (entities) {

                    var self = this;

                    entities.forEach(function (rawData) {
                        self.create(rawData);
                    });

                    this.mediator.publish('app::stack::' + this.name + '::entities', [this.getAll()]);

                },
                context: this
            });

            this.listeners.create = this.mediator.subscribe({
                channel: 'app::storage::' + this.name + '::entity::create',
                fn: function (rawData) {

                    if (this.items[rawData.uuid] !== undefined) {

                        for (var p in rawData) {
                            this.items[rawData.uuid].set(p, rawData[p], true);
                        }

                    } else {

                        this.create(rawData);

                    }

                    this.mediator.publish('app::stack::' + this.name + '::entity::create', [this.items[rawData.uuid]]);

                },
                context: this
            });

            this.listeners.update = this.mediator.subscribe({
                channel: 'app::storage::' + this.name + '::entity::update',
                fn: function (rawData) {

                    if (this.items[rawData.uuid] !== undefined) {

                        for (var p in rawData) {
                            this.items[rawData.uuid].set(p, rawData[p], true);
                        }

                        this.mediator.publish('app::stack::' + this.name + '::entity::update', [this.items[rawData.uuid]]);

                    }

                },
                context: this
            });

            this.listeners.remove = this.mediator.subscribe({
                channel: function (rawData) {

                    if (this.items[rawData.uuid] !== undefined) {

                        this.mediator.publish('app::stack::' + this.name + '::entity::delete', [this.items[rawData.uuid]]);

                        delete this.items[rawData.uuid];
                        this.length--;

                    }

                },
                context: this
            });

        }
    },

    setName: {
        value: function (name) {

            infos = name.split('::');

            if (infos.length !== 2) {
                throw new Error('Invalid stack name');
            }

            this.name = name.toLowerCase();
            this.bundle = infos[0].charAt(0).toUpperCase() + infos[0].substr(1).toLowerCase();
            this.entity = infos[1].charAt(0).toUpperCase() + infos[1].substr(1).toLowerCase();

        }
    }

});