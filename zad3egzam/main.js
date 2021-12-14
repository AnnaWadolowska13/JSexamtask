//--------------SUDOKU------------------------
//Sudoku with cols and rows with numeration 0-8
//Value in Sudoku is 1 to 9, 0 means blank
//sudoku also have a squares like this numeration
// 0 | 1 | 2
// 3 | 4 | 5
// 6 | 7 | 8 

class SudokuBox {
    constructor(value, row, col) {
        this.value = value;
        this.row = row;
        this.col = col;

        if (row == 0 || row == 1 || row == 2) { // to check in witch square we are i use floor of col divide by 3 
            this.square = Math.floor(col / 3);
        } else if (row == 3 || row == 4 || row == 5) {
            this.square = Math.floor(col / 3) + 3; // in rows 3,4,5 we need add to number od square 3
        } else { //row = 6,7,8
            this.square = Math.floor(col / 3) + 6; // in rows 6,7,8 we need add 6
        }
        this.possibleValue = [];
    }
}

class Sudoku {
    constructor(data) {
        console.log("control length of Data, (must be 81):", data.length);
        this.sudoku = data.map((x, index) => {
            return new SudokuBox(x, Math.floor(index / 9), index % 9)
        });
        this.counterBlankBoxes = 0;
        this.sudokuPossibleValue = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.showSudoku(this.sudoku);
    }
    solve() {
        // fill possible value to blank SudokuBoxes
        this.sudoku.forEach(sudokuBox => {
            if (sudokuBox.value == 0) {
                sudokuBox.possibleValue = this.sudokuPossibleValue;
                this.checking(this.sudoku, sudokuBox)
                this.counterBlankBoxes++;
            }
        });
        // console.log("Sudoku:", sudoku);
        // this.showSudoku(this.sudoku);
        // console.log('counter blank boxes', this.counterBlankBoxes);

        while (this.counterBlankBoxes != 0) { //as long as we have blank boxes we need to search solution
            this.sudoku.forEach(sudokuBox => {
                if (sudokuBox.possibleValue.length == 1) { // if we have only 1 option we need put it in value of Box
                    sudokuBox.value = sudokuBox.possibleValue[0];
                    sudokuBox.possibleValue = [];
                    this.counterBlankBoxes--;
                    // console.log("counter", counterBlankBoxes);
                    if (this.counterBlankBoxes != 0) {// if we steel have blank boxes we have to update PossibleValues 
                        this.sudoku.forEach(element => {
                            if (this.conditionSudoku(element, sudokuBox)) { //especially in the same col, row and square 
                                this.checking(this.sudoku, element, sudokuBox.value);
                            }// remomveItem=sudokuBox.value , this is only value to remove
                        })
                    }
                }
            });
        };
    }

    conditionSudoku(element, sudokuBox) {
        return (element.row == sudokuBox.row || element.col == sudokuBox.col || element.square == sudokuBox.square)
    }

    checking(sudoku, sudokuBox, removeItemm) {
        let valueToRemoveFromPossible = [];
        if (removeItemm) { // if we have removeItem we need remove only it from possibleValues
            valueToRemoveFromPossible.push(removeItemm);
        }
        else { // create possibleValue at the beggining of game
            sudoku.forEach(element => { //checking for all sudoku elemenets, rows equal or col equal or square equal
                if (this.conditionSudoku(element, sudokuBox)) {
                    if (!valueToRemoveFromPossible.includes(element.value)) { // if we dont have that element in our array
                        valueToRemoveFromPossible.push(element.value); // then push then to it
                    }
                }
            });
        }
        // filter to remove from possible value all elements from valueToRemoveFromPossible array
        let newPossibleValue = sudokuBox.possibleValue.filter((value) => !valueToRemoveFromPossible.includes(value));
        sudokuBox.possibleValue = newPossibleValue;
    }

