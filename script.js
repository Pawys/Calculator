const buttons = document.querySelectorAll(".btn");
const display = document.querySelector(".display")

let a;
let b;
let operator;
let btn;

let buttonValue;
let displayValue;

let state = 0;
let error = 0;

for (let button of buttons) {
button.addEventListener("click", click);
}

document.addEventListener('keydown', key)

function key(key){
  for (let button of buttons){
    if (key.key === button.textContent){click(button)}
    else {
      switch(key.key){
        case '*': 
          if (button.textContent === "x"){click(button)}
          break;
        case "Backspace":
          if (button.textContent === "⌫"){click(button)}
          break;
        case "Enter":
          if (button.textContent === "Enter"){click(button)}
          break;
      }
    }
  }
}

function click(button){

  if (error)clear();

  if (button.buttons === 0){
    btn = button.currentTarget;
  }else {
    btn = button;
  }
  buttonValue = btn.textContent;
  displayValue = display.textContent;

  switch(buttonValue){
    default:
      if (displayValue === ''){return;}
      switch(state){
        case 0:
          state = 1;
          operator = buttonValue;
          a = Number(displayValue);
          break;
        case 1:
          state = 0;
          operator = '';
          a = Number(displayValue);
          break;
        case 2:
          b = Number(displayValue);
          displayValue = equal(a,b,operator);
          a = Number(displayValue);
          b = '';
          operator = buttonValue;
          state = 1;
          break;
      }
        setColor(btn, 1);
      break;
    case String(Number(buttonValue)):
      if (state === 1){
        state = 2;
        displayValue = '';
        for (let btn of buttons){
          setColor(btn, 0);
        }
      }
      displayValue = displayValue + buttonValue; 
      if ((display.textContent).length > 7)return;
      break;
    case ".":
      for (letter of displayValue.split('')){
        if (letter === '.'){return};
      }
      if((display.textContent).length > 7){return};
      break;
    case "=":
      switch(state){
        default:
          for (let btn of buttons){
            setColor(btn, 0);
          }
          display.textContent = displayValue;
          state = 0
          break;
        case 2:
          b = Number(displayValue);
          displayValue = equal(a,b,operator);
          a = Number(displayValue);
          b = '';
          operator = '';
          state = 0;
          break;
      }
      break;
    case "⌫":
      backspace();
      break;
    case "AC":
      clear();
      break;
  }
display.textContent = displayValue;
}
function setColor(button, num){
  if (num){
    button.style.backgroundColor = "white";
    button.style.color = "#f19a3a";
  }
  else {
    button.style.backgroundColor = null;
    button.style.color = null;
  }
}
function equal(){
  let anwser = operate(a,b,operator)
  if (typeof(anwser) === 'string'){error = 1; return anwser;};
  if (!Number.isInteger(anwser)){
   if (anwser.toString().split('.')[1].length > 3){
     anwser = (Math.round((anwser + Number.EPSILON) * 1000) / 1000);
     if (String(anwser).length > 8){
       anwser = Math.round(anwser);
     }
   };
  }
  if (String(anwser).length > 8){
    display.style.fontSize = "70px";
    anwser = "Number Too Big";
    error = 1;
  }
  return anwser;
}

function clear(){
  display.style.fontSize = null;
  a = '';
  b = '';
  operator = '';
  displayValue = '';
  state = 0;
  error = 0;
  display.textContent = displayValue;
  buttons.forEach((button) => setColor(button, 0))
}
function backspace(){
  displayArray = displayValue.split('');
  displayArray.pop();
  displayValue = Number(displayArray.join(''));
  if (displayArray.join('') === ''){
    displayValue = '';
  }
  display.textContent = displayValue;
}
function operate(a, b, operator){
  if (operator === '+'){
    return a + b;
  } else if (operator === '-'){
    return a - b;
  }else if (operator === 'x'){
    return a * b;
  }else {
    if (b === 0){
      return ":P"
    }
    return a / b;
  }
}
