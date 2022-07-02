class Animal {

    #name;
    #sound;

    constructor(name, sound) {
        this.#name = name;
        this.#sound = sound;

        this.#validation();

        Object.freeze(this);
    }

    #validation() {
        if (!this.#sound) {
            throw new Error('Sound should be defined')
        }
    }

    getSound() {
        return this.#sound
    }

    changeSound(sound) {
        this.#sound = sound
    }
}

function createAnimal(name, sound) {

    (function validation() {
        if (!sound) {
            throw new Error('Sound should be defined')
        }
    })();

    function getSound() {
        return sound;
    }

    function changeSound(newSound) {
        sound = newSound;
    }

    return Object.freeze({ getSound, changeSound })
}

let dogSound = "Woef"
let catSound = "Miauw"

dog = new Animal("Dog", dogSound);
cat = createAnimal("Cat", catSound);


console.log(dog['#sound'] ? '[ x ]' : '[ ✓ ]', 'class: privates fields should not be reachable: ', dog['#sound'])
console.log(cat.sound ? '[ x ]' : '[ ✓ ]', 'factory function: privates fields should not be reachable: ', cat.sound)
console.log('\n')

console.log(dog['#validation'] ? '[ x ]' : '[ ✓ ]', 'class: privates functions should not be reachable: ', dog['#validation'])
console.log(cat.validation ? '[ x ]' : '[ ✓ ]', 'factory function: privates functions should not be reachable: ', cat.validation)
console.log('\n')

dog.testValue = 5
cat.testValue = 5
console.log(dog['testValue'] ? '[ x ]' : '[ ✓ ]', 'class: should not add a new value if been freezed', dog.testValue)
console.log(cat['testValue'] ? '[ x ]' : '[ ✓ ]', 'factory function: should not add a new value is been freezed', cat.testValue)
console.log('\n')

dog.changeSound('newSound');
cat.changeSound('newSound');
console.log(dog.getSound() === 'newSound' ? '[ ✓ ]' : '[ x ]', 'class: should change private field by public function', dog.getSound())
console.log(cat.getSound() === 'newSound' ? '[ ✓ ]' : '[ x ]', 'factory function: should change private field by public function', cat.getSound())
console.log(dogSound === 'Woef' ? '[ ✓ ]' : '[ x ]', 'class: should not change input variabels of constructor', dogSound)
console.log(catSound === 'Miauw' ? '[ ✓ ]' : '[ x ]', 'factory function: should not change input arguments', catSound)
console.log('\n')

try {
    new Animal(undefined, undefined);
    console.log('[ x ] Class: should throw Error when the validation is not correct')
} catch {
    console.log('[ ✓ ] Class: should throw Error when the validation is not correct')
}

try {
    createAnimal(undefined, undefined);
    console.log('[ x ] factory function: should throw Error when the validation is not correct')
} catch {
    console.log('[ ✓ ] factory function: should throw Error when the validation is not correct')
}

