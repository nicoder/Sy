namespace('Sy');

Sy.Configurator = function () {

    this.config = {};

};

Sy.Configurator.prototype = Object.create(Object.prototype, {

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