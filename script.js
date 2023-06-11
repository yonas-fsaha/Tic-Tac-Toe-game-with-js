const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellelement = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningmessagetextelement = document.querySelector(
    '[data-winning-message-text]')
const winningmessagelement = document.getElementById('winning-message')
const restartbutton = document.getElementById('restartbutton')
let circleturn

startgame()

restartbutton.addEventListener('click', startgame)

function startgame() {
    circleturn = false
    cellelement.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleclick)
        cell.addEventListener('click', handleclick, { once: true })
    })
    setboardhoverclass()
    winningmessagelement.classList.remove('show')
}


function handleclick(e) {
    const cell = e.target
    const currentclass = circleturn ? CIRCLE_CLASS : X_CLASS
    placemark(cell, currentclass)
    if (checkwin(currentclass)) {
        endgame(false)
    } else if (isdraw()) {
        endgame(true)
    } else {
        swapturns()
        setboardhoverclass()
    }
}

function endgame(drow) {
    if (drow) {
        winningmessagelement.innerText = 'both faild!'

    } else {
        winningmessagetextelement.innerText = `${circleturn ? 
        'o is the winner' : 'x is the winner'}`
    }
    winningmessagelement.classList.add('show')
}

function isdraw() {
    return [...cellelement].every(cell => {
        return cell.classList.contains(X_CLASS) ||
            cell.classList.contains(CIRCLE_CLASS)
    })
}

function placemark(cell, currentclass) {
    cell.classList.add(currentclass)
}

function swapturns() {
    circleturn = !circleturn
}

function setboardhoverclass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleturn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkwin(currentclass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellelement[index].classList.contains(currentclass)
        })
    })
}