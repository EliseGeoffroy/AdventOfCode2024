async function Day11bis(file) {
    let text = await file.text();
    let initMap = text.split(' ');

    let afterFirstPassageMap = afternbBlinks(initMap, 37);

    let analyzedNumbers = [];
    afterFirstPassageMap.forEach(element => {
        let index = analyzedNumbers.findIndex(el => el.number == element)

        if (index == -1) {
            elementAfterFirstMap = afternbBlinks([element], 38);
            analyzedNumbers.push({ number: element, length: elementAfterFirstMap.length, quantity: 1 });

        } else {
            analyzedNumbers[index].quantity++;
        }

    });

    let mapslengthTable = [];
    analyzedNumbers.forEach(element => {
        mapslengthTable.push(element.length * element.quantity);
    });

    document.getElementById('Result').textContent = mapslengthTable.reduce((a, b) => a + b);
}

function afternbBlinks(initMap, nbBlinks) {
    let blink = 1;
    let lastMap = JSON.parse(JSON.stringify(initMap));
    while (blink < nbBlinks + 1) {
        let currentMap = [];
        lastMap.forEach(element => {
            if (element == '0') {
                currentMap.push(1);
            } else {
                let elementLength = element.toString().length
                if (elementLength % 2 == 0) {
                    let half = elementLength / 2;
                    let firstHalf = element.toString().slice(0, half);

                    let lastHalf = element.toString().slice(half);
                    if (lastHalf[0] == 0) {
                        let i = 0;
                        while (i < lastHalf.length - 1 && lastHalf[i] == 0) {
                            i++;
                        }
                        lastHalf = lastHalf.slice(i);
                    }
                    currentMap.push(firstHalf, lastHalf);
                }
                else {
                    currentMap.push(parseInt(element) * 2024);
                }
            }
        });

        lastMap = JSON.parse(JSON.stringify(currentMap));

        blink++;
    }
    return lastMap;
}