const input  =  await Deno.readTextFile("./input.txt");

const sequenceSize = 14;
let sequenceStart = 0;
let sequenceEnd = sequenceStart + sequenceSize;

const len = input.length -sequenceSize ;
let index = 0;

while ( index < len ) {
  const isSequnceUnique = new Set(input.slice(sequenceStart, sequenceEnd).split("")).size === sequenceSize;

  if(isSequnceUnique) {
    index = len;
  } else {
    index++;
    sequenceStart = index;
    sequenceEnd = sequenceStart + sequenceSize;
  }
}

console.log(sequenceEnd);
