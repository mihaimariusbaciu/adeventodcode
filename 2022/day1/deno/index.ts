const input = await Deno.readTextFile("./input.txt");

function main() {
  const listOfGroups = input.split("\n\n");
  const listOfSums = listOfGroups
                      .map((group:string) => group.split('\n')
                            .map((val:string) => parseInt(val, 10))
                            .reduce((s:number,v:number) => s +v, 0)
                          ).sort((a:number,b:number) => b - a  )

  console.log(listOfSums[0]);
  console.log(listOfSums[0] + listOfSums[1] + listOfSums[2]);


}

main();
