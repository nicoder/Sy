namespace('App');

var stackFact = Sy.service.get('core::stack::factory'),
    storeFact = Sy.service.get('core::storage::factory'),
    myStack = stackFact.get('todo'),
    standaloneStorage = storeFact.get('localstorage', 'standalone'),
    e = new App.Entity.Todo({
        name: 'foo'
    });

myStack.setStorage(storeFact.get('localstorage'));

myStack.persist(e);

myStack.flush();

// standaloneStorage.create({
//     prop: 'value'
// });
// standaloneStorage.flush();