async function Day4bis(file){
    let text= await file.text();
    let textTable=text.split('\r\n');
    let textTableSplitted=[];

    textTable.forEach(element => {
        textTableSplitted.push(element.split(''));
    });

    let occurNumber=0;
    
    
    for (let line=0; line<textTableSplitted.length; line++){
        for(let col=0;col<textTableSplitted[line].length;col++){
            if (textTableSplitted[line][col]=='A'){
                if ((line>0)&&(line<textTableSplitted.length-1)&&(col>0)&&(col<textTableSplitted[line].length-1)){
                   if (diagonalDownRightSearch(textTableSplitted,line,col)||diagonalUpLeftSearch(textTableSplitted,line,col)){
                    if (diagonalDownLeftSearch(textTableSplitted,line,col)||diagonalUpRightSearch(textTableSplitted,line,col)){
                        occurNumber++;
                    }
                   }
                }                
            }
        }
    }
    document.getElementById('Result').textContent=occurNumber;
   
}

function diagonalUpRightSearch(textTableSplitted,line,col){
    if (textTableSplitted[line+1][col-1]=='M'){
        if (textTableSplitted[line-1][col+1]=='S'){
            return true;
        }
    }
    return false;
}

function diagonalUpLeftSearch(textTableSplitted,line,col){ 
    if (textTableSplitted[line+1][col+1]=='M'){
        if (textTableSplitted[line-1][col-1]=='S'){
            return true;
        }
    }
    return false;
}

function diagonalDownRightSearch(textTableSplitted,line,col){
    if (textTableSplitted[line-1][col-1]=='M'){
        if (textTableSplitted[line+1][col+1]=='S'){
            return true;
        }
    }
    return false;
}

function diagonalDownLeftSearch(textTableSplitted,line,col){
    if (textTableSplitted[line-1][col+1]=='M'){
        if (textTableSplitted[line+1][col-1]=='S'){
            return true;
        }
    }
    return false;
} 
