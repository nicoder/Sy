namespace('App.Bundle.Sy.Controller');

App.Bundle.Sy.Controller.Todo = function () {

    Sy.Controller.call(this);

    this.todos = this.container.get('core::stack::factory').get('sy::todo');
    this.todos.setStorage(
        this.container.get('core::storage::factory').get('localstorage', 'sy::todo')
    );

};

App.Bundle.Sy.Controller.Todo.prototype = Object.create(Sy.Controller.prototype, {

    createAction: {
        value: function () {

            var e = new App.Bundle.Sy.Entity.Todo();

            this.todos.persist(e);
            this.todos.flush();

        }
    },

    retrieve: {
        value: function () {

            this.todos.retrieve();

        }
    }

});