import { getRandomHello } from "./hello"



export const setupCalculator = (display_screen: HTMLDivElement, output_display: HTMLDivElement, input_display: HTMLDivElement, num_buttons: HTMLCollectionOf<Element>,
  ac_button: HTMLButtonElement, delete_button: HTMLButtonElement, period_button: HTMLButtonElement, equal_button: HTMLButtonElement,
  operation_buttons: HTMLCollectionOf<Element>, bye_button: HTMLButtonElement, hello_button: HTMLButtonElement) => {

  var turned_on: boolean = true
  var on_hello: boolean = false
  var on_parenthesis: boolean = false

  var number_buttons: HTMLCollectionOf<Element> = num_buttons
  var input_string: string = ''
  var output_string: string = ''
  var max_character_length: number = 10


  /**
   * Toggles the power state of a device
   * When turned on, it sets the display screen's class to "calculator-screen".
   * When turned off, it clears the input and sets the display screen's class to "calculator-screen off".
   *
   * @param {boolean} to_on - A boolean indicating whether to turn the device on (true) or off (false).
   */
  const setPower = (to_on: boolean) => {
    turned_on = to_on
    if (to_on) {
      // Set the display screen's class to "calculator-screen" to indicate it is active
      display_screen.setAttribute('class', 'calculator-screen')
    } else {
      input_string = ''
      input_display.innerHTML = input_string
      // Set the display screen's class to "calculator-screen off" to indicate it is turned off
      display_screen.setAttribute('class', 'calculator-screen off')
    }
  }
  

  /**
   * Adds a number (or value) to the input string for a calculator or input field.
   * Handles conditions like syntax errors, display limitations, and device power state.
   *
   * @param {string} value - The value (number or symbol) to be added to the input string.
   */
  const addNumberToInput = (value: string) => {
    // If the input is currently showing a syntax error or a greeting (on_hello), clear the input
    if (input_string === 'SyntaxError' || on_hello) {
      input_string = ''
      on_hello = false
    }
    // Proceed only if the device is powered on
    if (turned_on) {
      // If the current input length is less than the maximum allowed and the input is not just "0"
      if (input_string.length < max_character_length && input_string !== '0') {
        input_string += value

      // If the input is "0" or the maximum character limit is reached, replace the input with the new value
      } else {
        input_string = value
      }

      // Update the input display with the new or modified input string
      input_display.innerHTML = input_string
    }
  }


  /**
   * Sets up a number button to add its inner HTML (number or symbol) to the input when clicked.
   *
   * @param {Element} button_element - The button element that represents a number or symbol.
   */
  const setupNumButton = (button_element: Element) => {
    // Ensure the button element is defined and not null (non-null assertion with `!`)
    var button = button_element!
    // When the button is clicked, it calls `addNumberToInput` with the button's innerHTML (the number)
    button!.addEventListener('click', () => addNumberToInput(button!.innerHTML))
  }


  /**
   * Sets up multiple number buttons by attaching a click event to each one using the setupNumButton function.
   *
   * @param {HTMLCollectionOf<Element>} num_buttons - A collection of button elements representing numbers or symbols.
   */
  const setupNumButtons = (num_buttons: HTMLCollectionOf<Element>) => {
    // console.log(num_buttons)
    for (let i = 0; i < num_buttons.length; i++) {
      // Use setupNumButton to attach the click event listener to each button
      setupNumButton(num_buttons.item(i)!)
    }
  }


  /**
   * Handles the behavior when the "AC" (All Clear) button is clicked.
   * If the device is turned on, it clears both the input and output displays.
   * If the device is turned off, it turns the device on.
   *
   * @param {boolean} turned_on - A boolean that indicates whether the device is currently turned on.
   */
  const onClickACButton = (turned_on: boolean) => {
    if (turned_on) {
      // Clear the input string and update the input display to reflect the empty input
      input_string = ''
      input_display.innerHTML = ''

      if (on_parenthesis) {
        on_parenthesis = false
      }

      // Clear the output string and update the output display to reflect the empty output
      output_string = ''
      output_display.innerHTML = ''
    } else {
      // If the device is turned off, turn the device on
      setPower(true)
    }
  }


  /**
   * Handles the behavior when the "Delete" button is clicked.
   * It deletes the last character from the input string if the device is turned on.
   * Also handles special cases like clearing the input if there is a syntax error or a greeting (on_hello).
   */
  const onClickDeleteButton = () => {
    // If there is a syntax error or a greeting message, clear the input and reset the on_hello flag
    if (input_string === 'SyntaxError' || on_hello) {
        input_string = '';
        on_hello = false;
    }

    // If the input string is not empty and the device is turned on, proceed to delete the last character
    if (input_string.length > 0 && turned_on) {
        var last_input_character = input_string.substring(input_string.length - 1);

        // If the last character is a closing parenthesis, set the on_parenthesis flag to true
        if (last_input_character === ')') {
            on_parenthesis = true;

        // If the last character is a minus sign and parentheses are active, remove the minus sign and reset the on_parenthesis flag
        } else if (last_input_character === '-' && on_parenthesis) {
            input_string = input_string.substring(0, input_string.length - 1);
            on_parenthesis = false;
        }

        // Remove the last character from the input string
        input_string = input_string.substring(0, input_string.length - 1);

        // Update the display with the modified input string
        input_display.innerHTML = input_string;
    }
  }


  /**
   * Handles the behavior when the "Period" (decimal point) button is clicked.
   * It ensures that a decimal point is only added to the last number in the input string if it does not already contain one.
   * Prevents multiple decimal points from being added to a single number.
   * 
   * @returns {number | void} - Returns `-1` if adding a decimal point is invalid (e.g., when there's no number or there's already a decimal in the last number).
   */
  const onClickPeriodButton = () => {
    // Ensure the device is turned on before proceeding
    if (turned_on) {
        // Use a regular expression to match the last number in the input string (supports numbers with or without a decimal point)
        const last_number_match = input_string.match(/(\d+\.?\d*)$/);
        var last_number: string;

        // If no number is found at the end of the input, initialize it with '0'
        if (!last_number_match) {
            input_string += '0';
            last_number = '0';
        } else {
            // Set the last matched number as the current last number
            last_number = last_number_match[0];
        }

        // Check if the last number already contains a decimal point; if so, there's no need to add another
        if (last_number.includes('.')) {
            return -1;
        }
        
        // If the input ends with a digit, append a decimal point and update the display
        else if (/\d$/.test(input_string)) {
            input_string += '.';
            input_display.innerHTML = input_string;
        }
    }
  }


  /**
   * Adds a mathematical operation (like +, -, ÷, ×) to the input string.
   * Handles edge cases like syntax errors, starting a new expression with an operator, and replacing the last operator if one is already present.
   * 
   * @param {string} value - The mathematical operation to add to the input string (e.g., '+', '-', '÷', '×').
   */
  const addOperationToInput = (value: string) => {
    
    // Clear the input if a syntax error occurred or a greeting (on_hello) was triggered, 
    // then reset the on_hello flag
    if (input_string === 'SyntaxError' || on_hello) {
        input_string = ''
        on_hello = false
    }

    // Retrieve the last character of the input string to check if it's an operator
    var last_input_character: string = input_string.substring(input_string.length - 1)

    // Ensure the device is turned on, the input is not empty, and the input length is within the allowed limit
    if (input_string.length + 1 < max_character_length && input_string !== '' && turned_on) {

        // If the last character is not an operator, append the new operation to the input string
        if (!['+', '-', '÷', '×'].includes(last_input_character)) {
            input_string += value

        // Handle cases where the last character is an operator
        } else if (['+', '-', '÷', '×'].includes(last_input_character)) {

            // Handle special cases for parentheses
            if (on_parenthesis) {
                // If the last character is '-' and the new value is '-', adjust the input to avoid consecutive negative signs
                if (last_input_character === '-' && value === '-') {
                    input_string = input_string.substring(0, input_string.length - 2)
                // Handle cases where the last character is '-' but the new value is different
                } else if (last_input_character === '-' && value !== '-') {
                    input_string = input_string.substring(0, input_string.length - 3) + value
                // Close parentheses and reset the flag
                } else {
                    input_string += ')'
                }
                on_parenthesis = false
            // If the new value is '-', insert it with parentheses to denote a negative number
            } else if (value === '-') {
                input_string += '(-'
                on_parenthesis = true
            // Replace the last operator with the new one
            } else {
                input_string = input_string.substring(0, input_string.length - 1) + value
            }
        }

    // If the input string is empty but the device is turned on, prepend '0' to the operator
    } else if (input_string.length + 1 < max_character_length && input_string === '' && turned_on) {
        input_string = '0' + value
    }

    input_display.innerHTML = input_string
  }


  /**
   * Sets up an event listener for a single operator button to handle click events.
   * 
   * @param {Element} button_element - The DOM element for the operator button.
   */
  const setupOpButton = (button_element: Element) => {
    var button = button_element!
     // When the button is clicked, add the operator (button's innerHTML) to the input
    button!.addEventListener('click', () => addOperationToInput(button!.innerHTML))
  }


  /**
   * Loops through all operator buttons and sets up click event listeners for each.
   * 
   * @param {HTMLCollectionOf<Element>} op_buttons - A collection of operator button elements.
   */
  const setupOperationButtons = (op_buttons: HTMLCollectionOf<Element>) => {
    // Iterate over all operator buttons and set up their event listeners
    for (let i = 0; i < op_buttons.length; i++) {
      setupOpButton(op_buttons.item(i)!)
    }
  }


  /**
   * Evaluates a mathematical expression represented as a string.
   * 
   * @param {string} inp_string - The input mathematical expression to be evaluated.
   * @returns {number | string} - Returns the result of the expression with a precision of 10 decimal places, or 'SyntaxError' if the input is invalid.
   */
  const calculateExpression = (inp_string: string) => {
    try {
      // Check if the input string contains only valid characters (digits, operators, parentheses, and whitespace)
      if (/^[\d+\-()×÷+.\s]+$/.test(inp_string)) {
        // Replace multiplication and division symbols with standard operators
          inp_string = inp_string.replaceAll('×', '*')
          inp_string = inp_string.replaceAll('÷', '/')

          // console.log(inp_string)

          // Evaluate the mathematical expression using eval
          const result = eval(inp_string)
          // Limit the result to 10 decimal places
          const limited_precision_result = Number(result.toFixed(10));

          return limited_precision_result

      } else {
          // Throw an error if invalid characters are detected in the expression
          throw new Error("Invalid characters in the expression")
      }
    } catch (error) {
        // Return 'SyntaxError' if evaluation fails or if there's a syntax error in the input
        return 'SyntaxError'
    }
  }


  /**
   * Handles the action when the equal button is clicked.
   * It calculates the result of the input expression and updates the displays accordingly.
   * 
   * @param {string} inp_string - The mathematical expression to be evaluated.
   */
  const onClickEqualButton = (inp_string: string) => {
    if (on_parenthesis) {
      inp_string += ')'
      on_parenthesis = false
    }
    
    // console.log(inp_string)
    // Calculate the result of the input expression
    var result = calculateExpression(inp_string).toString()
    
     // Proceed only if the calculator is turned on
    if (turned_on) {

      // Check if the result is valid (not a syntax error or infinity)
      if (result !== 'SyntaxError' && result !== 'Infinity' && result !== 'NaN') {
        // Update output string and input string with the result
        output_string = inp_string + '='
        input_string = result.toString()
        if (input_string.length > 10) {
          input_string = input_string.substring(0, max_character_length)
        }
        input_display.innerHTML = input_string
        output_display.innerHTML = output_string

      } else {
        // If the result is an error, always display syntaxError
        input_string = 'SyntaxError'
        input_display.innerHTML = input_string
      }
    }
  }


  /**
   * Handles the action when the hello button is clicked.
   * Displays a random greeting in the input display and resets the calculator.
   */
  const onClickHelloButton = () => {
    if (turned_on) {
      // Reset the calculator's input
      onClickACButton(turned_on)

      // Get a hello from a random language
      var word: string = getRandomHello()

      input_string = word
      input_display.innerHTML = input_string
      on_hello = true
    }
  }


  /**
   * Handles the action when the goodbye button is clicked.
   * Animates the display of a goodbye message and turns off the calculator after a delay.
   */
  const onClickByeButton = () => {
    const goodbye_word: string = 'Goodbye...'
    // Proceed only if the calculator is turned on
    if (turned_on) {
      // Reset the calculator's input
      onClickACButton(turned_on)

      // Turn the calculator off so no inputs register
      turned_on = false

      // Initialize the index for the goodbye message
      let index: number = 0

      // Set an interval to display each character of the goodbye message one by one
      const intervalID = setInterval(() => {
          input_string += goodbye_word.charAt(index)
          input_display.innerHTML = input_string
          index++

          // If all characters have been displayed, clear the interval
          if (index === goodbye_word.length) {
            clearInterval(intervalID)

            // Turn off the calculator after a brief delay
            setTimeout(() => {
              setPower(turned_on)
            }, 800)
          }
      }, 100)
      }
  }

  ac_button!.addEventListener('click', () => onClickACButton(turned_on))
  delete_button!.addEventListener('click', () => onClickDeleteButton())
  period_button!.addEventListener('click', () => onClickPeriodButton())
  equal_button!.addEventListener('click', () => onClickEqualButton(input_string))
  setupNumButtons(number_buttons)
  setupOperationButtons(operation_buttons)
  hello_button!.addEventListener('click', () => onClickHelloButton())
  bye_button!.addEventListener('click', () => onClickByeButton())
}
