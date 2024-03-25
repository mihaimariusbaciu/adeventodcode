const input  =  await Deno.readTextFile("./input.txt");
const inputData = input.split('\n');
inputData.pop();

const inputSplitIndex = inputData.findIndex(val => val === "");

const machineInput = inputData.splice(0, inputSplitIndex - 1 );
inputData.shift();
inputData.shift();

class CrateMover9000 {
  stacks: string[][] = [];
  constructor(initialData: string[]) {
    for(let i = 0, len= initialData.length; i < len; i++) {
      const lineData = initialData[i].match(/.{1,4}/g);
      for ( let j = 0, lineLen = lineData?.length || 0; j < lineLen; j++) {
        if(!this.stacks[j+1]) {
          this.stacks[j+1] = [] as string[];
        }

        const data  = lineData?.[j].trim();

        if(data) {
          this.stacks[j+1].unshift(data);
        }
      }
    }
  }

  move(noOfCrates:number, fromStack:number, toStack:number) {
    for (let i = 0; i < noOfCrates; i++) {
      const crate = this.stacks[fromStack].pop();
      this.stacks[toStack].push(crate);
    }
  }

  printCratesOnTop() {
    const logArr:string[] = [];
    this.stacks.forEach( stack => logArr.push(stack[stack.length -1 ][1]));
    console.log(logArr.join(''));
  }
}

class CrateMover9001 extends CrateMover9000 {
  constructor(initialData: string[]) {
    super(initialData);
  }

  move(noOfCrates:number, fromStack:number, toStack:number) {
      const crate = this.stacks[fromStack].splice(this.stacks[fromStack].length - noOfCrates, noOfCrates);
      this.stacks[toStack].push(...crate);
  }
}

function moveExtractor(command: string){
 const matches =  command.match(/\d+/g);
  if(!matches) {
    return [0,0,0];
  }

  return [...matches.map(a => parseInt(a,10))];
}

const secventialCrane = new CrateMover9000(machineInput);

inputData.forEach( command => secventialCrane["move"](...moveExtractor(command)));

const sectionCrane = new CrateMover9001(machineInput);

inputData.forEach( command => sectionCrane.move(...moveExtractor(command)));

secventialCrane.printCratesOnTop();
sectionCrane.printCratesOnTop();
