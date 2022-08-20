export default function randomSample(array: any[], amount: number) : any[]{
  const len = array.length; 
  const result: any[] = []
  while (result.length < amount && result.length < array.length ){
    const randomIndex = Math.floor(Math.random() * len);
    if (!result.includes(array[randomIndex])) result.push(array[randomIndex])
  }

  return result;

}