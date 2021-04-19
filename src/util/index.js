'use strict';

class Util {
  constructor() {
    throw new Error('This class may not be instantiated');
  }

  /**
   * Iterate over a standard javascript object
   * @param {Object} obj the object to iterate over
   * @param {Function} func the function to call with each element, takes parameters (value, key, object)
   * @returns {Promise}
   */
  static objForEach(obj, func) {
    const objKeys = Object.keys(obj);
    const promises = [];
    // Map each function call to a promises that resolves, whether the function is syncrhonous or not
    objKeys.forEach(key =>
      promises.push(
        new Promise(resolve => {
          async function handle() {
            await func(obj[key], key, obj);
          }
          resolve(handle());
        }),
      ),
    );
    // Return the full array promise in case the caller needs to ensure completion
    return Promise.all(promises);
  }

  /**
   * Executes a function the specified number of times without blocking the event loop
   * @param {number} iterations the numebr of times to loop
   * @param {Function} func the function to execute each loop, takes parameters (currentIteration, args)
   * @param {Object} args args to pass to the function if required, if the function returns a value, args is set to that value after each run.
   * @param {boolean} args.break when set true, the for loop will break and resolve the promise with the rest of the returned object
   * @returns {Promise<*>}
   */
  static async nonBlockLoop(iterations, func, args) {
    let blockedSince = Date.now();

    // Handle unblocking if necessary
    async function unblock() {
      if (blockedSince + 15 > Date.now()) {
        await new Promise(resolve => setImmediate(resolve));
        blockedSince = Date.now();
      }
    }

    for (let i = 0; i < iterations; i++) {
      /* eslint-disable no-await-in-loop */
      await unblock();
      const response = await func(i, args);
      if (response) {
        args = response;
      }
      if (args?.break === true) {
        delete args.break;
        break;
      }
      /* eslint-enable no-await-in-loop */
    }
    return args;
  }
}

module.exports = Util;
