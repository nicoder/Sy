namespace('Sy.Storage');

/**
 * Factory that generates entities repository
 *
 * @package Sy
 * @subpackage Storage
 * @implements {Sy.FactoryInterface}
 * @class
 */

Sy.Storage.RepositoryFactory = function () {

    this.meta = null;
    this.loaded = null;
    this.generator = null;

};

Sy.Storage.RepositoryFactory.prototype = Object.create(Sy.FactoryInterface.prototype, {

    /**
     * Set a registry for handling list of metas
     *
     * @param {Sy.RegistryInterface} registry
     *
     * @return {Sy.Storage.RepositoryFactory}
     */

    setMetaRegistry: {
        value: function (registry) {

            if (!(registry instanceof Sy.RegistryInterface)) {
                throw new TypeError('Invalid registry');
            }

            this.meta = registry;

            return this;

        }
    },

    /**
     * Set a registry for handling loaded repositories
     *
     * @param {Sy.RegistryInterface} registry
     *
     * @return {Sy.Storage.RepositoryFactory}
     */

    setRepoRegistry: {
        value: function (registry) {

            if (!(registry instanceof Sy.RegistryInterface)) {
                throw new TypeError('Invalid registry');
            }

            this.loaded = registry;

            return this;

        }
    },

    /**
     * Set the informations about repositories
     *
     * @param {Array} list
     *
     * @return {Sy.Storage.RepositoryFactory}
     */

    setMeta: {
        value: function (list) {

            for (var i = 0, l = list.length; i < l; i++) {
                this.meta.set(
                    list[i].name,
                    {
                        repository: list[i].repository,
                        entity: list[i].entity,
                        indexes: list[i].indexes,
                        uuid: list[i].uuid
                    }
                );
            }

            return this;

        }
    },

    /**
     * Set the identifier generator
     *
     * @param {Sy.Lib.Generator.Interface} generator
     *
     * @return {Sy.Storage.RepositoryInterface}
     */

    setGenerator: {
        value: function (generator) {

            if (!(generator instanceof Sy.Lib.Generator.Interface)) {
                throw new TypeError('Invalid generator');
            }

            this.generator = generator;

            return this;

        }
    },

    /**
     * @inheritDoc
     */

    make: {
        value: function (alias) {

            if (this.loaded.has(alias)) {
                return this.loaded.get(alias);
            }

            if (!this.meta.has(alias)) {
                throw new ReferenceError('Unknown repository "' + alias + '"');
            }

            var meta = this.meta.get(alias),
                repo = new meta.repository();

            if (!(repo instanceof Sy.Storage.RepositoryInterface)) {
                throw new TypeError('Invalid repository "' + alias + '"');
            }

            repo
                .setName(alias)
                .setEntityKey(meta.uuid)
                .setEntityConstructor(meta.entity)
                .setIndexes(meta.indexes)
                .setQueue(new Sy.Queue())
                .setGenerator(this.generator);

            return repo;

        }
    }

});