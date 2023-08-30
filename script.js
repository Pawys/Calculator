let a;
let b;
let operator;
let buttons = document.querySelectorAll("button");
let display = document.querySelector(".display")
let displayValue = display.textContent;
for (let button of buttons) {
  button.addEventListener("click", () => {
    displayValue = displayValue + button.textContent;
    display.textContent = displayValue;
  })
}

function operate(a, b, operator){
  add(a, b)
}
function add(a, b)
{
return a + b;
}
function subtract(a, b) {
return a - b; 
}
function multiply(a, b) {
return a * b; 
}
function divide(a, b) {
return a / b; 
}
