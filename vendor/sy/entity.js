namespace('Sy');

Sy.Entity = function (properties) {

    var data = properties || {};

    this.properties = {
        uuid: ''
    };

};

Sy.Entity.prototype = Object.create(Object.prototype, {

    set: {
        value: function (key, value) {

            if (typeof key === 'object') {

                for (var k in key) {
                    if (this.properties.hasOwnProperty(k)) {
                        this.properties[k] = key[k];
                    }
                }

            } else {

                if (this.properties[key] !== undefined) {
                    this.properties[key] = value;
                }

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

    getRaw: {
        value: function () {

            var obj = {};

            for (var p in this.properties) {
                if (this.properties.hasOwnProperty(p)) {
                    obj[p] = this.properties[p];
                }
            }

            return obj;

        }
    },

    register: {
        value: function (key, type) {

            if (!this.properties.hasOwnProperty(key) && key !== 'uuid' && key !== 'id') {
                this.properties[key] = '';
            }

            return this;

        }
    }

});