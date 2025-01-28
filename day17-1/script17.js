async function Day17(file){
    
    let text= await file.text();
    let textTable=text.split('\r\n');
    let initA=textTable[0].slice(textTable[0].indexOf(':')+2);
    let initB=textTable[1].slice(textTable[1].indexOf(':')+2);
    let initC=textTable[2].slice(textTable[2].indexOf(':')+2);
    let instructionsListString=textTable[4].slice(textTable[4].indexOf(':')+2).split(',');

    let instructionsList=[];
    instructionsListString.forEach(element => {
           instructionsList.push(parseInt(element));
    });

    console.log('initA=>',initA);
    console.log('initB=>',initB);
    console.log('initC=>',initC);
    console.log('instructionList=>',instructionsList);

    let registerValues=[initA,initB,initC,[]];
    console.log('initial=>',registerValues);


    for (i=0;i<instructionsList.length-1;i++){
       
        console.log("opcode= ",instructionsList[i]," / operand= ",instructionsList[i+1]);
        [registerValues,i,jump]=instruction(instructionsList[i],instructionsList[i+1],registerValues,i);
       
        console.log(JSON.parse(JSON.stringify(registerValues)));
        console.log(jump);

        (!jump)?i++:'';
    }

    console.log("final=>",registerValues);

    document.getElementById('Result').textContent=registerValues[3].join(',');

}
function instruction(opcode,operand,registerValues,instructionPointer){
    let jump=false
    switch (opcode){
        case 0:
            registerValues=xdv(0,operand,registerValues);
            break;
        case 1:
            registerValues=bxl(operand,registerValues);
            break;
        case 2:
            registerValues=bst(operand,registerValues);
            break;
        case 3:
            [instructionPointer,jump]=jnz(operand,registerValues,instructionPointer);
            break;
        case 4:
            registerValues=bxc(registerValues);
            break;
        case 5:
            registerValues=out(operand,registerValues);
            break;
        case 6:
            registerValues=xdv(1,operand,registerValues);
            break;
        case 7:
            registerValues=xdv(2,operand,registerValues);
            break;
    }
    return [registerValues,instructionPointer,jump];
}

function bxl(literalOperand,registerValues){
    let valueB=registerValues[1];
    registerValues[1]=valueB^literalOperand;
    return registerValues;
}

function bst(literalOperand,registerValues){
    let operand=comboOperand(literalOperand,registerValues);
    registerValues[1]=operand%8;
    return registerValues;
}

function jnz(literalOperand,registerValues,instructionPointer,jump){
    instructionPointer=(registerValues[0]==0)?instructionPointer:literalOperand-1;
           jump=(registerValues[0]!=0);
      return[instructionPointer,jump];
}


function bxc(registerValues){
    let valueB=registerValues[1];
    let valueC=registerValues[2];
    registerValues[1]=valueB^valueC;
    return registerValues;
}

function out(literalOperand,registerValues){
    let operand=comboOperand(literalOperand,registerValues);
    registerValues[3].push(operand%8);
    return registerValues;
}

function xdv(registerIndex,literalOperand,registerValues){
    let operand=comboOperand(literalOperand,registerValues);
    registerValues[registerIndex]=Math.floor(registerValues[0]/Math.pow(2,operand));
    return registerValues ;
}
   
function comboOperand(literalOperand,registerValues){
    let combo=0;
    let valueA=registerValues[0];
    let valueB=registerValues[1];
    let valueC=registerValues[2];
    switch (literalOperand){
        case 0:
        case 1:
        case 2:
        case 3:
            combo=literalOperand;
            break;
        case 4:
            combo=valueA;
            break;
        case 5:
            combo=valueB;
            break;
        case 6: 
            combo=valueC;
            break;
    }
    return combo;
}

