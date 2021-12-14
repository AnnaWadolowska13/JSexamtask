const arrayWithBalls = [];
const firstWeighting = [];
const secondWeighting = [];
let leftPlaceArray, rightPlaceArray, sumLeftPlaceWeight = 0, sumRightPlaceWeight = 0;

randomIndex = function () {
    return Math.floor(Math.random() * 8)
}

for (let index = 0; index < 8; index++) {
    arrayWithBalls.push({
        index: index,
        value: 1,
    })
} //create array with balls with the same value

arrayWithBalls[randomIndex()].value = 2; // one ball in random position have value 2
console.log('main array', arrayWithBalls);

//------------------------FIRST WEIGHTING-----------------------------------

while (firstWeighting.length != 6) {
    let indexRandomlyChoose = randomIndex();
    if (firstWeighting.includes(arrayWithBalls[indexRandomlyChoose])) { //checking if randomly element is in firstWeighting
        indexRandomlyChoose = randomIndex(); // if is in there, we search new one 
    }
    else {
        firstWeighting.push(arrayWithBalls[indexRandomlyChoose]);
    }
}
leftPlaceArray = firstWeighting.slice(0, 3); //division for to places
rightPlaceArray = firstWeighting.slice(3, 6);

console.log("Array to first weighting", firstWeighting);

for (index = 0; index < 3; index++) {
    // console.log(index);
    sumLeftPlaceWeight += leftPlaceArray[index].value;
    sumRightPlaceWeight += rightPlaceArray[index].value;

}

console.log('First Weighting resoult');
console.log('Left Place Weight:', sumLeftPlaceWeight);
console.log('Right Place Weight:', sumRightPlaceWeight);



if (sumRightPlaceWeight == sumLeftPlaceWeight) { // if sum is equal that means in 2 remaining balls we have heavy one
    arrayWithBalls.forEach(ball => {
        if (!firstWeighting.includes(ball)) {//no one ball for first weigthing can be in second
            secondWeighting.push(ball)
        }
    })
} else if (sumLeftPlaceWeight > sumRightPlaceWeight) {//if true we need balls from left place
    arrayWithBalls.forEach(ball => {
        if (leftPlaceArray.includes(ball)) secondWeighting.push(ball);
    });
} else if (sumLeftPlaceWeight < sumRightPlaceWeight) {// if true we need balls from right place
    arrayWithBalls.forEach(ball => {
        if (rightPlaceArray.includes(ball)) secondWeighting.push(ball);
    });
}

//----------------------------SECOND WEIGHTING-----------------------------------------------
console.log('secondWeighting', secondWeighting);
// order of conditions is important, in this order we eleminate problem with checking quantity of balls
if (secondWeighting[0].value > secondWeighting[1].value) {
    console.log('we found heavy ball: ', secondWeighting[0]);
} else if (secondWeighting[0].value < secondWeighting[1].value) {
    console.log('we found heavy ball: ', secondWeighting[1]);
} else if (secondWeighting[0].value == secondWeighting[1].value) {
    console.log('we found heavy ball: ', secondWeighting[2]);
}

