namespace('App.Entity');

App.Entity.Todo = function (properties) {

    Sy.Entity.call(this);

    this.register('name');
    this.register('createTimeStamp');

    this.set(properties);

};

App.Entity.Todo.prototype = Object.create(Sy.Entity.prototype);