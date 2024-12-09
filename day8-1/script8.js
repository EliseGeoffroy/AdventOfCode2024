async function Day8(file){
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

        firstAntinodeCol=firstCol+(firstCol-element.col);
        firstAntinodeLine=firstLine+(firstLine-element.line);
        antinodesMap=placeOneAntiNodes(antinodesMap,firstAntinodeCol,firstAntinodeLine);

        secondAntinodeCol=element.col+(element.col-firstCol);
        secondAntinodeLine=element.line+(element.line-firstLine);
        antinodesMap=placeOneAntiNodes(antinodesMap,secondAntinodeCol,secondAntinodeLine);
        
        
    });
    return antinodesMap;
}

function placeOneAntiNodes(antinodesMap,antinodeCol,antinodeLine){
    if ((antinodeCol>-1)&&(antinodeCol<antinodesMap[0].length)&&(antinodeLine>-1)&&(antinodeLine<antinodesMap.length)){
        antinodesMap[antinodeLine][antinodeCol]='#';
    }
    return antinodesMap
}