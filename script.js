const add = (a, b) => {
    return Number(a) + Number(b)
}

const subtract = (a, b) => {
    return a - b
}

const multiply = (a, b) => {
    return a * b
}

const divide = (a, b) => {
    return a / b
}

const operate = (a, b, operator) => {
    if (operator === '+') {
        return add(a, b)
    } else if (operator === '-') {
        return subtract(a, b)
    } else if (operator === '*') {
        return multiply(a, b)
    } else if (operator === '/') {
        return divide(a, b)
    }
}

const buttons = document.querySelectorAll('button')
const display = document.querySelector('.display')
let a = ''
let b = ''
let operator = ''

buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        if (event.target.classList.contains('number')) {
            if (b == '' && operator == '') {
                a += event.target.value
            } else if (a && operator) {
                b += event.target.value
            }
            if (display.textContent == '0') {
                display.textContent = ''
                display.textContent += event.target.value
            } else {
                display.textContent += event.target.value
            }
        } else if (event.target.classList.contains('dot')) {
            if (b == '' && operator == '' && !a.includes('.')) {
                a += event.target.value
                display.textContent += event.target.value
            } else if (a && operator && !b.includes('.')) {
                b += event.target.value
                display.textContent += event.target.value
            }
        } else if (event.target.classList.contains('sign')) {
            if (a && b == '') {
                operator = event.target.value
            } else if (a && b) {
                const results = operate(a, b, operator)
                a = results
                operator = event.target.value
                b = ''
                display.textContent = a
            }
            const signs = /[+\-*\/]/
            if (signs.test(display.textContent)) {
                display.textContent = display.textContent.replace(signs, event.target.value)
            } else {
            display.textContent += ` ${event.target.value} `
            }
        } else if (event.target.classList.contains('clear')) {
            a = ''
            b = ''
            operator = ''
            display.textContent = '0'
        } else if (event.target.classList.contains('equal')) {
            const results = operate(a, b, operator)
            display.textContent = results
        }
    })
})