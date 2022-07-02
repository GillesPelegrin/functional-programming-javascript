const baseRepository = function (model) {

    function findAll() {
        /* Implement me */
        throw new Error('findAll is not implemented')
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
}

function createRepository(model, ...fns) {
    return Object.freeze({ ...baseRepository(model),
         ...fns.reduce((a, fn) => ({ ...a, ...{ [fn.name]: fn(model) } }), {}) })
}


const test1 = model => () => console.log('[ ✓ ] Test1 function is added as a function and can reach the model', model)
const repo = createRepository({ model: 'modelTest' }, test1)

console.log('\n')
console.log('[ ✓ ] Model is not reachable', repo.model)
try { repo.findAll() } catch { console.log('[ ✓ ] FindAll is a function in the repo') }
repo.test1()

repo.testValue = 5
console.log('[ ✓ ] Repo is been freezed, testValue is not been set', repo.testValue)
