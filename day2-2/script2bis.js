async function Day2bis(file){
    let text= await file.text();
    textTable=text.split('\r\n');
    reportsTable=textTable.map((e)=>e.split(' '));
    reportsTableFiltered=reportsTable.filter((e)=>isSafe(e,true));
    document.getElementById('Result').textContent=reportsTableFiltered.length;

}

function isSafe (report, firstError){

    firstExamination=true;
    increase=false;
    decrease=false;
    error=false;
    
    for (let i=0;i<report.length-1;i++){
        currentValue=parseInt(report[i]);
        nextValue=parseInt(report[i+1]);

        if ((Math.abs(currentValue-nextValue)>3) || (Math.abs(currentValue-nextValue)==0)){
            error=true;
        }
        else  {
            if (currentValue>nextValue){
                if (increase){
                    error=true;
                }
                else if (firstExamination){
                    decrease=true;
                    firstExamination=false;
                }
            }
            else if (currentValue<nextValue){
                
                if (decrease){
                    error=true;
                }
                else if (firstExamination){
                    increase=true;
                    firstExamination=false;
                }
            }
        }
        if (error){
            if (firstError){
                
                
                report1= JSON.parse(JSON.stringify(report));
                report1.splice(i,1);
                if (isSafe1(report1,false)){
                    return true;
                }
                else {
                  
                    
                    report2= JSON.parse(JSON.stringify(report));
                    report2.splice(i+1,1);
                    if (isSafe1(report2,false)){
                        return true;
                    }
                    else {
                        report3= JSON.parse(JSON.stringify(report));
                        report3.splice(i-1,1);
                        if (isSafe1(report3,false)){
                            return true;
                        }
                        else {

                        return false;
                        }
                    }
                }
            }
            else {
                return false;
            }
        
        }
        
    }
    return true;
}

