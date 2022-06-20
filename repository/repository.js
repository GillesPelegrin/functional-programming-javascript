
/*
Criteria:

Should only call model function (findAll, delete, update) when the repository is defined by using the of function
    this should add the baseRepospitory which is the implementation of library that been used.

"add(fn)" should a function to itself, you can call it as much as you want
     Repository.add().add().add().add() ... only when the repo is not declared (used by of) this will make it that the defintion stays in one file.
    
"Repository.transactionCOnotext" should create a context where everything is inside of the transaction


Repository has the responsibility for creating specificRepositories, to add extra functions which are not introduced by the baseRepository 
and add a generic transactionalContext which makes for sure everything should is in the same transactional.
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

        /* model should be private */

    function of(model) {

        /* you can only call the methods when you added your model */ 
          const newRepository = Object.assign({}, Repository, baseRepository);
          newRepository.model = model;
          return newRepository;
    }

    function add(fn) {

        const banaan = 5;
        const a =  Object.assign({}, {fn});
        return a;
    }

    return {of, add}
})()

const modelRepo = Repository.of({}).







/* 
Psuedo code

cosnt modelRepository = Repostiory.of(model)

Repository.transactionContext( () => {
 const model =  modelRepository.getById()
 modelRepository.update({})
})


*/

