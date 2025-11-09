const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button button');

let current = '';
let operator = '';
let prev = '';
let resultDisplayed = false;

function updateDisplay(value) {
    display.textContent = value;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;

        // Clear button
        if (button.classList.contains('clear')) {
            current = '';
            operator = '';
            prev = '';
            resultDisplayed = false;
            updateDisplay('0');
            return;
        }

        // Equal button
        if (button.classList.contains('equal')) {
            if (operator && prev !== '' && current !== '') {
                try {
                    let calculation = eval(`${prev}${operator}${current}`);
                    calculation = +parseFloat(calculation.toFixed(10)); // fix floating precision
                    updateDisplay(calculation);
                    prev = calculation.toString();
                    current = '';
                    operator = '';
                    resultDisplayed = true;
                } catch {
                    updateDisplay('Error');
                }
            }
            return;
        }

        // Operator buttons (+, -, *, /)
        if (button.classList.contains('operator')) {
            if (prev === '' && current !== '') {
                prev = current;
                operator = value;
                current = '';
            } else if (operator && current !== '' && prev !== '') {
                let calculation = eval(`${prev}${operator}${current}`);
                calculation = +parseFloat(calculation.toFixed(10));
                updateDisplay(calculation);
                prev = calculation.toString();
                operator = value;
                current = '';
            } else if (resultDisplayed) {
                operator = value;
                current = '';
                resultDisplayed = false;
            } else if (!operator && prev !== '') {
                operator = value;
            }
            return;
        }

        // Handle numbers and decimal point
        if (resultDisplayed) {
            current = '';
            resultDisplayed = false;
        }

        if (value === '.') {
            if (!current.includes('.')) {
                current = current === '' ? '0.' : current + '.';
            }
        } else {
            current += value;
        }

        updateDisplay(current || '0');
    });
});
