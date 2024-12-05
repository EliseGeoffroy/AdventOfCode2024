async function Day5bis(file){
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
        rules[i].number=i;
        rules[i].before=ruleSearch(rightRuleTable,leftRuleTable,i);
        rules[i].after=ruleSearch(leftRuleTable,rightRuleTable,i);
        
        //display all rules for each number 
        // if ((rules[i].after!=0)||(rules[i].before!=0)){
        //     console.log(i,rules[i]);
        // }
    }
    
    //updates management
    updatesTable=textTable[1].split('\r\n');

    let updatesTableSplitted=[];
    updatesTable.forEach(element => {
        updatesTableSplitted.push(element.split(','));
    });
    
    let resultValidation=[];
    updatesTableSplitted.forEach(element => {
        resultValidation.push(updateValidation(element,rules));

    });

    let invalidUpdatesTable=updatesTableSplitted.filter((element,index) => !resultValidation[index][0]);

    //updates correction
    let remodeledElement=[];
    let firstBrokenRule={};
    let correctedUpdates=[];
    invalidUpdatesTable.forEach((element,index) => {
        remodeledElement=JSON.parse(JSON.stringify(element));
        resultValidation=updateValidation(remodeledElement,rules);
        firstBrokenRule=resultValidation[1][0];
        updateIsValid=resultValidation[0];
        while (!updateIsValid){
            remodeledElement[firstBrokenRule.wrongPosition]=firstBrokenRule.initPage;
            remodeledElement[firstBrokenRule.initPosition]=firstBrokenRule.wrongPage;
            resultValidation=updateValidation(remodeledElement,rules);
            updateIsValid=resultValidation[0];
            if (!updateIsValid){
                firstBrokenRule=resultValidation[1][0];
            }
            
        }
        correctedUpdates.push(remodeledElement);
    });
   

    let middlePageTable=[];
    correctedUpdates.forEach(element => {
        middlePageTable.push(parseInt(element[Math.floor(element.length/2)]));  
    });


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


let updateIsValid=true;
    let pageIsValid=true;
    let brokenRulesTable=[];
    let resultPageValidation=[];

    update.forEach((element,index) => {
        if (rules[element].after!=0||rules[element].before!=0){
            resultPageValidation=pageValidation(update,index,rules[element]);
            pageIsValid=resultPageValidation[0];
            if(!pageIsValid){
                brokenRulesTable.push(...resultPageValidation[1]);
                updateIsValid=false;
            }
        }
    });
    return [updateIsValid,brokenRulesTable];
}

function pageValidation(update,position,rule){

    let j=0;
    let pageIsValid=true;
    let brokenRulesTable=[];
    update.forEach((element,index) => {
        
        if (index<position){
            if (rule.after!=0){
                if (rule.after.indexOf(element)!=-1){
                    brokenRulesTable.push({initPage:update[position],initPosition:position,wrongPage:element,wrongPosition:index,wrongRelation:'before'});
                    pageIsValid=false;
                }
            }
        }
        if (index>position){
            if (rule.before!=0){
                if (rule.before.indexOf(element)!=-1){
                    brokenRulesTable.push({initPage:update[position],initPosition:position,wrongPage:element,wrongPosition:index,wrongRelation:'after'});
                    pageIsValid=false;
                }
            }
        }
    });
   
    return [pageIsValid,brokenRulesTable];
}