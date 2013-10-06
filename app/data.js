namespace('App');

var stackFact = Sy.service.get('core::stack::factory'),
    storeFact = Sy.service.get('core::storage::factory'),
    myStack = stackFact.get('sy::todo'),
    e = new App.Bundle.Sy.Entity.Todo({
        name: 'foo'
    });

myStack.setStorage(storeFact.get('localstorage'));

myStack.retrieve();