namespace('App.Bundle.Sy.Entity');

App.Bundle.Sy.Entity.Todo = function (properties) {

    Sy.Entity.call(this);

    this.register('name');
    this.register('createTimeStamp');

    this.set(properties);

};

App.Bundle.Sy.Entity.Todo.prototype = Object.create(Sy.Entity.prototype);