//controllers will have shortcuts to data stacks, services and views
namespace('Sy');

Sy.Controller = function () {

    this.container = Sy.service;

};

Sy.Controller.prototype = Object.create(Object.prototype, {

    container: {
        value: null,
        writable: true,
        enumerable: false,
        configurable: false
    },

    view: {
        value: null,
        writable: true,
        enumerable: false,
        configurable: false
    },

    broadcast: {
        value: function (channel, args) {

            this.container.get('core::mediator').publish(channel, args);

        }
    },

    listen: {
        value: function (channel, fn) {

            this.container.get('core::mediator').subscribe({
                channel: channel,
                fn: fn,
                context: this
            });

        }
    }

});