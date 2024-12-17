async function Day12(file){
    let text= await file.text();
    let textTable=text.split('\r\n');

    let gardenMap=[];
    textTable.forEach(element => {
        gardenMap.push(element.split(''));
    });

    let analyzedCrops=[];
    let fieldList=[];

    gardenMap.forEach((element,line) => {
        element.forEach((crop,col) => {
            if (analyzedCrops.findIndex(el=>((el.line==line)&&(el.col==col)))==-1){
                let type=crop;
                analyzedCrops.push({type:type,line:line,col:col});
                fieldList.push({type:type,area:1,perimeter:4});
                [analyzedCrops,fieldList]=researchFourDirections(analyzedCrops,gardenMap,line,col,type, fieldList);
            }
        });
    });

    let result=0;
    fieldList.forEach(element => {
        result+=element.area*element.perimeter;
    });
    document.getElementById('Result').textContent=result;

}

function researchSameCrops(analyzedCrops,gardenMap,line,col,type,fieldList){

    if ((gardenMap[line][col]==type)&&(analyzedCrops.findIndex(el=>((el.line==line)&&(el.col==col)))==-1)){
        analyzedCrops.push({type:type,line:line,col:col});
        fieldList[fieldList.length-1].area++;
        fieldList[fieldList.length-1].perimeter+=calculateFences(analyzedCrops,gardenMap,line,col,type);

        researchFourDirections(analyzedCrops,gardenMap,line,col,type,fieldList);
    } 

    return [analyzedCrops,fieldList];
    
}

function researchFourDirections(analyzedCrops,gardenMap,line,col,type,fieldList){
    //left
    if (col>0){
        [analyzedCrops,fieldList]=researchSameCrops(analyzedCrops,gardenMap,line,col-1,type,fieldList);
    }
    //right
    if (col<gardenMap[0].length-1){
        [analyzedCrops,fieldList]=researchSameCrops(analyzedCrops,gardenMap,line,col+1,type,fieldList);
    }
    //up
    if (line>0){
        [analyzedCrops,fieldList]=researchSameCrops(analyzedCrops,gardenMap,line-1,col,type,fieldList);
    }
    //bottom
    if (line<gardenMap.length-1){
        [analyzedCrops,fieldList]=researchSameCrops(analyzedCrops,gardenMap,line+1,col,type,fieldList);
    }
    return [analyzedCrops,fieldList];
}

function calculateFences(analyzedCrops,gardenMap,line,col,type){
    let nbKnownNeighbours=0;
    //left
    if ((col>0)&&(gardenMap[line][col-1]==type)&&(analyzedCrops.findIndex(el=>((el.line==line)&&(el.col==col-1)))!=-1)){
        nbKnownNeighbours++;
    }
    //right
    if ((col<gardenMap[0].length-1)&&(gardenMap[line][col+1]==type)&&(analyzedCrops.findIndex(el=>((el.line==line)&&(el.col==col+1)))!=-1)){
        nbKnownNeighbours++;
    }
    //up
    if ((line>0)&&(gardenMap[line-1][col]==type)&&(analyzedCrops.findIndex(el=>((el.line==line-1)&&(el.col==col)))!=-1)){
        nbKnownNeighbours++;
    }
    //bottom
    if ((line<gardenMap.length-1)&&(gardenMap[line+1][col]==type)&&(analyzedCrops.findIndex(el=>((el.line==line+1)&&(el.col==col)))!=-1)){
        nbKnownNeighbours++;
    }

    switch (nbKnownNeighbours){
        case 1:
            return 2
            
        case 2:
            return 0
            
        case 3:
            return -2
           
        case 4:
            return -4
       
    }
}