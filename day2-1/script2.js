async function Day2(file){
    let text= await file.text();
    let textTable=text.split('\r\n');
    let reportsTable=textTable.map((e)=>e.split(' '));
    
    let reportsTableFiltered=reportsTable.filter((e)=>isSafe(e));

    document.getElementById('Result').textContent=reportsTableFiltered.length;

}

function isSafe (report){
    
    let firstExamination=true;
    let increase=false;
    let decrease=false;

    for (let i=0;i<report.length-1;i++){
        let currentValue=parseInt(report[i]);
        let nextValue=parseInt(report[i+1]);

        if ((Math.abs(currentValue-nextValue)>3) || (Math.abs(currentValue-nextValue)==0)){
            return false;
        }
        else  {
            if (currentValue>nextValue){
                if (increase){
                    return false;
                }
                else if (firstExamination){
                    decrease=true;
                    firstExamination=false;
                }
            }
            else if (currentValue<nextValue){
                if (decrease){
                    return false
                }
                else if (firstExamination){
                    increase=true;
                    firstExamination=false;
                }
            }
        }
    }
    return true;
}