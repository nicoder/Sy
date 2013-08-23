namespace('Sy');

Sy.Service = function (name) {

    this.name = name || '';

};

Sy.Service.prototype = Object.create(Object.prototype, {

    services: {
        value: {},
        writable: false,
        configurable: true
    },

    creators: {
        value: {},
        writable: false,
        configurable: true
    },

    get: {

        value: function (serviceName) {

            if (this.services[serviceName] === undefined && this.creators[serviceName]) {

                this.services[serviceName] = this.creators[serviceName]();
                delete this.creators[serviceName];

            } else if (this.services[serviceName] === undefined) {

                throw 'Unknown service';

            }

            return this.services[serviceName];

        }

    },

    set: {

        value: function (serviceName, creator) {

            if (typeof creator != 'function'){
                throw 'Invalid creator type';
            }

            if (this.creators[serviceName] !== undefined || this.services[serviceName] !== undefined) {
                throw 'Service name already used';
            }

            this.creators[serviceName] = creator;

            return this;

        }

    },

    getName: {

        value: function () {

            return this.name;

        }

    }

});