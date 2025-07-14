class T7_1 {
  promiseAll<T>(promises: (Promise<T> | T)[]): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const results: T[] = [];
      let completed = 0;

      if (promises.length === 0) {
        resolve([]);
        return;
      }

      promises.forEach((p, idx) => {
        Promise.resolve(p)
          .then((value) => {
            results[idx] = value;
            completed++;
            if (completed === promises.length) {
              resolve(results);
            }
          })
          .catch(reject);
      });
    });
  }
}

export const t7_1 = new T7_1();

type Ex7_Promises = {
  status: 'fulfilled' | 'rejected';
  value?: any;
  reason?: any;
};
class T7_2 {
  promiseAllSettled(promises: Promise<any>[]): Promise<Ex7_Promises[]> {
    return new Promise((resolve) => {
      const results: Ex7_Promises[] = [];
      let completed = 0;

      if (promises.length === 0) {
        resolve([]);
        return;
      }

      promises.forEach((p, idx) => {
        Promise.resolve(p)
          .then((value) => {
            results[idx] = { status: 'fulfilled', value };
          })
          .catch((reason) => {
            results[idx] = { status: 'rejected', reason };
          })
          .finally(() => {
            completed++;
            if (completed === promises.length) {
              resolve(results);
            }
          });
      });
    });
  }
}

export const t7_2 = new T7_2();

class T7_3 {
  chainPromises(functions: ((input: any) => Promise<any>)[]): Promise<any> {
    return functions.reduce((prev, fn) => prev.then(fn), Promise.resolve());
  }
}

export const t7_3 = new T7_3();

class T7_4 {
  promisify(fn: (...args: any[]) => void): (...args: any[]) => Promise<any> {
    return (...args: any[]): Promise<any> => {
      return new Promise((resolve, reject) => {
        fn(...args, (err: any, result: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    };
  }
}

export const t7_4 = new T7_4();