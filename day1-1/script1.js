async function loadFile(file){
    let text= await file.text();
    let totalTable=text.split('\r\n');
    let totalTableSplitted=totalTable.map((e)=>e.split('   '));
    let leftTable=[];
    let rightTable=[];
    let diffTable=[];

    totalTableSplitted.forEach(element => {
        leftTable.push(element[0]);
        rightTable.push(element[1]);
    });

    leftTable.sort((a,b)=>a-b);
    rightTable.sort((a,b)=>a-b);

    for (let i=0;i<leftTable.length;i++){
        diffTable[i]=Math.abs(leftTable[i]-rightTable[i]);
    }

    document.getElementById('Result').textContent=diffTable.reduce((a,b)=>a+b);

}