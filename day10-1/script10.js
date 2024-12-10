async function Day10(file){
    let text= await file.text();
    let textTable=text.split('\r\n');


    let topoMap=[];
    let startPositionsTable=[];
    textTable.forEach((element,line) => {
        topoMap.push(element.split(''));
        let positionStart=element.indexOf('0');

        while (positionStart!=-1){
            startPositionsTable.push({line:line,col:positionStart});
            positionStart=element.indexOf('0',positionStart+1);
        }

    });

    let result=0;
    startPositionsTable.forEach(element => {
        let score=0;
        let endPositionTable=[];

        if (element.line>0){
            //up
            score=hiking(topoMap,topoMap[element.line][element.col],element.line-1,element.col,score,endPositionTable)
        }
        if (element.line<topoMap.length-1){
            //down
            score=hiking(topoMap,topoMap[element.line][element.col],element.line+1,element.col,score,endPositionTable)
        }
        if (element.col>0){
            //left
            score=hiking(topoMap,topoMap[element.line][element.col],element.line,element.col-1,score,endPositionTable)
        }
        if (element.col<topoMap[element.line].length-1){
            //right
            score=hiking(topoMap,topoMap[element.line][element.col],element.line,element.col+1,score,endPositionTable)
        }


        if (score!=0){
            result+=score;
        }
    });


    document.getElementById('Result').textContent=result;
}   

function hiking(topoMap,height,line,col,score,endPositionTable){
    
    let newHeight=parseInt(topoMap[line][col]);
    if (newHeight==parseInt(height)+1){
        if (newHeight!=9){
            if (line>0){
                //up
                score=hiking(topoMap,topoMap[line][col],line-1,col,score,endPositionTable)
            }
            if (line<topoMap.length-1){
                //down
                score=hiking(topoMap,topoMap[line][col],line+1,col,score,endPositionTable)
            }
            if (col>0){
                //left
                score=hiking(topoMap,topoMap[line][col],line,col-1,score,endPositionTable)
            }
            if (col<topoMap[line].length-1){
                //right
                score=hiking(topoMap,topoMap[line][col],line,col+1,score,endPositionTable)
            }
        }else {
            let endPosition={line:line,col:col};

            if (endPositionTable.find(element=>(element.line==line)&&(element.col==col))==null){
                score++;
                endPositionTable.push(endPosition);
            }
             
        }
    }
    return score;
   
}