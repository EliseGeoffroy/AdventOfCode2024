async function Day11(file){
    let text= await file.text();
    let initMap=text.split(' ');

    let blink=1;
    let lastMap=JSON.parse(JSON.stringify(initMap));
    
    
    while (blink<26){
        let currentMap=[];
        lastMap.forEach(element => {
            if (element=='0'){
                currentMap.push(1);
            }else  {
                if (element.toString().length%2==0){
                    let half=element.toString().length/2;
                    let firstHalf=element.toString().slice(0,half);

                    let lastHalf=element.toString().slice(half);
                    if (lastHalf[0]==0){
                        let i=0;
                        while(i<lastHalf.length-1&&lastHalf[i]==0){
                            i++;
                        }
                        lastHalf=lastHalf.slice(i);
                    }
                    currentMap.push(firstHalf,lastHalf);
                }
                else {
                    currentMap.push(parseInt(element)*2024);
                }
            }
        });
        lastMap=JSON.parse(JSON.stringify(currentMap));
        blink++;
    }

    document.getElementById('Result').textContent=lastMap.length;
}