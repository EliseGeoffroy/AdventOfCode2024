async function Day15bis(file){
    
    let text= await file.text();
    let textTable=text.split('\r\n\r\n');

    let initMap=[];
    
    textTable[0].split('\r\n').forEach((element,line) => {
        initMap.push(element.split(''));
    });

    let newMap=[];
    let lineRobot=0;
    let colRobot=0;

    initMap.forEach((el,line) => {
        let newLine=[];
        el.forEach(element => {
            switch (element){
                case 'O':
                    newLine.push('[',']');
                    break;
                case '#':
                    newLine.push('#','#');
                    break;
                case '.':
                    newLine.push('.','.');
                    break;
                case '@':
                    lineRobot=line;
                    newLine.push('@','.');
                    break;
            }
        });
        newMap.push(newLine);
    });

    colRobot=newMap[lineRobot].indexOf('@');

    let moveList=[];
    textTable[1].split('\r\n').forEach(element => {
        moveList=[...moveList,...element.split('')];
    });


    let currentMap=JSON.parse(JSON.stringify(newMap));

    moveList.forEach((element,index) => {

        switch (element){
            case '<':
                [currentMap,lineRobot,colRobot]=moveRobot(currentMap,lineRobot,colRobot,lineRobot,colRobot-1,'horizontal');
                break;
            case '>':
                [currentMap,lineRobot,colRobot]=moveRobot(currentMap,lineRobot,colRobot,lineRobot,colRobot+1,'horizontal');
                break;
            case 'v':
                [currentMap,lineRobot,colRobot]=moveRobot(currentMap,lineRobot,colRobot,lineRobot+1,colRobot,'vertical');
                break;
            case '^':
                [currentMap,lineRobot,colRobot]=moveRobot(currentMap,lineRobot,colRobot,lineRobot-1,colRobot,'vertical');
                break;   

        }

    });

    let GPS=0;
    currentMap.forEach((element,line) => {
        element.forEach((el,col) => {
            if (el=='['){
                GPS+=100*line+col;
            }
        });
    });

    document.getElementById('Result').textContent=GPS;
    


}

function moveRobot(currentMap,currentLineRobot,currentColRobot,nextLineRobot,nextColRobot,direction){
    let lineRobot=0;
    let colRobot=0;
    switch(currentMap[nextLineRobot][nextColRobot]){
        case '.':
            lineRobot=nextLineRobot;
            colRobot=nextColRobot;
            break;
        case '[':
        case ']':
            if (direction=='vertical'){
                [currentMap,lineRobot,colRobot]=verticalMoveBoxes(currentMap,currentLineRobot,currentColRobot,nextLineRobot,nextColRobot);
            }else{
                [currentMap,lineRobot,colRobot]=horizontalMoveBoxes(currentMap,currentLineRobot,currentColRobot,nextLineRobot,nextColRobot);
            }
            break;
        case '#':
            lineRobot=currentLineRobot;
            colRobot=currentColRobot;
            break;
    }
    currentMap[currentLineRobot][currentColRobot]='.';  
    currentMap[lineRobot][colRobot]='@';
    return [currentMap,lineRobot,colRobot];
}

function horizontalMoveBoxes(currentMap,currentLineRobot,currentColRobot,boxLine,boxCol){
    let positionBoxes=[];
    let initBoxLine=boxLine;
    let initBoxCol=boxCol;
    let moveLine=boxLine-currentLineRobot;
    let movecol=boxCol-currentColRobot;
    let thereIsAWall=true;
    let lastBoxCol=0;
    let lastBoxLine=0;

    [thereIsAWall,positionBoxes,lastBoxLine,lastBoxCol]=isThereAWAll(currentMap,positionBoxes,boxLine,boxCol,moveLine,movecol);

    if (!thereIsAWall){
        if (movecol>0){
            currentMap[lastBoxLine][lastBoxCol]=']';
        }else{
            currentMap[lastBoxLine][lastBoxCol]='[';
        }
        for (let i=positionBoxes.length-1;i>0;i--){
            if (positionBoxes[i].initElement==']'){
                currentMap[positionBoxes[i].line][positionBoxes[i].col]='['
            } else if(positionBoxes[i].initElement=='['){
                currentMap[positionBoxes[i].line][positionBoxes[i].col]=']'
            }
        }
        return[currentMap,initBoxLine,initBoxCol];
    } else {
        return [currentMap,currentLineRobot,currentColRobot];
    }
}

