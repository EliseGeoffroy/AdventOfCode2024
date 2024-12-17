async function Day13(file){
    let text= await file.text();
    let textTable=text.split('\r\n\r\n');

    let textTableSplitted=[];
    textTable.forEach(element => {
        textTableSplitted.push(element.split('\r\n'));
    });

    let machinesList=[];
    textTableSplitted.forEach(machine => {
        let oneMachineTable=[];
        machine.forEach((element,index) => {
            let type=0;
            let X='';
            let Y='';
            if (index==2){
                type='Prize'
                X=element.slice(element.indexOf('=')+1,element.indexOf(','));
                Y=element.slice(element.indexOf('=',element.indexOf(','))+1);
            } else {
                if (index==0){
                    type='A';
                }
                if (index==1){
                    type='B';
                }
                X=element.slice(element.indexOf('+')+1,element.indexOf(','));
                Y=element.slice(element.indexOf('+',element.indexOf(','))+1);
            }

            oneMachineTable.push({type:type,X:X,Y:Y});
        });
        machinesList.push(oneMachineTable);
    });
    

    let tokenList=[];

    machinesList.forEach((element,index) => {

        let AX=element[0].X;
        let AY=element[0].Y;
        let tokenA=3;
        let tokenB=1;
        let BX=element[1].X;
        let BY=element[1].Y;
        let finalX=element[2].X;
        let finalY=element[2].Y;
        let usedToken=0;

       let a=0
        while ((a<100)){
            let b=0;
            while(b<100){
                let calculateX=a*AX+b*BX;
                let calculateY=a*AY+b*BY;
            
                if ((calculateX==finalX)&&(calculateY==finalY)){
                    let calculateToken=a*tokenA+b*tokenB;
                    if ((calculateToken<usedToken)||(usedToken==0)){
                        usedToken=calculateToken;
                    }
                }
            b++;
            }
            a++;
        }
        tokenList.push({machine:index,token:usedToken});
    });
    let result=0;
    tokenList.forEach(element => {
        result+=element.token
    });
    document.getElementById('Result').textContent=result;

}