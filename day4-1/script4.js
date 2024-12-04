async function Day4(file){
    let text= await file.text();
    let textTable=text.split('\r\n');
    let textTableSplitted=[];

    textTable.forEach(element => {
        textTableSplitted.push(element.split(''));
    });

    let occurNumber=0;
    let diagonalDownLeft=0;
    let diagonalDownRight=0;
    let diagonalUpLeft=0;
    let diagonalUpRight=0;
    let vertical=0
    let verticalBackwards=0
    let horizontal=0;
    let horizontalBackwards=0;
    
    for (let line=0; line<textTableSplitted.length; line++){
        for(let col=0;col<textTableSplitted[line].length;col++){
            if (textTableSplitted[line][col]=='X'){
                if (line<textTableSplitted.length-3){
                    vertical=verticalSearch(textTableSplitted,line,col);
                    if (col<textTableSplitted[line].length-3){
                        diagonalDownRight=diagonalDownRightSearch(textTableSplitted,line,col);
                    }
                    if (col>2){
                        diagonalDownLeft=diagonalDownLeftSearch(textTableSplitted,line,col);   
                    }
                }
                if (line>2){
                    verticalBackwards=verticalBackwardsSearch(textTableSplitted,line,col);
                    if (col<textTableSplitted[line].length-3){
                        diagonalUpRight=diagonalUpRightSearch(textTableSplitted,line,col);
                    }
                    if (col>2){
                        diagonalUpLeft=diagonalUpLeftSearch(textTableSplitted,line,col);   
                    }
                }
                if (col<textTableSplitted[line].length-3){
                    horizontal=horizontalSearch(textTableSplitted,line,col);
                }
                if (col>2){
                    horizontalBackwards=horizontalBackwardsSearch(textTableSplitted,line,col);
                }
               
                occurNumber+=diagonalUpRight+diagonalDownRight+diagonalUpLeft+diagonalDownLeft+horizontal+horizontalBackwards+vertical+verticalBackwards;

                diagonalDownLeft=0;
                diagonalDownRight=0;
                diagonalUpLeft=0;
                diagonalUpRight=0;
                vertical=0
                verticalBackwards=0
                horizontal=0;
                horizontalBackwards=0;
                
            }
        }
    }
    document.getElementById('Result').textContent=occurNumber;
   
}

function diagonalUpRightSearch(textTableSplitted,line,col){
    if (textTableSplitted[line-1][col+1]=='M'){
        if (textTableSplitted[line-2][col+2]=='A'){
            if (textTableSplitted[line-3][col+3]=='S'){
                return 1;
            }
        }
    }
    return 0;
}

function diagonalUpLeftSearch(textTableSplitted,line,col){ 
    if (textTableSplitted[line-1][col-1]=='M'){
        if (textTableSplitted[line-2][col-2]=='A'){
            if (textTableSplitted[line-3][col-3]=='S'){
                return 1;
            }
        }
    }
    return 0;
}

function diagonalDownRightSearch(textTableSplitted,line,col){
    if (textTableSplitted[line+1][col+1]=='M'){
        if (textTableSplitted[line+2][col+2]=='A'){
            if (textTableSplitted[line+3][col+3]=='S'){
                return 1;
            }
        }
    }
    return 0;
}

function diagonalDownLeftSearch(textTableSplitted,line,col){
    if (textTableSplitted[line+1][col-1]=='M'){
        if (textTableSplitted[line+2][col-2]=='A'){
            if (textTableSplitted[line+3][col-3]=='S'){
                return 1;
            }
        }
    }
    return 0;
} 

function horizontalSearch(textTableSplitted,line,col){
    if (textTableSplitted[line][col+1]=='M'){
        if (textTableSplitted[line][col+2]=='A'){
            if (textTableSplitted[line][col+3]=='S'){
                return 1;
            }
        }
    }
    return 0;
}

function horizontalBackwardsSearch(textTableSplitted,line,col){
    if (textTableSplitted[line][col-1]=='M'){
        if (textTableSplitted[line][col-2]=='A'){
            if (textTableSplitted[line][col-3]=='S'){
                return 1;
            }
        }
    }
    return 0;
}

function verticalSearch(textTableSplitted,line,col){
    if (textTableSplitted[line+1][col]=='M'){
        if (textTableSplitted[line+2][col]=='A'){
            if (textTableSplitted[line+3][col]=='S'){
                return 1;
            }
        }
    }
    return 0;
}
function verticalBackwardsSearch(textTableSplitted,line,col){
    if (textTableSplitted[line-1][col]=='M'){
        if (textTableSplitted[line-2][col]=='A'){
            if (textTableSplitted[line-3][col]=='S'){
                return 1;
            }
        }
    }
    return 0;
}