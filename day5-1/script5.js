async function Day5(file){
    let text= await file.text();
    let textTable=text.split('\r\n\r\n');

    
    //rules management
    let ruleTable=textTable[0].split('\r\n');
    let leftRuleTable=[];
    let rightRuleTable=[];

    ruleTable.forEach(element => {
        leftRuleTable.push(element.split('|')[0]);
        rightRuleTable.push(element.split('|')[1]);
    });

    let rules=[];

    for (let i=10 ; i<100 ; i++){

        rules[i]={};
        rules[i].before=ruleSearch(rightRuleTable,leftRuleTable,i);
        rules[i].after=ruleSearch(leftRuleTable,rightRuleTable,i);
        

        if ((rules[i].after!=0)||(rules[i].before!=0)){
            console.log(i,rules[i]);
        }
    }
    
    //updates management
    updatesTable=textTable[1].split('\r\n');

    let updatesTableSplitted=[];
    updatesTable.forEach(element => {
        updatesTableSplitted.push(element.split(','));
    });
    
    let validUpdatesTable=updatesTableSplitted.filter(element => updateValidation(element,rules));

    console.log(validUpdatesTable);

    let middlePageTable=[];
    validUpdatesTable.forEach(element => {
        middlePageTable.push(parseInt(element[Math.floor(element.length/2)]));  
    });

    console.log(middlePageTable);

    document.getElementById('Result').textContent=middlePageTable.reduce((a,b)=>a+b);

}

function ruleSearch(indexSearchTable,numberSearchTable,initNumber) 
{
    let index=ruleIndexSearch(indexSearchTable,initNumber);
    if (index.length!=0){
        return ruleNumberSearch(numberSearchTable,index);
    }
    else {
        return 0;
    }
}

function ruleIndexSearch(ruleTable,number){

    let indexTable=[];
    
    ruleTable.forEach((element,index) => {
        if (element==number.toString()){
            indexTable.push(index);
        }
    });

    return indexTable;

}

function ruleNumberSearch(ruleTable,indexTable){
    let numberTable=[];
    
    for (let i=0; i<indexTable.length; i++){
        numberTable.push(ruleTable[indexTable[i]]);
    }
    return numberTable;
}

function updateValidation(update,rules){
    let pageIsValid=true;
    let i=0;

    while (pageIsValid&&i<update.length){
        if (rules[update[i]].after!=0&&rules[update[i]].before!=0){
            pageIsValid=pageValidation(update,i,rules[update[i]]);
        }
        i++;
    }
    if (pageIsValid){
        return true;
    }else {
        return false;
    }

}

function pageValidation(update,position,rule){

    let j=0;
    let pageIsValid=true;

    if (rule.after!=0){
        
        while (j<position&&pageIsValid){
            if (rule.after.indexOf(update[j])!=-1){
                pageIsValid=false;
            }
            j++;
        }
    }
    if (rule.before!=0&&pageIsValid){
        j=position+1;
        while (j<update.length&&pageIsValid){
            if (rule.before.indexOf(update[j])!=-1){
                pageIsValid=false;
            }
            j++;
        }
    }
    return pageIsValid;
}