import * as firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  };

firebase.initializeApp(config);
  
const database = firebase.database();

export { firebase, database as default };

// // child_removed
// database.ref('expenses').on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// });

// // child_changed
// database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// });

// // child_added
// database.ref('expenses').on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// });

// const subscription = database.ref('expenses')
//   .on('value', (snapshot) => {
//     const expenses = [];

//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         });
//     });
//     console.log(expenses)
//   }, (e) => {
//         console.log('Error fetching data:', e)
//   });

// database.ref('expenses')
//   .once('value')
//   .then((snapshot) => {
//     const expenses = [];

//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         });
//     });
//     console.log(expenses)
//   });

// database.ref('expenses').push({
//     description: 'Rent',
//     note: '',
//     amount: 80000,
//     createdAt: 0
// });

// const subscription = database.ref()
//   .on('value', (snapshot) => {
//     const person = snapshot.val();
//     console.log(`${person.name} is a(n) ${person.job.title} at ${person.job.company}.`);
//   }, (e) => {
//       console.log('Error fetching data:', e)
//   });

// const onValueChange = database.ref()
//   .on('value', (snapshot) => {
//     const val = snapshot.val();
//     console.log(val);
//   }, (e) => {
//       console.log('Error subscribing', e);
//   });

// const seconds = 1500;

// setTimeout(() => {
//     database.ref('age').set(25)
// }, seconds);

// setTimeout(() => {
//     console.log(onValueChange);
//     database.ref().off('value', onValueChange);
// }, seconds * 2);

// setTimeout(() => {
//     database.ref('age').set(27)
// }, seconds * 3);

// database.ref('location/city')
//     .once('value')
//     .then((snapshot) => {
//         const val = snapshot.val();
//         console.log(val);
//     })
//     .catch((e) => {
//         console.log('error fetching data', e)
//     });

// database.ref().set({
//     name: 'Benny Hinrichs',
//     age: 24,
//     stressLevel: 6,
//     job: { 
//         title: 'Software developer',
//         company: 'Google'
//     },
//     location: {
//         city: 'Ogden',
//         country: 'United States'
//     }
// }).then(() => {
//     console.log('Data is saved');
// }).catch((e) => {
//     console.log('This failed:', e);
// });

// database.ref().update({
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'Seattle'
// });

// database.ref().remove()
//   .then(() => {
//     console.log('Data was removed');
//   })
//   .catch((e) => {
//     console.log('Data removal failed:', e);
//   });
