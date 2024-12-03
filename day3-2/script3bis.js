async function Day3bis(file){
    let text= await file.text();
    
    const mulRegex=/mul\(\d{1,3}\,\d{1,3}\)/g;
    const doRegex=/do\(\)/g;
    const dontRegex=/don\'t\(\)/g;
    const operatorRegex=/\d{1,3}/g;

    let occurMulTable=[...text.matchAll(mulRegex)];
    let occurDoTable=[...text.matchAll(doRegex)];
    let occurDontTable=[...text.matchAll(dontRegex)];

    let occurAllTable=[...occurMulTable,...occurDoTable,...occurDontTable];
    occurAllTable.sort((a,b)=> a['index']-b['index']);

    let operatorTable=[];
    let mulTable=[] ;
    let toBeEvaluated=true;

    occurAllTable.forEach(element => {
        switch (element[0]){
            case "don't()":
                toBeEvaluated=false;
                break;
            case 'do()':
                toBeEvaluated=true;
                break;
            default:
                if (toBeEvaluated){
                    operatorTable=[...element[0].matchAll(operatorRegex)];
                    mulTable.push([operatorTable[0][0],operatorTable[1][0]]);   
                }
                break;
        }
    });


    let mulTableReduced=[];
    mulTable.forEach(element => {
        mulTableReduced.push(element.reduce((a,b)=>a*b));
    });

    document.getElementById('Result').textContent=mulTableReduced.reduce((a,b)=>a+b);
}

