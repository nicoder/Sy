namespace('Sy');

Sy.Configurator = function () {};

Sy.Configurator.prototype = Object.create(Object.prototype, {

    config: {
        value: {},
        writable: false,
        configurable: true
    },

    set: {
        value: function (options) {

            this.config = options || {};

            return this;

        }
    },

    get: {
        value: function (prop) {

            return  prop ? this.config[prop] : this.config;

        }
    }

});