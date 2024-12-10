async function Day9(file){
    let text= await file.text();
    let diskMap=text.split('');

    let initFileBlockMap=[];
    let id=0;
    let fileBlock=true;
    diskMap.forEach(element => {
        if (fileBlock==true){
            for (let i=0;i<element;i++){
                initFileBlockMap.push(id);
            }
            id++;
            fileBlock=false;
        } else {
            for (let i=0;i<element;i++){
                initFileBlockMap.push('.');
            }
            fileBlock=true;
        }
    });


    let fileBlockMap=JSON.parse(JSON.stringify(initFileBlockMap));
    let freeSpacePosition=fileBlockMap.indexOf('.');

    while ((freeSpacePosition!=-1)&&(freeSpacePosition<fileBlockMap.length-1)){
        lastNumber=fileBlockMap.pop();
        fileBlockMap[freeSpacePosition]=lastNumber;
        freeSpacePosition=fileBlockMap.indexOf('.');
    }


let result=0;

fileBlockMap.forEach((element,index) => {
    if (typeof element=="number"){
        result+=element*index;
    }

});

document.getElementById('Result').textContent=result;

}