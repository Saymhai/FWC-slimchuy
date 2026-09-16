const lValue = document.getElementById('leftOper');
const rValue = document.getElementById('rightOper');
const operator = document.getElementById('operator');
const btn = document.getElementById('btn');

function calcurate () {
    const num1 = parseInt(lValue.value, 10);
    const num2 = parseInt(rValue.value, 10);
    const op = operator.value;

    if (!/^\d+$/.test(num1) || !/^\d+$/.test(num2)) {
        alert('Error :(');
        return;
    }

    if ((op === '/' || op ==='%') && num2 === 0) {
        alert("It's over 9000!");
        return;
    }

    let result;
    switch (op) {
        case '+': result = num1 + num2;
            break;
        case '-': result = num1 - num2;
            break;
        case '*': result = num1 * num2;
            break;
        case '/': result = num1 / num2;
            break;
        case '%': result = num1 % num2;
            break;
    }

    alert(result);
    console.log(result);
}

btn.addEventListener('click', calcurate);

setInterval(() => {
    alert('Please, use me...');
}, 30000);