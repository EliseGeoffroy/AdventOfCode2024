async function Day6(file){
    let text= await file.text();
    let textTable=text.split('\r\n');
    
    let initMap=[];
    textTable.forEach(element=>{
        initMap.push(element.split(''));
    });

    let initLine=0;
    let initCol=initMap[initLine].indexOf('^');

    while (initCol==-1){
        initLine++;
        initCol=initMap[initLine].indexOf('^')
    }

    let currentMap=JSON.parse(JSON.stringify(initMap));
    let lastCol=initCol;
    let lastLine=initLine+1;
    let currentLine=initLine;
    let currentCol=initCol;
    let nextCol=initCol;
    let nextLine=initLine-1;

    let getOutOfMap=false;

       while (!getOutOfMap){
        while (!getOutOfMap&&initMap[nextLine][nextCol]!='#'){
            lastCol=currentCol;
            lastLine=currentLine;
            currentCol=nextCol;
            currentLine=nextLine;
            currentMap[currentLine][currentCol]='X';
            [nextLine,nextCol]=moveForward(lastCol,lastLine,currentCol,currentLine);
            getOutOfMap=((nextCol>initMap[0].length-1)||(nextCol<0)||(nextLine>initMap.length-1)||(nextLine<0))?true:false;
        }
        if (!getOutOfMap){
            [nextLine,nextCol]=turnRight(lastCol,lastLine,currentCol,currentLine);
            getOutOfMap=((nextCol>initMap[0].length-1)||(nextCol<0)||(nextLine>initMap.length-1)||(nextLine<0))?true:false;
        }
        
    }

    let filteredMap=[];
    currentMap.forEach(element => {
       filteredMap.push(element.filter(el=>el=='X').length); 
    });
    
    document.getElementById('Result').textContent=filteredMap.reduce((a,b)=>a+b);
}

function moveForward(lastCol,lastLine, currentCol,currentLine){
    let nextCol=currentCol+(currentCol-lastCol);
    let nextLine=currentLine+(currentLine-lastLine);
    return [nextLine,nextCol];  
}

function turnRight(lastCol,lastLine, currentCol,currentLine){
    let nextLine=currentLine+(currentCol-lastCol);
    let nextCol=currentCol-(currentLine-lastLine);
    return [nextLine,nextCol];
}