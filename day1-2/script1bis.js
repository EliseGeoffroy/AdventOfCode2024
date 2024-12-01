async function loadFile1bis(file){
    let text= await file.text();
    totalTable=text.split('\r\n');
    totalTableSplitted=totalTable.map((e)=>e.split('   '));
    leftTable=[];
    rightTable=[];
    similarityTable=[];
   

for (i=0;i<totalTableSplitted.length;i++){
    leftTable[i]=totalTableSplitted[i][0];
    rightTable[i]=totalTableSplitted[i][1];
}

for (i=0;i<leftTable.length;i++){
    similarityTable[i]=rightTable.filter((el)=>el==leftTable[i]).length*leftTable[i];
}

document.getElementById('Result').textContent=similarityTable.reduce((a,b)=>a+b);

}