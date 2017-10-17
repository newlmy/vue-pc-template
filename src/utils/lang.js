/*Array*/
function diff (arr) {
  let len = arr.length;
  let idx = 0;
  while (++idx < len) {
    arr = diffArray(arr, arr[idx]);
  }
  return arr;
}
function diffArray(one, two) {
  if (!Array.isArray(two)) {
    return one.slice()
  }
  let tlen = two.length
  let olen = one.length
  let idx = -1
  let arr = []

  while (++idx < olen) {
    let ele = one[idx]
    let hasEle = false
    for (let i = 0; i < tlen; i++) {
      let val = two[i]
      if (ele === val) {
        hasEle = true
        break
      }
    }
    if (hasEle === false) {
      arr.push(ele);
    }
  }
  return arr;
}

let utils_array = {
  arrayify (val) {
    return !Array.isArray(val) ? [val] : val;
  },
  after (arr, n) {
    if (!Array.isArray(arr)) {
      throw new TypeError('utils#array.after() expects an array.');
    }
    return arr ? arr.slice(n) : null;
  },
  before (arr, n) {
    if (!Array.isArray(arr)) {
      throw new TypeError('utils#array.before() expects an array.');
    }
    return arr ? arr.slice(0, -n) : null;
  },
  compact (arr) {
    if (!Array.isArray(arr)) {
      throw new TypeError('utils#array.compact() expects an array.');
    }
    return arr.filter(Boolean);
  },
  difference (arr) {
    if (!Array.isArray(arr)) {
      throw new TypeError('utils#array.difference() expects an array.');
    }
    return diff.apply(diff, arguments);
  }
}
