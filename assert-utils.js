const getTypeAndLength = (obj) => {

  if (Object.prototype.toString.call(obj) === '[object Array]') {
    return { type: "object", length: obj.length }
  }

  if (Object.prototype.toString.call(obj) === '[object Object]') {
    return { type: "object", length: Object.keys(obj).length }
  }

  return null;

}

module.exports = {
  getTypeAndLength
}