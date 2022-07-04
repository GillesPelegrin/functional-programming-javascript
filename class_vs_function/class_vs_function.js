class Animal {

    #name;
    #sound;
    #nameOfThereFriends;

    constructor(name, sound, nameOfThereFriends) {
        this.#name = name;
        this.#sound = sound;
        this.#nameOfThereFriends = nameOfThereFriends;

        // You wil adapt this and the reference outside this functions, which is not save ! for both cases
        // Solution for case 2 would be deep copying the variable which comes in like this.#nameOfThereFriends = [...nameOfThereFriends];
        // Case1: nameOfThereFriends[0] = 6
        // Case2: this.#nameOfThereFriends[0] = 6
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

    getNameOfThereFriends() {
        return this.#nameOfThereFriends
    }

    changeNameOfThereFriends(newListOfFriendNames) {
        this.#nameOfThereFriends = newListOfFriendNames
    }
}

function createAnimal(name, sound, nameOfThereFriends) {

    // You wil adapt this and the reference outside this functions, which is not save !
    // nameOfThereFriends[0] = 6;

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

    function getNameOfThereFriends() {
        return nameOfThereFriends;
    }

    function changeNameOfThereFriends(newListOfFriendNames) {
        // Because we did not reasign the nameOfThereFriends it will also adapt the argument which is given
        // nameOfThereFriends[0] = 6
        nameOfThereFriends = newListOfFriendNames;
    }

    return Object.freeze({ getSound, changeSound, getNameOfThereFriends, changeNameOfThereFriends })
}

let dogSound = "Woef"
let catSound = "Miauw"
let dogFriends = ['Sam', 'Aagje', 'Nina']
let catFriends = ['Sam', 'Aagje', 'Nina']

dog = new Animal("Dog", dogSound, dogFriends);
cat = createAnimal("Cat", catSound, catFriends);


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


// This test would fail if it was not a primitive type, if it was an object or array this woul fail
dog.changeSound('newSound');
cat.changeSound('newSound');
console.log(dog.getSound() === 'newSound' ? '[ ✓ ]' : '[ x ]', 'class: should change private primitive field by public function', dog.getSound())
console.log(cat.getSound() === 'newSound' ? '[ ✓ ]' : '[ x ]', 'factory function: should change private primitive field by public function', cat.getSound())
console.log(dogSound === 'Woef' ? '[ ✓ ]' : '[ x ]', 'class: should not change input variabels of constructor', dogSound)
console.log(catSound === 'Miauw' ? '[ ✓ ]' : '[ x ]', 'factory function: should not change input arguments', catSound)
console.log('\n')

// Same test as above without a primitive but an array wich is an object
dog.changeNameOfThereFriends(['newFriend']);
cat.changeNameOfThereFriends(['newFriend']);
console.log(JSON.stringify(dog.getNameOfThereFriends()) === JSON.stringify(['newFriend']) ? '[ ✓ ]' : '[ x ]', 'class: should change private field by public function', dog.getNameOfThereFriends())
console.log(JSON.stringify(cat.getNameOfThereFriends()) === JSON.stringify(['newFriend']) ? '[ ✓ ]' : '[ x ]', 'factory function: should change private field by public function', cat.getNameOfThereFriends())
console.log(JSON.stringify(dogFriends) === JSON.stringify(['Sam', 'Aagje', 'Nina']) ? '[ ✓ ]' : '[ x ]', 'class: should not change input variabels of constructor', dogFriends)
console.log(JSON.stringify(catFriends) === JSON.stringify(['Sam', 'Aagje', 'Nina']) ? '[ ✓ ]' : '[ x ]', 'factory function: should not change input arguments', catFriends)
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
console.log('\n')

// Stil need to find out how to protect against adjusting the the argument so that a class or function can not adjust the outside world

dog.changeSound(dogSound)
cat.changeSound(catSound)
dog.getSound = 'DifferentSound'
cat.getSound = 'DifferentSound'
console.log(dog.getSound === 'DifferentSound' ? '[ x ]' : '[ ✓ ]', 'class: private variable should not be changed outside of scope', dog.getSound())
console.log(dog.getSound === 'DifferentSound'  ? '[ x ]' : '[ ✓ ]', 'factory function: private variable should not be changed outside of scope', cat.getSound())
console.log('\n')