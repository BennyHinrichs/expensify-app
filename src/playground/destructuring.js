//Object desctucturing

// const person = {
//     name: 'Benny',
//     age: 24,
//     location: {
//         city: 'Ogden',
//         temp: 32
//     }
// };

// const {name: firstName = 'Anonymous', age} = person;
// //This is equivalent to
// // const firstName = person.name;
// // const age = person.age;

// console.log(`${firstName} is ${age}.`);

// const { city, temp: temperature } = person.location;
// if (city && temperature) {
//     console.log(`It's ${temperature} in ${city}.`)
// }

const book = {
    title: 'Malazan 5',
    author: 'Steven Erikson',
    publisher: {
        name: 'Tor'
    }
};

const { name: publisherName = 'Self-Published'} = book.publisher;
console.log(publisherName);

//
//Array destructuring

const address = ['1070 E 300 S', 'Salt Lake City', 'Utah', '84414'];
const [, city, state = 'Texas'] = address;
console.log(`You are in ${city}, ${state}.`)

const item = ['coffee (hot)', '$2.00', '$2.50', '2.75'];
const [food,,medium] = item;
console.log(`A medium ${food} costs ${medium}.`);