const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve({
        //     name: 'Babe',
        //     age: 300
        // });
        reject('Something went wrong!');
        // a promise can only be resolved or rejected once
        // the following call will do nothing:
        resolve('This is my other resolved data');
    }, 1500);
});

console.log('before');
promise.then((data) => {
    console.log('1', data);
}).catch((error) => {
    console.log('error: ', error)
});

console.log('after');