let a;
let b;
let operator;
let buttons = document.querySelectorAll(".btn");
let display = document.querySelector(".display")
let displayValue;
let displayArray;
let buttonValue;
let buttonNumValue;
let clicked = 0;
let error = 0;
let btn;
for (let button of buttons) {
button.addEventListener("click", click);
}
document.addEventListener('keydown', key)
function key(key){
  key.preventDefault();
  for (let button of buttons) {
    if (key.key === button.textContent) {
      click(button);
    } else if (key.key === "*"){
     if (button.textContent === "x"){
       click(button);
     }
    }else if(key.key === "Backspace"){
     if (button.textContent === "⌫"){
       click(button);
     }
    }else if (key.key === 'Enter'){
       if (button.textContent === "="){
         click(button);
       }
     }
  }
}
// This code is the worst thing I ever wrote
function click(button){
  if(button.buttons === 0){
  console.log(typeof(button));
    btn = button.currentTarget;
  }else {
    console.log('chuj');
    btn = button;
  }
  buttonValue = btn.textContent;
  displayValue = display.textContent;
  buttonNumValue = Number(buttonValue)
  if (buttonValue === 'AC'){
      clear();
      return
  }
  if (error === 1){return};
  if (buttonNumValue > -1 && buttonNumValue < 11|| buttonValue === '.'){
    if (clicked === 1){
      clicked = 2;
      displayValue = '';
      for (let btn of buttons){
      btn.classList.remove('toggled')
      }
    }else{
      if (buttonValue === '.'){
        for (letter of displayValue.split('')){
          if (letter === '.'){return};
        };
      }
    if((display.textContent).length > 7){return};
    }
    displayValue = displayValue + buttonValue; 
  }else if (buttonValue === "="){
    if (clicked !== 2){
      for (let btn of buttons){
      btn.classList.remove('toggled')
      }
      display.textContent = displayValue;
      clicked = 0;
    }else{
      b = Number(displayValue);
      displayValue = equal(a,b,operator);
      a = Number(displayValue);
      b = '';
      operator = '';
      clicked = 0;
    }
  }else if (buttonValue === '⌫'){
    backspace();
  }else{
    if (displayValue === ''){return;}
    if (clicked === 1){
      clicked = 0;
      operator = '';
      a = Number(displayValue);
      button.currentTarget.classList.toggle('toggled')
    }else if (clicked === 2){
      button.currentTarget.classList.toggle('toggled')
      b = Number(displayValue);
      displayValue = equal(a,b,operator);
      a = Number(displayValue);
      b = '';
      operator = buttonValue;
      clicked = 1;
    }else {
      clicked = 1;
      operator = buttonValue;
      a = Number(displayValue);
      btn.classList.toggle('toggled')
      return;
    }
  }
  display.textContent = displayValue;
}
function equal(){
    let anwser = operate(a,b,operator)
    if (Number.isInteger(anwser) !== true){
     if (anwser.toString().split('.')[1].length > 3){
       anwser = (Math.round((anwser + Number.EPSILON) * 1000) / 1000);
       if (String(anwser).length > 8){
         anwser = Math.round(anwser);
       }
     };
    }
  if (String(anwser).length > 8){
    console.log('chuj')
    display.style.fontSize = "70px";
    anwser = "Number Too Big";
    error = 1;
  }
    return anwser;
}

function clear(){
  a = '';
  b = '';
  operator = '';
  displayValue = '';
  clicked = 0;
  error = 0;
  display.textContent = displayValue;
}
function backspace(){
  displayArray = displayValue.split('')
  displayArray.pop();
  displayValue = Number(displayArray.join(''));
  if (displayArray.join('') === ''){
    displayValue = '';
  }
  display.textContent = displayValue;
}
function operate(a, b, operator){
  if (operator === '+'){
    return add(a, b);
  } else if (operator === '-'){
    return subtract(a, b);
  }else if (operator === 'x'){
    return multiply(a, b);
  }else {
    if (b == 0){
      return ":P"
    }
    return divide(a, b);
  }
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
