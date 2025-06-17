type A = {
  street: string;
  city: string;
  zipCode: string;
};

type P = {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  updateInfo: (info: Partial<P>) => void;
  adress?: A;
};

const person = {} as P;

Object.defineProperties(person, {
  firstName: {
    value: 'John',
    writable: false,
    configurable: false,
    enumerable: true,
  },
  lastName: {
    value: 'Doe',
    writable: false,
    configurable: false,
    enumerable: true,
  },
  age: {
    value: 30,
    writable: false,
    configurable: false,
    enumerable: true,
  },
  email: {
    value: 'john.doe@example.com',
    writable: false,
    configurable: false,
    enumerable: true,
  },
  updateInfo: {
    value: function (info: Partial<P>) {
      for (const key in info) {
        if (Object.prototype.hasOwnProperty.call(this, key)) {
          this[key] = info[key as keyof P];
        }
      }
    },
    writable: false,
    configurable: false,
    enumerable: false,
  },
});

Object.defineProperty(person, 'address', {
  value: {},
  writable: true,
  configurable: false,
  enumerable: false,
});

// *
// TASK 2
// *

type P2 = {
  name: string;
  price: number;
  quantity: number;
};

const product = {} as P2;

Object.defineProperties(product, {
  name: {
    value: 'Laptop',
    writable: true,
    configurable: true,
    enumerable: true,
  },

  price: {
    value: 1000,
    writable: false,
    configurable: true,
    enumerable: false,
  },

  quantity: {
    value: 5,
    writable: false,
    configurable: true,
    enumerable: false,
  },
});

const getTotalPrice = (item: P2) => {
  const price = Object.getOwnPropertyDescriptor(item, 'price');
  const quantity = Object.getOwnPropertyDescriptor(item, 'quantity');
  if (!price || !quantity) throw new Error('One or more properties are missing');
  return price.value * quantity.value;
};

const deleteNonConfigurable = (item: P2, key: keyof P2) => {
  const descriptor = Object.getOwnPropertyDescriptor(item, key);
  if (descriptor && descriptor.configurable) {
    return delete item[key];
  }
  throw new Error('Unexpected error');
};

// ***
// TASK 3
// ***

type BA = {
  balance: number;
  formattedBalance: string;
  transfer: (target: BA, amount: number) => void;
};

const createBankAccount = (initialBalance: number = 1000) => {
  let _balance = initialBalance;

  const account = {} as BA;

  Object.defineProperties(account, {
    balance: {
      get: () => _balance,
      set: (value: number) => {
        _balance += value;
      },
      enumerable: true,
      configurable: false,
    },
    formattedBalance: {
      get: () => `$${_balance.toFixed(2)}`,
      enumerable: true,
      configurable: false,
    },
    transfer: {
      value: (target: BA, amount: number) => {
        if (amount <= 0) throw new Error('Invalid amount');
        if (target.balance < amount) throw new Error('Insufficient funds');
        _balance -= amount;
        target.balance += amount;
      },
      writable: false,
      enumerable: false,
      configurable: false,
    },
  });

  return account;
};

// ****
// TASK 4
// ****

const createImmutableObject = <T extends object>(obj: T): T => {
  if (typeof obj !== 'object' || obj === null) return obj;

  const clone = Array.isArray(obj) ? [] : {};

  for (const key of Object.keys(obj)) {
    const val = (obj as any)[key as keyof T];

    const immutableValue = createImmutableObject(val); // handling nested obj

    Object.defineProperty(clone, key, {
      value: immutableValue,
      writable: false,
      configurable: false,
      enumerable: true,
    });
  }
  return clone as T;
};

// *****
// TASK 5
// *****

const observeObj = <T extends object>(obj: T, callback: (prop: string | symbol, action: 'get' | 'set') => void) => {
  const handler: ProxyHandler<T> = {
    get(obj, prop, receiver) {
      callback(prop, 'get');
      return Reflect.get(obj, prop, receiver);
    },
    set(obj, prop, value, receiver) {
      callback(prop, 'set');
      return Reflect.set(obj, prop, value, receiver);
    },
  };

  return new Proxy(obj, handler);
};

// ******
// TASK 6
// ******

const deepCloneObj = <T extends object>(obj: T, seenMap = new Map()) => {
  if (typeof obj !== 'object' || obj === null) return obj;

  // circular refs
  if (seenMap.has(obj)) return seenMap.get(obj);

  let clone: any;

  // arrays
  if (Array.isArray(obj)) {
    clone = [];
    seenMap.set(obj, clone);
    for (const item of obj) {
      clone.push(deepCloneObj(item, seenMap));
    }
    return clone;
  }

  // obj
  clone = Object.create(Object.getPrototypeOf(obj));
  seenMap.set(obj, clone);

  for (const key of Object.keys(obj)) {
    const item = Object.getOwnPropertyDescriptor(obj, key);
    if (item) {
      if ('value' in item) {
        item.value = deepCloneObj(item.value, seenMap);
      }
      Object.defineProperty(clone, key, item);
    }
  }
  return clone;
};

// *******
// TASK 7
// *******

type SchemaBase = {
  type: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'function';
  required?: boolean;
  validate?: (val: any) => boolean;
};

type ValSchema = {
  [key: string]: SchemaBase;
};

const validateObj = (obj: any, schema: ValSchema): boolean => {
  for (const key in schema) {
    const rule = schema[key];
    const val = obj[key];

    if (rule.required && !(key in obj)) return false;

    if (!rule.required && !(key in obj)) continue;

    if (rule.type === 'array') {
      if (!Array.isArray(val)) return false;
    } else if (typeof val !== rule.type) {
      return false;
    }

    if (rule.validate && !rule.validate(val)) return false;
  }

  return true;
};
