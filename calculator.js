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

       
        if (button.classList.contains('clear')) {
            current = '';
            operator = '';
            prev = '';
            resultDisplayed = false;
            updateDisplay('0');
            return;
        }

        
        if (button.classList.contains('equal')) {
            if (operator && prev !== '' && current !== '') {
                try {
                    let calculation = eval(`${prev}${operator}${current}`);
                    calculation = +parseFloat(calculation.toFixed(10)); 
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

        
        if (button.classList.contains('operator')) {
            if (prev === '' && current !== '') {
                prev = current;
                operator = value;
                current = '';
                updateDisplay(`${prev} ${operator}`); 
            } else if (operator && current !== '' && prev !== '') {
                let calculation = eval(`${prev}${operator}${current}`);
                calculation = +parseFloat(calculation.toFixed(10));
                prev = calculation.toString();
                operator = value;
                current = '';
                updateDisplay(`${prev} ${operator}`); 
            } else if (resultDisplayed) {
                operator = value;
                current = '';
                resultDisplayed = false;
                updateDisplay(`${prev} ${operator}`); 
            } else if (!operator && prev !== '') {
                operator = value;
                updateDisplay(`${prev} ${operator}`); 
            }
            return;
        }

        
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

        
        if (operator && prev !== '') {
            updateDisplay(`${prev} ${operator} ${current}`);
        } else {
            updateDisplay(current || '0');
        }
    });
});
