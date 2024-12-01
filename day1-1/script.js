async function loadFile(file){
    let text= await file.text();
    totalTable=text.split('\r\n');
    totalTableSplitted=totalTable.map((e)=>e.split('   '));
    leftTable=[];
    rightTable=[];
    diffTable=[];

for (i=0;i<totalTableSplitted.length;i++){
    leftTable[i]=totalTableSplitted[i][0];
    rightTable[i]=totalTableSplitted[i][1];
}

leftTable.sort((a,b)=>a-b);
rightTable.sort((a,b)=>a-b);

for (i=0;i<leftTable.length;i++){
    diffTable[i]=Math.abs(leftTable[i]-rightTable[i]);
}


document.getElementById('Result').textContent=diffTable.reduce((a,b)=>a+b);

}