
/*
Criteria:

Should only call model function (findAll, delete, update) when the repository is defined by using the of function
    this should add the baseRepospitory which is the implementation of library that been used.

    we can even discuss if we need to add it or do you add it by using the add method ? 
    and you add the model by currying ? 

"add(fn)" should a function to itself, you can call it as much as you want
     Repository.add().add().add().add() ... only when the repo is not declared (used by of) this will make it that the defintion stays in one file.
    
"Repository.transactionCOnotext" should create a context where everything is inside of the transaction


Repository has the responsibility for creating specificRepositories, to add extra functions which are not introduced by the baseRepository 
and add a generic transactionalContext which makes for sure everything should is in the same transactional.

It should also be possible to use SQL script - this can be against the idea what we are doing here
Because SQL has flavors depending on each platform, so you kinda thight coupling again.
But the freedom should be there and the refactor in this case is not that big (even in bigger projects)
*/


// Some kind of interface
const baseRepository = (function () {

    /*  Can you reach the model in here ? */

    function findAll() {
        /* Implement me */
        return Promise.reject(new Error('findAll is not implemented'))
    }

    function getById() {
        /* Implement me */
        return Promise.reject(new Error('getById is not implemented'))
    }

    function update() {
        /* Implement me */
        return Promise.reject(new Error('update is not implemented'))
    }

    function deleteById() {
        /* Implement me */
        return Promise.reject(new Error('deleteById is not implemented'))
    }

    return { findAll, getById, update, deleteById }
})()


const Repository = (function () {

    model = undefined

    /* model should be private */
    function add(fn) {
        // we need to check if this is an instance of a function and if the return type is a promise else we should wrap it
        return Object.assign({}, this, { [fn.name]: fn(this.getModel()) });
    }

    function of(newModel) {
        // the model is still exposed at this moment, because we define a new value, is it not better to remove of instead of creating a new object ?

        const newRepo = () => {
            model = 'newModel';

            function getModel() {return this.model;}
            return Object.assign({}, { add, getModel }, baseRepository)
        }

        console.log('test', newRepo().getModel())

        // this.model = model;
        // const newRepository = Object.assign({}, this, { add }, baseRepository);
        return newRepo();
    }

    return { of }
})()

const test1 = model => () => console.log(model)
const test2 = model => () => console.log('test')



console.log('Test 1: call add as mutch as you want after each other, should not throw error ')
Repository.of({ model: 'modelTest' })
    .add(test1)
    .add(test2)
console.log('Test 1: Succeeded \n \n')

console.log('Test 2: should execute ')
const testRepo = Repository.of({ model: 'modelTest' }).add(test1)
// testRepo.test1()
// console.log(Repository.of({ model: 'modelTest' }))
console.log('Test 2: Succeeded \n \n')

// This should throw an error, only the repository should have acces to the model
console.log(testRepo.model)
