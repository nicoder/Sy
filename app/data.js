namespace('App');

var stackFact = Sy.service.get('core::stack::factory'),
    storeFact = Sy.service.get('core::storage::factory'),
    myStack = stackFact.get('todo'),
    e = new App.Entity.Todo({
        name: 'foo'
    });

myStack.setStorage(storeFact.get('localstorage'));

myStack.retrieve();