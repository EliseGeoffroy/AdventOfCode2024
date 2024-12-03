async function loadFile1bis(file){
    let text= await file.text();
    let totalTable=text.split('\r\n');
    let totalTableSplitted=totalTable.map((e)=>e.split('   '));
    let leftTable=[];
    let rightTable=[];
    let similarityTable=[];
   
    totalTableSplitted.forEach(element => {
        leftTable.push(element[0]);
        rightTable.push(element[1]);
    });

    for (i=0;i<leftTable.length;i++){
        similarityTable[i]=rightTable.filter((el)=>el==leftTable[i]).length*leftTable[i];
    }

    document.getElementById('Result').textContent=similarityTable.reduce((a,b)=>a+b);

}