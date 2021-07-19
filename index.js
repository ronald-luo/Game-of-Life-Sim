let board = []

for (let i = 0; i < 35; i++) {
    board.push([])
    for (let j = 0; j < 65; j++) {
        (Math.random() >= 0.5) ? board[i][j] = 1 : board[i][j] = 0
    }
}

function gameOfLife (board) {
    
    const neighbourCalc = () => { 
        const rows = board.length    
        const cols = board[0].length

        const neighbours = {
            0: "board[i-1][j-1]",
            1: "board[i-1][j]",
            2: "board[i-1][j+1]",
            3: "board[i][j-1]",
            4: "board[i][j+1]",
            5: "board[i+1][j-1]",
            6: "board[i+1][j]",
            7: "board[i+1][j+1]",
        }

        let result = []

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let neighbourSum = 0;
                let cell = board[i][j]
                for (let n = 0; n < 8; n++) {
                    try {
                        let temp = neighbours[n]

                        if (eval(temp) === undefined) {
                            neighbourSum += 0
                        } else {
                            neighbourSum += eval(temp)
                        }
                    } 
                    catch (e) {
                        neighbourSum += 0         
                    }
                }
                result.push(neighbourSum)
            }
        }
        return result
    }
    
    // console.log(neighbourCalc())
    
    const nextState = (neighbours) => {
        const rows = board.length    
        const cols = board[0].length
        let count = 0
        
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let cell = board[i][j]
                neighbourSum = neighbours[count]
                
                if (cell === 1) {
                    if (neighbourSum < 2) {
                        board[i][j] = 0
                    } else if (neighbourSum > 3) {
                        board[i][j] = 0
                    } else {
                        board[i][j] = 1
                    }

                } else if (cell === 0) {
                    if (neighbourSum === 3) {
                        board[i][j] = 1
                    } else {
                        board[i][j] = 0
                    }
                } else {
                    console.log('something went wrong')
                } 
                count++
            }
        }
    }
    // console.log(board)
    
    const update = (() => {
        nextState(neighbourCalc())
    })()
};

function updateUI() {
    
    const clearBoard = (() => {
        const nodes = document.querySelectorAll('.cell');
        const container = document.querySelector('.game-of-life');

        nodes.forEach((node) => {
            node.parentNode.removeChild(node);
        })

    })();

    const displayBoard = (() => {
        const container = document.querySelector('.game-of-life');
        const rows = board.length    
        const cols = board[0].length

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell')

                if (board[i][j] === 1) {
                    cell.classList.add('live')
                } else {
                    cell.classList.add('dead')
                }
                
                container.appendChild(cell)
            }
        }
    })();
}

let fps = 5
const framerateRange = document.getElementById('framerate')
const units1 = document.querySelector('.units1')


var joe = setInterval(() => {
    gameOfLife(board);
    updateUI();
}, fps)

framerateRange.oninput = () => {
    joe.clearInterval()
    fps = framerateRange.value
    units1.textContent = `${fps} fps`
}