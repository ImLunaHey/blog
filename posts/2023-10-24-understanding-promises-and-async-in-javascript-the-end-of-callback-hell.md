---
title: 'Understanding Promises and Async: The End of Callback Hell'
slug: understanding-promises-async-callback-hell
description: ''
published_date: 2023-10-24T09:19:04.035Z
created_date: 2023-10-24T09:19:04.035Z
modified_date: 2023-10-24T09:19:04.035Z
preview: ''
draft: false
tags: []
categories: []
authors:
  - chatGPT
  - ImLunaHey
---

## What is a Promise?

A `Promise` in JavaScript/Typescript is an `object` representing the eventual completion (or failure) of an asynchronous operation and its resulting value. It essentially promises to do something in the future and provides two key methods for handling the outcome: `.then()` for success and `.catch()` for failures.

A Promise has one of the three states:

- **Pending**: Initial state, neither fulfilled nor rejected.
- **Fulfilled**: The operation was successful.
- **Rejected**: The operation failed.

<p></p>

Here's a simple example:

```ts
const myPromise = new Promise((resolve, reject) => {
  const condition = true;

  if (condition) {
    resolve('Promise is resolved');
  } else {
    reject('Promise is rejected');
  }
});
```

## Understanding async

The async keyword is used to declare an asynchronous function that implicitly returns a `Promise`. Any function marked with `async` is guaranteed to return a `Promise`.

## How then and catch Work

### `then()`

The `.then()` method is used for attaching callbacks that execute if the `Promise` is fulfilled.

```ts
myPromise.then((resolvedValue) => {
  console.log(resolvedValue);
});
```

You can also chain multiple `.then()` methods:

```ts
myPromise
  .then((step1) => {
    // process step1
    return step2;
  })
  .then((step2) => {
    // process step2
    return step3;
  })
  .then((step3) => {
    // final step
  });
```

### `.catch()`

The `.catch()` method is used to handle the case where the Promise is rejected.

```ts
myPromise.catch((error) => {
  console.log(error);
});
```

## `.finally()`

```ts
myPromise.finally(() => {
  console.log('Promise settled.');
});
```

## Try/Catch with Async/Await

In an `async` function, you can use the `try`/`catch` block to handle `Promise` rejection gracefully.

```ts
async function fetchData() {
  try {
    const data = await fetch('https://api.example.com/data');
    return data.json();
  } catch (error) {
    console.log('An error occurred:', error);
  }
}
```

## Why Promises and Async/Await are Better Than Callbacks

- **Readability**: Callbacks can lead to deeply nested code, making it hard to read and maintain. Promises and async/await offer a cleaner, more intuitive structure.

- **Error Handling**: With callbacks, error handling is inconsistent. Promises and async/await make it easier to propagate errors and handle them in a structured way.

- **Chaining**: Promises are easy to chain and manage for complex sequences of asynchronous operations.

## Conclusion

In summary, Promises and async/await offer a more powerful, flexible, and readable way to handle asynchronous operations in JavaScript. They provide a solid foundation for writing clean, maintainable code, thus solving many of the issues associated with callback hell.
