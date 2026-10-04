//Created dotProduct file and run only this file to get the dot product of two vectors
const panda = [0.75,0.22];
const tiger = [-0.28,0.70];
const elephant = [0.50,0.80]

// to cal panda*tiger
// const data= panda.map((item,index)=>{
//   return  panda[index] * tiger[index]      
// })

//to can elephant*tiger
const data= elephant.map((item,index)=>{
  return  elephant[index] * tiger[index]      
})
let dotProduct = 0;
for(let i=0; i<data.length; i++){
    dotProduct +=data[i];
}

console.log(dotProduct);