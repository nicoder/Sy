namespace('Sy.Storage');

/**
 * Main entrance to access storage functionalities
 *
 * @package Sy
 * @subpackage Storage
 * @class
 */

Sy.Storage.Core = function () {

    this.managers = new Sy.Registry();

};

Sy.Storage.Core.prototype = Object.create(Object.prototype, {

    /**
     * Set a new manager
     *
     * @param {string} name
     * @param {Sy.Storage.Manager} manager
     *
     * @return {Sy.Storage.Core}
     */

    setManager: {
        value: function (name, manager) {

            if (!(manager instanceof Sy.Storage.Manager)) {
                throw new TypeError('Invalid manager type');
            }

            this.managers.set(name, manager);

            return this;

        }
    },

    /**
     * Get a manager
     *
     * If the name is not specified it is set to main
     *
     * @param {string} manager
     *
     * @return {Sy.Storage.Manager}
     */

    getManager: {
        value: function (manager) {

            manager = manager || 'main';

            return this.managers.get(manager);

        }
    }

});