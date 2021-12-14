class Deck {
    constructor(colors, figures) {
        this.cards = [];
        colors.forEach(color => {
            for (let index = 0; index < figures.length; index++) {
                this.cards.push(new Card(new Color(color), new Figure(figures[index], index)))
            }
        });
    };
}

class Card {
    constructor(color, figure) {
        this.color = color;
        this.figure = figure;
    }
}

class Color {
    constructor(name) {
        this.name = name;
    }
}
class Figure {
    constructor(figure, index) {
        this.name = figure;
        this.value = index;
    }
}

class Hand {
    constructor(deck) {
        this.handCards = [];
        for (let index = 0; index < 5; index++) { // draw 5 cards
            let card = deck.cards.splice(Math.floor(Math.random() * deck.cards.length), 1);
            this.handCards.push(card[0]);
        }
        console.log(this.handCards)
        this.handCards.sort((a, b) => { return (a.figure.value - b.figure.value) }) // sort cards with value of figure
    };

    bestFigureConfiguration() {
        // solve poker 
        const { duplicateFigures, duplicateColors } = this.duplicate();
        const flushAnswer = this.flush(duplicateColors);
        const straightAnswer = this.straight(this.handCards);
        if (flushAnswer && straightAnswer) {
            console.log("You have Straight Flush in color: " + this.handCards[0].color.name, this.handCards);
        } else if (flushAnswer) {
            console.log("You have Flush in color " + this.handCards[0].color.name, this.handCards);
        } else if (straightAnswer) {
            console.log("You have Straight: ", this.handCards);
        } else {
            switch (duplicateFigures.length) {
                case 5:
                    console.log("You have FullHouse: ", duplicateFigures);
                    break;
                case 4:
                    // console.log(this.twoPairOrFourKind(duplicateArray))
                    if (this.twoPairOrFourKind(duplicateFigures)) {
                        console.log("You have Two Pair: ", duplicateFigures);
                    } else {
                        console.log("You have Four of a Kind: ", duplicateFigures);
                    }
                    break;
                case 3:
                    console.log("You have Three of a Kind: ", duplicateFigures);
                    break;
                case 2:
                    console.log("You have Pair of a Kind: ", duplicateFigures);
                    break;
                case 0:
                    console.log("Your highest card is:", this.highCard())
                    break;
            }
        }
    }

    flush(duplicateColors) {
        if (duplicateColors.length === 5) {
            for (let i = 0; i < duplicateColors.length; i++) {
                for (let j = 0; j < duplicateColors.length; j++) {
                    if (i !== j && duplicateColors[i].color.name !== duplicateColors[j].color.name) return false;
                }
            }
            return true; // if every cards have the same color name we have flush
        }
        return false; // if some color is not the same, only duplicats, or quantity is't 5 then false
    }

    straight(handCards) {
        // console.log("straight funkcja");
        for (let index = 0; index < handCards.length - 1; index++) { // array has been sorted earlier
            // console.log("straight petla");
            // console.log('straight przed ifem ', handCards[index].figure.value, handCards[index + 1].figure.value);
            if ((handCards[index].figure.value + 1) !== handCards[index + 1].figure.value) { //checking cards value 
                // console.log("straight if");
                return false; // if any of them are not consecutiv (+1 value) then we don't have straight
            }
        }
        return true;
    }

    twoPairOrFourKind(duplicate) {
        for (let i = 0; i < duplicate.length; i++) {
            for (let j = 0; j < duplicate.length; j++) {
                if (i !== j && duplicate[i].figure.value !== duplicate[j].figure.value) { //if any card have another value 
                    // console.log("dwie pary"); // thats means is two pair 
                    return true;
                }
            }
        }
        return false; // if not, we have four of a kind
    }

    duplicate() {
        let duplicateFigures = [];
        let duplicateColors = [];
        for (let i = 0; i < this.handCards.length; i++) {
            for (let j = 0; j < this.handCards.length; j++) {
                if (i !== j) { // if we have diffrent cards
                    // Check for duplicate figures or colors
                    if (this.handCards[i].figure.value === this.handCards[j].figure.value) { // if value is the same
                        if (!duplicateFigures.includes(this.handCards[i])) { // and we dont have it in array
                            duplicateFigures.push(this.handCards[i]);//then push to array
                        };
                    } else if (this.handCards[i].color.name === this.handCards[j].color.name) { // if color is the same
                        if (!duplicateColors.includes(this.handCards[i])) { // and we dont have it in array
                            duplicateColors.push(this.handCards[i]);//then push to array
                        };
                    }
                }
            }
        }
        return {
            duplicateFigures: duplicateFigures,
            duplicateColors: duplicateColors
        }
    }
    highCard() {
        return hand.handCards[4];
    }
}


let dataColors = ["trefl", "karo", "kier", "pik"];
// let dataColors = ["trefl"];
let dataFigures = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Walet", "Dama", "Król", "As"];
// let dataFigures = ["2", "3", "4"];
// let dataFigures = ["2", "3", "4", "5", "6", "7"];

const deck = new Deck(dataColors, dataFigures)
const hand = new Hand(deck);

console.log('--------------------------------------hand-----------------------------------------', hand.handCards, '-------------------------------------------------------------------------------');

hand.bestFigureConfiguration();
