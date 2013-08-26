namespace('Sy');

Sy.StackFactory = function () {

    this.generators = {};

};

Sy.StackFactory.prototype = Object.create(Object.prototype, {

    get: {
        value: function (entityName, generator) {

            var gen = generator || 'uuid',
                stack = new Sy.Stack(entityName);

            if (this.generators[gen] === undefined) {
                throw 'Unknown generator';
            }

            stack.setGenerator(this.generators[gen]);

            return stack;

        }
    },

    setGenerator: {
        value: function (name, service) {

            if (this.generators[name] !== undefined) {
                throw 'Generator already defined';
            }

            if (!(service instanceof Sy.Lib.Generator.Interface)) {
                throw 'Invalid generator';
            }

            this.generators[name] = service;

            return this;

        }
    }

});