const input = Deno.readTextFileSync("./input.txt");



const fileData  = input.split('\n')
fileData.pop();

 const data =  fileData.map(item => item.split(','))
                .filter(([first,second]) => {
                      const [ fMin, fMax]  = first.split('-').map(a => parseInt(a,10));
                       const [sMin, sMax]  =  second.split('-').map(a => parseInt(a,10));
         return ( ( fMin <=sMin && fMax >= sMax) ||  (sMin <= fMin && sMax >= fMax) ) ;
}).length;

 const data2 = fileData.map(item => item.split(','))
                .filter(([first,second]) => {
                      const [ fMin, fMax]  = first.split('-').map(a => parseInt(a,10));
                       const [sMin, sMax]  =  second.split('-').map(a => parseInt(a,10));
         return ( ( fMin <=sMin && fMax >= sMax) ||  (sMin <= fMin && sMax >= fMax) || (fMin <= sMin && fMax >= sMin) || (sMin <= fMin && sMax >= fMin));
}).length;


console.log(JSON.stringify(data, null, 2));
console.log(JSON.stringify(data2, null, 2));
