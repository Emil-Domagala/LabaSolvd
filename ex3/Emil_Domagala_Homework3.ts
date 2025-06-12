// to start write: -----> npm run dev <--------

type Product = { name: String; price: number };
type Person = { firstName: String; lastName: String };
type Student = { name: String; grades: number[] };

class Task1 {
  calculateDiscountedPrice(items: Product[], discount: number) {
    if (discount < 0) throw new Error('Discount cannot be negative');
    if (discount > 100) throw new Error('Discount cannot be more than 100%');
    return items.map((item) => {
      return { ...item, price: item.price * (1 - discount / 100) };
    });
  }
  calculateTotalPrice(items: Product[]) {
    return items.reduce((acc, item) => acc + item.price, 0);
  }
}

const task1 = new Task1();

class Task2 {
  getFullName(person: Person) {
    return `${person.firstName} ${person.lastName}`;
  }
  filterUnniqueWords(words: string[]) {
    const uniqueWords = new Set<string>(words);
    return Array.from(uniqueWords).sort();
  }
  getAverageGrade(students: Student[]) {
    const totalGrades = students.reduce((acc, student) => {
      const sum = student.grades.reduce((acc, grade) => acc + grade, 0);
      return acc + sum / student.grades.length;
    }, 0);
    return totalGrades / students.length;
  }
}

const task2 = new Task2();

class Task3 {
  public isStopped = false;
  private intervalId: any | null = null;

  createCounter() {
    let count = 0;
    return function () {
      count++;
      return count;
    };
  }

  repeatFunction(fn: Function, times: number) {
    return (...args: any) => {
      if (times < 0) {
        this.isStopped = false;
        this.intervalId = setInterval(() => {
          if (!this.isStopped) {
            fn(...args);
          }
        }, 0);
      } else {
        for (let i = 0; i < times; i++) {
          fn(...args);
        }
      }
    };
  }
  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isStopped = true;
  }
}

const task3 = new Task3();

class Task4 {
  calculateFactorial(num: number, acc = 1): number {
    if (num < 0) throw new Error('Factorial is not defined for negative numbers');
    if (num === 0) return acc;
    return this.calculateFactorial(num - 1, acc * num);
  }

  power(base: number, exponent: number): number {
    if (exponent === 0) return 1;
    if (exponent < 0) throw new Error('Exponent cannot be negative');
    if (exponent === 1) return base;
    return base * this.power(base, exponent - 1);
  }
}
const task4 = new Task4();

class Task5 {
  lazyMap(arr: number[], fn: (item: number) => number) {
    let idx = 0;
    return {
      next() {
        if (idx < arr.length) {
          return fn(arr[idx++]);
        } else {
          return undefined;
        }
      },
    };
  }
  fibonacciGenerator() {
    let a = 0,
      b = 1;
    return {
      next() {
        const val = a;
        [a, b] = [b, a + b];
        return val;
      },
    };
  }
}

const task5 = new Task5();
const fib = task5.fibonacciGenerator();

console.log(fib.next());
console.log(fib.next());
console.log(fib.next());
console.log(fib.next());

console.log('LAZY:::');
const lazy = task5.lazyMap([1, 2, 3], (x) => x * 2);
console.log(lazy.next());
console.log(lazy.next());
console.log(lazy.next());
console.log(lazy.next());
