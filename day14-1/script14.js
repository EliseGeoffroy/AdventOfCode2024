async function Day14(file){
    let tall=7;
    let wide=11;

    let text= await file.text();
    let textTable=text.split('\r\n');

    let robotsPositionTable=[];
    let robotsVelocityTable=[];
    textTable.forEach(element => {
        let nonFormattedRobot=element.split(' ');

        let position=nonFormattedRobot[0];
        let positionX=position.slice(2,position.indexOf(','));
        let positionY=position.slice(position.indexOf(',')+1);

        robotsPositionTable.push({positionX:positionX,positionY:positionY});

        let velocity=nonFormattedRobot[1];
        let velocityX=velocity.slice(2,velocity.indexOf(','));
        let directionX=(velocityX[0]=='-')?'-':'+';
        velocityX=(directionX=='-')?velocityX.slice(1):velocityX;
        let velocityY=velocity.slice(velocity.indexOf(',')+1);
        let directionY=(velocityY[0]=='-')?'-':'+';
        velocityY=(directionY=='-')?velocityY.slice(1):velocityY;

        robotsVelocityTable.push({directionX:directionX,velocityX:velocityX,directionY:directionY,velocityY:velocityY});
    
    });
   

    let initMap=placeRobots(robotsPositionTable,wide,tall);
    //console.log(initMap)


    let timeInterval=1;
    
    while (timeInterval<101){

        robotsPositionTable.forEach((element,index) => {
            let newPositionX= calculatePosition(element.positionX,robotsVelocityTable[index].directionX,robotsVelocityTable[index].velocityX,wide);
            let newPositionY= calculatePosition(element.positionY,robotsVelocityTable[index].directionY,robotsVelocityTable[index].velocityY,tall);
            element.positionX=newPositionX;
            element.positionY=newPositionY;
        });
    //    console.log ('après ',timeInterval,' s=>',placeRobots(robotsPositionTable,wide,tall));
        timeInterval++;
    }
    
    let finalMap=placeRobots(robotsPositionTable,wide,tall);

    let result=1;

    result*=calculateNbRobotsQuadrant(finalMap,0,Math.floor(wide/2),0,Math.floor(tall/2));
    result*=calculateNbRobotsQuadrant(finalMap,Math.ceil(wide/2),wide,0,Math.floor(tall/2));
    result*=calculateNbRobotsQuadrant(finalMap,Math.ceil(wide/2),wide,Math.ceil(tall/2),tall);
    result*=calculateNbRobotsQuadrant(finalMap,0,Math.floor(wide/2),Math.ceil(tall/2),tall);

    document.getElementById('Result').textContent=result;

}

function placeRobots(robotsTable,wide,tall){
    let map=[];
    for (let i=0;i<tall;i++){
        let newLine=[];
        for (let j=0;j<wide;j++){
            newLine.push('.');
        }
        map.push(newLine);
    }

    robotsTable.forEach(robot => {
        if (map[robot.positionY][robot.positionX]=='.'){
            map[robot.positionY][robot.positionX]=1
        }else{
            map[robot.positionY][robot.positionX]++
        }
    });

    return map;
}

function calculatePosition(lastPosition,direction,velocity,size){
    let newPosition=0;
    if (direction=='-'){
        newPosition=parseInt(lastPosition)-parseInt(velocity);
    }else {
        newPosition=parseInt(lastPosition)+parseInt(velocity);
    }
    if (newPosition<0){
        newPosition=size+newPosition;
    } else if (newPosition>=size){
        newPosition=newPosition-size;
    }

    return newPosition;
}

function calculateNbRobotsQuadrant(finalMap,startX,endX,startY,endY){
    let nbRobotsQuadrant=0;
    for(let i=startY; i<endY;i++){
        for (let j=startX;j<endX;j++){
            if (finalMap[i][j]!='.'){
                nbRobotsQuadrant+=finalMap[i][j];
            }
        }
    }
    return nbRobotsQuadrant;

}