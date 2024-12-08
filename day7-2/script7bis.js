async function Day7bis(file){
    let text= await file.text();
    let textTable=text.split('\r\n');
    
    let equationsTable=[];
    textTable.forEach(element => {
        equationsTable.push({result:element.split(': ')[0],operands:element.split(': ')[1].split(' ')});
    });

    let correctEquationResult=[];

    equationsTable.forEach(element => {
        let positionCurrentOperand=1;
        let operatorList=[];
        let intermediateResult=parseInt(element.operands[0]);
        let correctEquation=false;
        [correctEquation,operatorList,result]=researchOperators(element.operands,element.result,positionCurrentOperand,operatorList,intermediateResult,correctEquation);
        if (correctEquation){
            correctEquationResult.push(parseInt(element.result));
        }
    });

    document.getElementById('Result').textContent=correctEquationResult.reduce((a,b)=>a+b);
}

function researchOperators(operandsTable,totalResult,positionCurrentOperand,operatorList,intermediateResult,correctEquation){

    if (!correctEquation){
    
        
        if (positionCurrentOperand<operandsTable.length){

            let newOperatorList=[];
            let newIntermediateResult=0;
            let resultOperatorList=[];
            let resultIntermediateResult=0;
            
            //Plus Test
            newOperatorList=[...operatorList,'+'];
            newIntermediateResult=intermediateResult+parseInt(operandsTable[positionCurrentOperand]);
            [correctEquation,resultOperatorList,resultIntermediateResult]=researchOperators(operandsTable,totalResult,positionCurrentOperand+1,newOperatorList,newIntermediateResult,correctEquation);


            //Multiply test
            newOperatorList=[...operatorList,'*'];
            newIntermediateResult=intermediateResult*parseInt(operandsTable[positionCurrentOperand]);
            [correctEquation,resultOperatorList,resultIntermediateResult]=researchOperators(operandsTable,totalResult,positionCurrentOperand+1,newOperatorList,newIntermediateResult,correctEquation);

            //Concat test
            newOperatorList=[...operatorList,'||'];
            newIntermediateResult=parseInt(intermediateResult.toString().concat(operandsTable[positionCurrentOperand]));
            [correctEquation,resultOperatorList,resultIntermediateResult]=researchOperators(operandsTable,totalResult,positionCurrentOperand+1,newOperatorList,newIntermediateResult,correctEquation);
        }
        else {
            let newIntermediateResult=intermediateResult;
            let newOperatorList=JSON.parse(JSON.stringify(operatorList));
            if (intermediateResult==totalResult){
                correctEquation=true;
            } 

            return [correctEquation,newOperatorList,newIntermediateResult];
        } 
    }
    return [correctEquation,operatorList,intermediateResult];
}

