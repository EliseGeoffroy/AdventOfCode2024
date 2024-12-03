async function Day3(file){
    let text= await file.text();
    
    const regex=/mul\(\d{1,3}\,\d{1,3}\)/g;
    const operatorRegex=/\d{1,3}/g;

    let occurTable=[...text.matchAll(regex)];

    let operatorTable=[];
    let mulTable=[] ;

    occurTable.forEach(element => {
        operatorTable=[...element[0].matchAll(operatorRegex)];
        mulTable.push([operatorTable[0][0],operatorTable[1][0]]);
    });

    let mulTableReduced=[];
    mulTable.forEach(element => {
        mulTableReduced.push(element.reduce((a,b)=>a*b));
    });

    document.getElementById('Result').textContent=mulTableReduced.reduce((a,b)=>a+b);
}

