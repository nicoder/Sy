namespace('Sy');

Sy.Entity = function () {};

Sy.Entity.prototype = Object.create(Object.prototype, {

    properties: {
        value: {
            uuid: ''
        },
        writable: false,
        configurable: true
    },

    set: {
        value: function (key, value) {

            if (this.properties[key] !== undefined) {
                this.properties[key] = value;
            }

            return this;

        }
    },

    get: {
        value: function (key) {

            if (this.properties.hasOwnProperty(key)) {
                return this.properties[key];
            }

            return undefined;

        }
    },

    register: {
        value: function (key, type) {

            if (!this.properties.hasOwnProperty(key)) {
                this.properties[key] = '';
            }

            return this;

        }
    }

});