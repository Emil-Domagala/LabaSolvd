// to start write: -----> npm run dev <--------

class TransformUtils {
  addValues(arg1: unknown, arg2: unknown): any {
    if (typeof arg1 === 'bigint' && typeof arg2 === 'bigint') return arg1 + arg2;

    if (Array.isArray(arg1) && Array.isArray(arg2)) return [...arg1, ...arg2];

    if (typeof arg1 === 'object' && typeof arg2 === 'object') return { ...arg1, ...arg2 };

    if (typeof arg1 === 'string' || typeof arg2 === 'string') return String(arg1) + String(arg2);

    if (typeof arg1 === 'number' && typeof arg2 === 'number') return arg1 + arg2;

    throw new Error(`Cannot add types: ${typeof arg1} and ${typeof arg2}`);
  }
  stringifyValue(value: unknown): string {
    if (typeof value === 'object' && value !== null) {
      try {
        return JSON.stringify(value);
      } catch {
        throw new Error('Cannot stringify');
      }
    }
    return String(value);
  }

  invertBoolean(value: unknown): boolean {
    if (typeof value !== 'boolean') throw new Error('Value must be a boolean');
    return !value;
  }

  convertToNumber(value: unknown): number {
    if (typeof value === 'number') return value;

    if (typeof value === 'string') {
      const num = value.includes('.') ? parseFloat(value) : parseInt(value, 10);
      if (isNaN(num)) throw new Error(`Cannot convert to number`);
      return num;
    }
    const num = Number(value);
    if (isNaN(num)) throw new Error(`Cannot convert to number`);
    return num;
  }
  coerceToType(value: unknown, type: 'string' | 'number' | 'boolean' | 'object'): unknown {
    switch (type) {
      case 'string':
        return this.stringifyValue(value);
      case 'number':
        return this.convertToNumber(value);
      case 'boolean':
        return this.convertToBoolean(value);
      case 'object':
        if (typeof value === 'object' && value !== null) {
          return value;
        }
        if (typeof value === 'string') {
          try {
            const parsed = JSON.parse(value);
            if (typeof parsed === 'object' && parsed !== null) {
              return parsed;
            }
            throw new Error(`value couldnt be parsed to object`);
          } catch (e: any) {
            throw new Error(`error during parsing ` + e.message);
          }
        }
        throw new Error(`Canot coarce not a string to an object`);
      default:
        throw new Error(`Not allowed type`);
    }
  }

  // additions
  convertToBoolean(value: unknown): boolean {
    if (typeof value === 'string') {
      const lowVal = value.trim().toLowerCase();
      if (['true', 'yes', '1'].includes(lowVal)) return true;
      if (['false', 'no', '0', 'null', 'undefined', ''].includes(lowVal)) return false;
    }
    if (typeof value === 'number') {
      if (value === 0) return false;
      if (value === 1) return true;
    }
    return Boolean(value);
  }

  isPrimitive(value: unknown): boolean {
    const type = typeof value;
    return ['string', 'number', 'bigint', 'boolean', 'symbol', 'undefined', 'null'].includes(type);
  }
}

const transformUtils = new TransformUtils();

console.log(transformUtils.addValues(1, 2));
console.log(transformUtils.addValues('1', 2));
console.log(transformUtils.addValues('1', '2'));
console.log(transformUtils.addValues([1], [4, 3, 2]));
console.log(transformUtils.addValues({ a: 1 }, { b: 2 }));
console.log('stringifyValue');
console.log(transformUtils.stringifyValue(1));
console.log(transformUtils.stringifyValue('1'));
console.log(transformUtils.stringifyValue({ a: 1 }));
console.log(transformUtils.stringifyValue([1, 2, 3]));
console.log('invertBoolean');
console.log(transformUtils.invertBoolean(true));
console.log(transformUtils.invertBoolean(false));
console.log('convertToNumber');
console.log(transformUtils.convertToNumber(1));
console.log(transformUtils.convertToNumber('19'));
console.log(transformUtils.convertToNumber('19.99'));
console.log(transformUtils.convertToNumber(true));
console.log(transformUtils.convertToNumber(false));
// console.log(transformUtils.convertToNumber([1, 2, 3, 4]));
console.log('coerceToType');
console.log(transformUtils.coerceToType(1, 'string'));
console.log(transformUtils.coerceToType('1', 'number'));
console.log(transformUtils.coerceToType(true, 'boolean'));
console.log(transformUtils.coerceToType({ a: 1 }, 'object'));
console.log(transformUtils.coerceToType('{"a":1}', 'object'));
console.log(transformUtils.coerceToType('[1,2,3,4]', 'object'));
console.log('convertToBoolean');
console.log(transformUtils.convertToBoolean('[1,2,3,4]'));
console.log(transformUtils.convertToBoolean('0'));
console.log(transformUtils.convertToBoolean('1'));
console.log(transformUtils.convertToBoolean('true'));
console.log(transformUtils.convertToBoolean('false'));
console.log(transformUtils.convertToBoolean('null'));
console.log(transformUtils.convertToBoolean('undefined'));
console.log(transformUtils.convertToBoolean(''));
console.log(transformUtils.convertToBoolean(0));
console.log(transformUtils.convertToBoolean(1));
console.log('isPrimitive');
console.log(transformUtils.isPrimitive(1));
console.log(transformUtils.isPrimitive('1'));
console.log(transformUtils.isPrimitive({}));
console.log(transformUtils.isPrimitive([]));
