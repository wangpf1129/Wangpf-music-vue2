function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// 打乱数组， （随机）
export function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    let j = getRandomInt(0, i);
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}