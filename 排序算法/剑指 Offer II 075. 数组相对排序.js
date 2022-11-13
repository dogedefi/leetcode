/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
var relativeSortArray = function (arr1, arr2) {
  var statMap = parseArrayToStatMap(arr2);
  var otherSortedArr = [];
  for (var arr1El of arr1) {
    const statValue = statMap.get(arr1El);
    if (statValue != undefined) {
      statMap.set(arr1El, statValue + 1);
    } else {
      otherSortedArr.push(arr1El);
    }
  }
  otherSortedArr.sort((a, b) => a - b);
  return parseStatMapToArray(statMap).concat(otherSortedArr);
};

var parseArrayToStatMap = function (arr) {
  const statMap = arr.reduce(function (statMap, element) {
    statMap.set(element, 0);
    return statMap;
  }, new Map());
  return statMap;
};

var parseStatMapToArray = function (statMap) {
  var arr = [];
  statMap.forEach(function (count, element) {
    arr.push(...new Array(count).fill(element));
  }, []);
  return arr;
};

// 1. 区分{}和new Map有排序差异
// 2. sort被多次调用，存在性能问题，可优化
// 3. 空间复杂度距最高纪录还可降低0.1mb左右
