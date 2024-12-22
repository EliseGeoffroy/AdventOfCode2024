async function Day15(file){
    
    let text= await file.text();
    let textTable=text.split('\r\n\r\n');

    let initMap=[];
    let lineRobot=0;
    let colRobot=0;
    textTable[0].split('\r\n').forEach((element,line) => {
        if (element.indexOf('@')!=-1){
            lineRobot=line;
            colRobot=element.indexOf('@');
        }
        initMap.push(element.split(''));
    });

    let moveList=[];
    textTable[1].split('\r\n').forEach(element => {
        moveList=[...moveList,...element.split('')];
    });


    let currentMap=JSON.parse(JSON.stringify(initMap));

    moveList.forEach(element => {
        switch (element){
            case '<':
                [currentMap,lineRobot,colRobot]=moveRobot(currentMap,lineRobot,colRobot,lineRobot,colRobot-1);
                break;
            case '>':
                [currentMap,lineRobot,colRobot]=moveRobot(currentMap,lineRobot,colRobot,lineRobot,colRobot+1);
                break;
            case 'v':
                [currentMap,lineRobot,colRobot]=moveRobot(currentMap,lineRobot,colRobot,lineRobot+1,colRobot);
                break;
            case '^':
                [currentMap,lineRobot,colRobot]=moveRobot(currentMap,lineRobot,colRobot,lineRobot-1,colRobot);
                break;   

        }

    });

    let GPS=0;
    currentMap.forEach((element,line) => {
        element.forEach((el,col) => {
            if (el=='O'){
                GPS+=100*line+col;
            }
        });
    });

    document.getElementById('Result').textContent=GPS;
    


}

function moveRobot(currentMap,currentLineRobot,currentColRobot,nextLineRobot,nextColRobot){
    let lineRobot=0;
    let colRobot=0;
    switch(currentMap[nextLineRobot][nextColRobot]){
        case '.':
            lineRobot=nextLineRobot;
            colRobot=nextColRobot;
            break;
        case 'O':
            [currentMap,lineRobot,colRobot]=moveBoxes(currentMap,currentLineRobot,currentColRobot,nextLineRobot,nextColRobot);
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

function moveBoxes(currentMap,currentLineRobot,currentColRobot,boxLine,boxCol){
    let initBoxLine=boxLine;
    let initBoxCol=boxCol;
    let moveLine=boxLine-currentLineRobot;
    let movecol=boxCol-currentColRobot;

    while (currentMap[boxLine][boxCol]=='O'){
        boxLine+=moveLine;
        boxCol+=movecol;
    }
    if (currentMap[boxLine][boxCol]=='#'){
        return [currentMap,currentLineRobot,currentColRobot];
    }else {
        currentMap[boxLine][boxCol]='O'
        return[currentMap,initBoxLine,initBoxCol];
    }
}


   