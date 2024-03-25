import  {parse} from "https://deno.land/std@0.181.0/flags/mod.ts";
const { i , p} = parse(Deno.args);
const input = Deno.readTextFileSync(`./${i}.txt`).split("\n");
input.pop();


function Command(type, args) {
  return {
    type,
    args,
    toString() {
      return `${this.type} with ${this.args}`;
    }
  }
}
function File(name, size= 0) {
  return {
    name,
    size,
    toString() {
      return `File: ${this.name} => ${this.size}`;
    }
  }
}
function Dir(name, parent = null) {
  return {
    parent,
    name,
    dirs: [],
    files: [],
    size: 0,
    toString() {
      return `Dir: ${this.name} => ${this.size}`;
    },
    valueOf() {
      return `Dir: ${this.name} => ${this.size}`;
    }
  }
}

function* getCommands(arr) {
  const len = arr.length;

  let commandIndex = 0;

  while (commandIndex < len) {
    let [_, type, args] = parseCommand(arr[commandIndex]);

    if (type === 'ls') {
      let index = commandIndex + 1;
      args = [];

      while(arr[index] && arr[index][0] !== "$") {
        args.push(arr[index]); 
        index += 1;
      }
      commandIndex = index;
    } else {
      commandIndex +=1;
    }

    yield new Command(type, args);
  }
}

function parseCommand(str) {
  return str.split(" ");
}

const iterator = getCommands(input);

let currentCommand = iterator.next();
let currentDir = new Dir('/'); 

let chosenDirs = [];
function pickDirectory(currentDir) {
  if( p === 1){
    if(currentDir.size < 100000) {
      chosenDirs.push(currentDir);
    }
  } else {
    chosenDirs.push(currentDir);
  }
}

while ( !currentCommand.done) {
  const { type, args } = currentCommand.value;
  console.log(`Executing command ${currentCommand.value}`);
  switch (type) {
    case 'cd': {
      if ( args === '/' ) {
        break;
      }

      if ( args === '..') {
        let size = 0;

        size += currentDir.files.reduce((s,v) => s + v.size, 0);
        size += currentDir.dirs.reduce((s,v) => s + v.size, 0);

        currentDir.size = size;
        pickDirectory(currentDir);
        if ( currentDir.parent) {
          currentDir = currentDir.parent;
        }
        break;
      }

      const nextDir = currentDir.dirs.find(d => d.name === args);

      if (!nextDir) {
        console.log("Directory does not exist");
        break;
      }
      currentDir = nextDir;
      break;
    }
    case 'ls':
    default:
      args.forEach((str) => {
        const [dirOrFileSize, name] = str.split(" ");

        if(dirOrFileSize === 'dir') {
          currentDir.dirs.push(new Dir(name, currentDir));
        }else {
          currentDir.files.push(new File(name, parseInt(dirOrFileSize, 0)));
        }
      });
  }
  currentCommand = iterator.next();
}

function  calcDirSize(dir){
  let size = 0;

  size += currentDir.files.reduce((s,v) => s + v.size, 0);
  size += currentDir.dirs.reduce((s,v) => s + v.size, 0);
 
  return size;
}

while (currentDir) {
  currentDir.size = calcDirSize(currentDir);
  pickDirectory(currentDir);
  currentDir = currentDir.parent;
}

if( p === 1) {
  console.log("the size", chosenDirs.reduce((s,v) => s + v.size, 0));
} else {
  const sorted = chosenDirs.sort((a,b) => a.size - b.size);
  const totalSize = 70000000;
  const neededSpace = 30000000;
  const unusedSpace = totalSize -  sorted[sorted.length - 1].size;
  
  const remaingSpace = neededSpace - unusedSpace;

  const dirToDelete = sorted.find(dir => dir.size >= remaingSpace);
  console.log(`unusedSpace => ${unusedSpace} , ${dirToDelete}`);
}






