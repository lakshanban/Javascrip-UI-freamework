const { getTypeAndLength } = require('./assert-utils')

class assertion {
  static throws = (fn, errMessage) => {
    const didNotTHrowError = new Error('The supplied function didn\' throw error')

    try {
      fn();
      throw didNotTHrowError;
    } catch (e) {
      if (e === didNotTHrowError) throw didNotTHrowError;

      if (!errMessage || e.message === errMessage) return true;

      throw new Error(`\n\nFound: ${e.message}\nWanted: ${errMsg}\n\n`);
    }
  }

  static deepEqual = (obj, comparisonObj) => {
    const objInfo = getTypeAndLength(obj);
    const comparisonObjeInfo = getTypeAndLength(comparisonObj)

    if (!objInfo || !comparisonObjeInfo) {
      return false;
    }
    if (objInfo.length !== comparisonObjeInfo.length || objInfo.type !== comparisonObjeInfo.type) {
      return false
    }

    if (objInfo.type === 'array') {
      for (var i = 0; i < objInfo.length; i++) {
        if (compare(obj[i], comparisonObj[i]) === false) return false;
      }
    } else {
      for (let key of Object.keys(obj)) {
        if (compare(obj[key], comparisonObj[key]) === false) return false;
      }
    }
    return true;
  }
}

const compare = (val, comparisonVal) => {
  const isArrayOrObject = getLengthAndType(val);
  const isFunction = Object.prototype.toString.call(val) == '[object Function]'

  if (isArrayOrObject) {
    if (!deepEqual(val, comparisonVal)) return false;
  }

  else {
    if (isFunction) {
      if (val.toString() !== comparisonVal.toString()) return false;
    } else {
      if (val !== comparisonVal) return false;
    }
  }
}

module.exports = {
  assertion
}