async function Day8bis(file){
    let text= await file.text();
    let textTable=text.split('\r\n');
    
    let initMap=[];
    textTable.forEach(element => {
        initMap.push(element.split(''));
    });

    let antennasTable=[];
    let antinodesMap=[];
    initMap.forEach(element => {
        antinodesMap.push(JSON.parse(JSON.stringify(element)).fill('.'));
    });
        

    initMap.forEach((element,line) => {
        element.forEach((frequency,col) => {
            if (frequency!='.'){
                
                antennasTable.push({frequency:frequency,line:line,col:col});
                let researchAntennasMap=JSON.parse(JSON.stringify(initMap));
                let sameFrequencyAntennasTable=researchAllSameFrequencyAntennas(frequency,researchAntennasMap,antennasTable);


                
                //place antinodes
                antinodesMap[line][col]='#';
                antinodesMap=placeAllAntiNodes(sameFrequencyAntennasTable,antinodesMap,line,col);
            }
        });
        
    });


    let numberAntinodesTable=[];
    antinodesMap.forEach(element => {
        numberAntinodesTable.push(element.filter(el=>el=='#').length);
    });
   

document.getElementById('Result').textContent=numberAntinodesTable.reduce((a,b)=>a+b);
}

function researchAllSameFrequencyAntennas(frequency,researchAntennasMap,antennasTable){
    let sameFrequencyAntennasTable=[];
    researchAntennasMap.forEach((element,line) => {

        let col=element.indexOf(frequency);
        let Found=(col!=-1)?true:false;

        if (Found){
            if (col==element.lastIndexOf(frequency)){
                sameFrequencyAntennasTable=registerAntennas(antennasTable,line,col,sameFrequencyAntennasTable);                
            }
            else {
                workingLine=JSON.parse(JSON.stringify(element));
                while (col!=-1){
                    sameFrequencyAntennasTable=registerAntennas(antennasTable,line,col,sameFrequencyAntennasTable);
                    workingLine=workingLine.slice(col+1);
                    col=workingLine.indexOf(frequency);
                }
            }
        } 
    });
    return sameFrequencyAntennasTable;
}

function registerAntennas(antennasTable,line,col,sameFrequencyAntennasTable){
    if (antennasTable.findIndex(element=>((element.line==line)&&(element.col==col)))==-1){
        sameFrequencyAntennasTable.push({line:line,col:col});
    }
    return sameFrequencyAntennasTable;
}

function placeAllAntiNodes(sameFrequencyAntennasTable,antinodesMap,firstLine,firstCol){
    sameFrequencyAntennasTable.forEach(element => {

        antinodesMap=placeOneAntiNodes(antinodesMap,firstCol,firstLine,'before',element.col,element.line);

        antinodesMap=placeOneAntiNodes(antinodesMap,firstCol,firstLine,'after',element.col,element.line);
        
        
    });
   
    return antinodesMap;
}

function placeOneAntiNodes(antinodesMap,refereeCol,refereeLine,direction,elementCol,elementLine){

    [antinodeLine,antinodeCol,coeffCol,coeffLine]=calcInitCoord(direction,refereeCol,elementCol,refereeLine,elementLine);
    
    while ((antinodeCol>-1)&&(antinodeCol<antinodesMap[0].length)&&(antinodeLine>-1)&&(antinodeLine<antinodesMap.length)){
        
        antinodesMap[antinodeLine][antinodeCol]='#';
        lastCol=antinodeCol;
        lastLine=antinodeLine;
        [antinodeLine,antinodeCol]=calcCoord(direction,lastCol,lastLine,coeffCol,coeffLine);

    }
    return antinodesMap
}

function calcInitCoord(direction,refereeCol,elementCol,refereeLine,elementLine){

    let coeffCol=refereeCol-elementCol;
    let coeffLine=refereeLine-elementLine;
    if (direction=='after'){
        antinodeCol=refereeCol+coeffCol;
        antinodeLine=refereeLine+coeffLine;
    } else {
        antinodeCol=elementCol-coeffCol;
        antinodeLine=elementLine-coeffLine;
    }

    return [antinodeLine,antinodeCol,coeffCol,coeffLine];
}

function calcCoord(direction,lastCol,lastLine,coeffCol,coeffLine){
    if (direction=='after'){
        antinodeCol=lastCol+coeffCol;
        antinodeLine=lastLine+coeffLine;
    }else {
        antinodeCol=lastCol-coeffCol;
        antinodeLine=lastLine-coeffLine;
    }
    return [antinodeLine,antinodeCol];
    
}
