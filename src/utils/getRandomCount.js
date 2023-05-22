// 從 Array 中隨機取 count 個
export default (array, count) => {
  const randomArray = [];
  // 確保 count 不超過陣列的長度
  count = Math.min(count, array.length);
  for(let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * array.length);
    randomArray.push(array.splice(randomIndex, 1)[0]);
  }
  return randomArray;
};