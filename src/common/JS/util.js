function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// 打乱数组， （随机）
export function shuffle(arr) {
  let _arr = arr.slice();
  for (let i = 0; i < arr.length; i++) {
    let j = getRandomInt(0, i);
    let temp = _arr[i];
    _arr[i] = _arr[j];
    _arr[j] = temp;
  }
  return _arr;
}