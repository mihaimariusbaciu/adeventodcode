const input = await Deno.readTextFile("./input.txt");

function getDuplicateItem(firstStr: string, secondStr: string) {
  let firstSet = firstStr;
  let secondSet = secondStr;

  if ( firstSet.length > secondSet.length) {
    firstSet = secondStr;
    secondSet = firstStr;
  }

  let first = 0;
  while(first < firstSet.length) {
    let second = 0;

    while( second < secondSet.length) {
      if(firstSet[first] === secondSet[second]){
        return firstSet[first];
      }
      second += 1;
    }

    first += 1;
  }

  return '';
}

function getItemValue(item: string) {
  const asciiCode = item.charCodeAt(0); 
  if(asciiCode >= 97) {
    return asciiCode - 96;
  }

  return asciiCode - 64 + 26 ;
}


const data = input.split('\n');
const sum = data.reduce ((sum: number, content:string) => {
  if(!content) {
    return sum;
  }
  const len = content.length;
  const middle = len / 2;
  const duplicateItem = getDuplicateItem(content.slice(0,middle), content.slice(middle, len));
  return getItemValue(duplicateItem) + sum;
}, 0);

console.log(sum);

function getTheLowestLengthStr(arr: string[]) {
  return [...arr].sort((a,b) => a.length - b.length );

}

const data2 = [];
for (let i = 0, len = data.length - 2; i<=len; i +=3) {
    data2.push([data[i], data[i+1], data[i+2]]);
}

const sum2 = data2.reduce((sum:number, groups: string[]) => {
  let [first, second, third] = getTheLowestLengthStr(groups);

  let found = false;
  let duplicate = ""; 
  
  while (!found) {
    duplicate = getDuplicateItem(first, second);
    const foundInThird = !!getDuplicateItem(duplicate, third);
    if(foundInThird) {
      found = true;
    }

    const duplicateIndex = first.indexOf(duplicate);
    const remain = first.slice(duplicateIndex, first.length);
    first = remain.replaceAll(duplicate, '');
    second = second.replaceAll(duplicate, '');
  }

  return sum + getItemValue(duplicate);

},0);


console.log(sum2);
