class T7_1 {
  promiseAll(promises: Promise<any>[]) {
    return new Promise((resolve, reject) => {
      const results: any[] = [];
      let completed = 0;
      promises.forEach((promise, idx) => {
        promise
          .then((res) => {
            results[idx] = res;
            if (++completed === promises.length) resolve(results);
          })
          .catch((err) => reject(err));
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
    return new Promise((resolve, reject) => {
      const results: Ex7_Promises[] = [];
    });
  }
}

export const t7_2 = new T7_2();