    showSudoku() {
        console.log("-----------------SUDOKU-----------------");
        console.log('||', this.sudoku[0].value, "|", this.sudoku[1].value, "|", this.sudoku[2].value, "||", this.sudoku[3].value, "|", this.sudoku[4].value, "|", this.sudoku[5].value, "||", this.sudoku[6].value, "|", this.sudoku[7].value, "|", this.sudoku[8].value, "||");
        console.log('||', this.sudoku[9].value, "|", this.sudoku[10].value, "|", this.sudoku[11].value, "||", this.sudoku[12].value, "|", this.sudoku[13].value, "|", this.sudoku[14].value, "||", this.sudoku[15].value, "|", this.sudoku[16].value, "|", this.sudoku[17].value, "||");
        console.log('||', this.sudoku[18].value, "|", this.sudoku[19].value, "|", this.sudoku[20].value, "||", this.sudoku[21].value, "|", this.sudoku[22].value, "|", this.sudoku[23].value, "||", this.sudoku[24].value, "|", this.sudoku[25].value, "|", this.sudoku[26].value, "||");
        console.log("=========================================");
        console.log('||', this.sudoku[27].value, "|", this.sudoku[28].value, "|", this.sudoku[29].value, "||", this.sudoku[30].value, "|", this.sudoku[31].value, "|", this.sudoku[32].value, "||", this.sudoku[33].value, "|", this.sudoku[34].value, "|", this.sudoku[35].value, "||");
        console.log('||', this.sudoku[36].value, "|", this.sudoku[37].value, "|", this.sudoku[38].value, "||", this.sudoku[39].value, "|", this.sudoku[40].value, "|", this.sudoku[41].value, "||", this.sudoku[42].value, "|", this.sudoku[43].value, "|", this.sudoku[44].value, "||");
        console.log('||', this.sudoku[45].value, "|", this.sudoku[46].value, "|", this.sudoku[47].value, "||", this.sudoku[48].value, "|", this.sudoku[49].value, "|", this.sudoku[50].value, "||", this.sudoku[51].value, "|", this.sudoku[52].value, "|", this.sudoku[53].value, "||");
        console.log("=========================================");
        console.log('||', this.sudoku[54].value, "|", this.sudoku[55].value, "|", this.sudoku[56].value, "||", this.sudoku[57].value, "|", this.sudoku[58].value, "|", this.sudoku[59].value, "||", this.sudoku[60].value, "|", this.sudoku[61].value, "|", this.sudoku[62].value, "||");
        console.log('||', this.sudoku[63].value, "|", this.sudoku[64].value, "|", this.sudoku[65].value, "||", this.sudoku[66].value, "|", this.sudoku[67].value, "|", this.sudoku[68].value, "||", this.sudoku[69].value, "|", this.sudoku[70].value, "|", this.sudoku[71].value, "||");
        console.log('||', this.sudoku[72].value, "|", this.sudoku[73].value, "|", this.sudoku[74].value, "||", this.sudoku[75].value, "|", this.sudoku[76].value, "|", this.sudoku[77].value, "||", this.sudoku[78].value, "|", this.sudoku[79].value, "|", this.sudoku[80].value, "||");
        console.log("=========================================");
    }
}

const dataForSudoku = [7, 0, 4, 8, 0, 0, 3, 0, 1, 8, 2, 0, 5, 0, 0, 0, 4, 0, 0, 0, 9, 4, 3, 0, 5, 0, 0, 3, 1, 0, 0, 0, 0, 8, 0, 7, 0, 8, 0, 0, 0, 0, 0, 1, 0, 9, 0, 7, 0, 0, 0, 0, 3, 2, 0, 0, 6, 0, 1, 5, 4, 0, 0, 0, 7, 0, 0, 0, 9, 0, 6, 5, 5, 0, 8, 0, 0, 2, 1, 0, 3];
const mySudoku = new Sudoku(dataForSudoku)

mySudoku.solve();
mySudoku.showSudoku();
