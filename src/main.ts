import './style.css'
import backspace from '/public/backspace.svg'
import { setupCalculator } from './calculator.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = /*html*/ `
  <div class='calculator'>
    <div class='calculator-head'>
      <p class='calculator-model'>AMD-991EZ</p>
    </div>
    <div class='calculator-screen' id='display-screen'>
      <div class='display-history' id='output-display'></div>
      <div class='display-result' id='input-display'></div>
    </div>
    <div class='calculator-body'>
      <button class='btn special-key' id='bye-button'>Bye</button>
      <button class='btn special-key' id='hello-button'>Hello</button>
      <button class='btn clear-key' id='ac-button'>AC</button>
      <button class='btn clear-key' id='delete-button'>
        <img src=${backspace} class='logo backspace' alt="Backspace">
      </button>
      <button class='btn num-key'>7</button>
      <button class='btn num-key'>8</button>
      <button class='btn num-key'>9</button>
      <button class='btn op-key'>÷</button>
      <button class='btn num-key'>4</button>
      <button class='btn num-key'>5</button>
      <button class='btn num-key'>6</button>
      <button class='btn op-key'>×</button>
      <button class='btn num-key'>1</button>
      <button class='btn num-key'>2</button>
      <button class='btn num-key'>3</button>
      <button class='btn op-key'>-</button>
      <button class='btn num-key'>0</button>
      <button class='btn period-key' id='period-button'>.</button>
      <button class='btn equal-key' id='equal-button'>=</button>
      <button class='btn op-key'>+</button>
    </div>
  </div>
`


/**
 * Initializes the calculator by selecting DOM elements and setting up the calculator.
 */
const initializeCalculator = () => {
  var output_display = document.querySelector<HTMLDivElement>('#output-display')!
  var input_display = document.querySelector<HTMLDivElement>('#input-display')!
  var number_button_collection = document.getElementsByClassName('btn num-key')!
  var ac_button = document.querySelector<HTMLButtonElement>('#ac-button')!
  var delete_button = document.querySelector<HTMLButtonElement>('#delete-button')!
  var period_button = document.querySelector<HTMLButtonElement>('#period-button')!
  var equal_button = document.querySelector<HTMLButtonElement>('#equal-button')!
  var op_button_collection = document.getElementsByClassName('btn op-key')!
  var bye_button = document.querySelector<HTMLButtonElement>('#bye-button')!
  var hello_button = document.querySelector<HTMLButtonElement>('#hello-button')!
  var display_screen = document.querySelector<HTMLDivElement>('#display-screen')!

  // Call the setup function to initialize the calculator with the selected elements
  setupCalculator(display_screen, output_display, input_display, number_button_collection, ac_button, delete_button, period_button, equal_button, op_button_collection, bye_button, hello_button)
}

initializeCalculator()