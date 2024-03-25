import  {parse} from "https://deno.land/std@0.181.0/flags/mod.ts";
const { i , p} = parse(Deno.args);
const input = Deno.readTextFileSync(`./${i}.txt`).split("\n");
input.pop();


const treeMatrix: number[][] = [];
let treeMatrixRowCount = 0;
const treeMatrixColumnsCount = input.length;
for (let i = 0, len = input.length; i < len; i++) {
  const row = input[i].split("");
  treeMatrixRowCount = row.length;
  treeMatrix[i] = [];


  for (let j = 0, len = row.length; j < len; j++) {
    if (row[j] !== '') {
      treeMatrix[i][j] = parseInt(row[j], 10);
    }
  }
}

// const rowLen = treeMatrix.length ;
// for (let i = 0 ; i < rowLen; i++) {
//       console.log( treeMatrix[i]);
// }
//

if(p == "1") {
  let visibleCounter = 0;
  const rowLen = treeMatrix.length - 1  ;
  const columnLen = treeMatrix[0].length - 1 ;

  for (let i = 1 ; i < rowLen; i++) {
    for (let j = 1; j < columnLen; j++) {
      const currentValue = treeMatrix[i][j];
      let treeVisibilityCounter = 4;
      // check top 
      const top = treeMatrix[0][j];
      if (top >= currentValue) {
        treeVisibilityCounter--;
      } else {

        let noTallerTree = true;
        let _index = i - 1;

        while (noTallerTree && _index > 0  ) {
          if(currentValue <= treeMatrix[_index][j]) {
            noTallerTree = false;

            treeVisibilityCounter--;
          }

          _index--;
        }
      }

      // right
      const right = treeMatrix[i][rowLen];
      if (right >= currentValue) {
        treeVisibilityCounter--;
      } else {
        let noTallerTree = true;
        let _index = j + 1;

        while (noTallerTree && _index <= rowLen  ) {
          if(currentValue <= treeMatrix[i][_index]) {
            noTallerTree = false;

            treeVisibilityCounter--;
          }

          _index++;
        }
      }
      // bottom 
      const bottom = treeMatrix[columnLen][j];
      if (bottom >= currentValue) {
        treeVisibilityCounter--;
      } else {
        let noTallerTree = true;
        let _index = i + 1;

        while (noTallerTree && _index <= columnLen  ) {
          if(currentValue <= treeMatrix[_index][j]) {
            noTallerTree = false;

            treeVisibilityCounter--;
          }

          _index++;
        }
      }
      // left 
      const left = treeMatrix[i][0];
      if (left >= currentValue) {
        treeVisibilityCounter--;
      } else {

        let noTallerTree = true;
        let _index = j - 1;

        while (noTallerTree && _index > 0) {
          if(currentValue <= treeMatrix[i][_index]) {
            noTallerTree = false;

            treeVisibilityCounter--;
          }

          _index--;
        }
      }

      if (treeVisibilityCounter > 0){
        visibleCounter++;
      }
    }
  }
  console.log(visibleCounter + (2 * treeMatrixRowCount + 2 * treeMatrixColumnsCount - 4));
}



if(p == "2") {
  const rowLen = treeMatrix.length - 1  ;
  const columnLen = treeMatrix[0].length - 1 ;

  const sceneValues = [];

  for (let i = 1 ; i < rowLen; i++) {
    for (let j = 1; j < columnLen; j++) {
      const currentValue = treeMatrix[i][j];
      let treeVisibilityCounter = 4;
      let treeSceneScore = 1;

      // check top 
      const top = treeMatrix[0][j];
      if (top >= currentValue) {
        treeSceneScore *= (i - 0) ;
        treeVisibilityCounter--;
      } else {

        let noTallerTree = true;
        let _index = i - 1;

        while (noTallerTree && _index > 0  ) {
          if(currentValue <= treeMatrix[_index][j]) {
            noTallerTree = false;

            treeSceneScore *= (i - _index);
            treeVisibilityCounter--;
          }

          _index--;
        }

        if(noTallerTree) {
          treeSceneScore *= (i - 0);
        }
      }

      // right
      const right = treeMatrix[i][rowLen];
      if (right >= currentValue) {
        treeSceneScore *= (rowLen - j);
        treeVisibilityCounter--;
      } else {
        let noTallerTree = true;
        let _index = j + 1;

        while (noTallerTree && _index <= rowLen  ) {
          if(currentValue <= treeMatrix[i][_index]) {
            noTallerTree = false;

            treeSceneScore *= (_index - j);
            treeVisibilityCounter--;
          }

          _index++;
        }
        if(noTallerTree) {
          treeSceneScore *= (rowLen - j);
        }
      }
      // bottom 
      const bottom = treeMatrix[columnLen][j];
      if (bottom >= currentValue) {
        treeSceneScore *= (columnLen - i);
        treeVisibilityCounter--;
      } else {
        let noTallerTree = true;
        let _index = i + 1;

        while (noTallerTree && _index <= columnLen  ) {
          if(currentValue <= treeMatrix[_index][j]) {
            noTallerTree = false;

            treeSceneScore *= (_index - i);
            treeVisibilityCounter--;
          }

          _index++;
        }
        if(noTallerTree) {
          treeSceneScore *= (columnLen - i);
        }
      }
      // left 
      const left = treeMatrix[i][0];
      if (left >= currentValue) {
        treeSceneScore *= (j - 0);
        treeVisibilityCounter--;
      } else {

        let noTallerTree = true;
        let _index = j - 1;

        while (noTallerTree && _index > 0) {
          if(currentValue <= treeMatrix[i][_index]) {
            noTallerTree = false;

            treeSceneScore *= (j - _index);
            treeVisibilityCounter--;
          }

          _index--;
        }
        if(noTallerTree) {
          treeSceneScore *= (j - 0);
        }
      }

      if (treeVisibilityCounter > 0) {
        sceneValues.push({ score: treeSceneScore, i, j});
      }
    }
  }


  sceneValues.sort((a, b) => b.score - a.score);
  console.log(sceneValues[0].score);
}
