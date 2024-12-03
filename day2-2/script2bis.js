async function Day2bis(file){
    let text= await file.text();
    let textTable=text.split('\r\n');
    let reportsTable=textTable.map((e)=>e.split(' '));
    let reportsTableFiltered=reportsTable.filter((e)=>isSafe(e,true));
    document.getElementById('Result').textContent=reportsTableFiltered.length;

}

function isSafe (report, firstError){

    let firstExamination=true;
    let increase=false;
    let decrease=false;
    let error=false;
    
    for (let i=0;i<report.length-1;i++){
        let currentValue=parseInt(report[i]);
        let nextValue=parseInt(report[i+1]);

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
                
                let report1= JSON.parse(JSON.stringify(report));
                report1.splice(i,1);
                if (isSafe(report1,false)){
                    return true;
                }
                else {
                      
                    let report2= JSON.parse(JSON.stringify(report));
                    report2.splice(i+1,1);
                    if (isSafe(report2,false)){
                        return true;
                    }
                    else {
                        let report3= JSON.parse(JSON.stringify(report));
                        report3.splice(i-1,1);
                        if (isSafe(report3,false)){
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

