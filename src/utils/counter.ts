export default function counter(arr: (number | string)[]) {
  var counterObject: { [key: number | string]: number } = {};
  arr.forEach((val) => (counterObject[val] = (counterObject[val] || 0) + 1));
  return counterObject;
}