function verticalMoveBoxes(currentMap,currentLineRobot,currentColRobot,boxLine,boxCol){
   
    let initBoxLine=boxLine;
    let initBoxCol=boxCol;
    let moveLine=boxLine-currentLineRobot;
    let thereIsAWall=false;
    let positionBoxes=[];

    [thereIsAWall,positionBoxes]=isThereAWAllOneBox(currentMap,positionBoxes,boxLine,boxCol,moveLine);
    
    if (!thereIsAWall){

        if (currentMap[boxLine][boxCol]=='['){
            [thereIsAWall,positionBoxes]=isThereAWAllOneBox(currentMap,positionBoxes,boxLine,boxCol+1,moveLine);
        }else {
            [thereIsAWall,positionBoxes]=isThereAWAllOneBox(currentMap,positionBoxes,boxLine,boxCol-1,moveLine);
        }
    }
   
    if (!thereIsAWall){
        let positionBoxesSorted=[];
        if (moveLine>0){
            positionBoxesSorted=positionBoxes.sort((a,b)=>b.line-a.line)
        }else {
            positionBoxesSorted=positionBoxes.sort((a,b)=>a.line-b.line)
        }
        
        positionBoxesSorted.forEach(element => {
            currentMap[element.line+moveLine][element.col]=element.initElement;
            currentMap[element.line][element.col]='.'
        });       
       return[currentMap,initBoxLine,initBoxCol];

    } else {
        return [currentMap,currentLineRobot,currentColRobot];
    }
}


function isThereAWAll(currentMap,positionBoxes,boxLine,boxCol,moveLine,movecol){
    while ((currentMap[boxLine][boxCol]==']')||(currentMap[boxLine][boxCol]=='[')){
        positionBoxes.push({initElement:currentMap[boxLine][boxCol],line:boxLine,col:boxCol});
        boxLine+=moveLine;
        boxCol+=movecol;
    }
    if (currentMap[boxLine][boxCol]=='#'){
        return [true,positionBoxes,boxLine,boxCol];
    }else{
        return [false,positionBoxes,boxLine,boxCol];
    }
}

function isThereAWAllOneBox(currentMap,positionBoxes,line,col,moveLine){

    if (positionBoxes.filter(el=>el.line==line&&el.col==col).length==0){
        positionBoxes.push({initElement:currentMap[line][col],line:line,col:col})
    }

    let thereIsAWall=false;
    let newLine1=line+moveLine;
    let newCol1=col;
    let newLine2=line+moveLine;
    let newCol2=0;
       
    switch (currentMap[newLine1][newCol1]){
        case '.':
            return [thereIsAWall,positionBoxes];
            break;
        case '[':
            newCol2=newCol1+1
            break;
        case ']':
            newCol2=newCol1-1
            break;
        case '#':
            thereIsAWall=true;
            return [thereIsAWall,positionBoxes]
            break;

    }
   
    if (!thereIsAWall){     
        [thereIsAWall,positionBoxes]=isThereAWAllOneBox(currentMap,positionBoxes,newLine1,newCol1,moveLine)
        if (!thereIsAWall){
            [thereIsAWall,positionBoxes]=isThereAWAllOneBox(currentMap,positionBoxes,newLine2,newCol2,moveLine)  
        }
    }
    return [thereIsAWall,positionBoxes]
}