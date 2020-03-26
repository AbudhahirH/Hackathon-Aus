/* Password validation rules:
    * Letters & numbers & only these symbols !@#$&*
    * Must have at least 1 letter, 1 number and 1 of the above symbols
    * Can't have 3 consecutive numbers in accending order, example 123 or 890
*/
var MyInput = class extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById('my-input');
    const templateContent = template.content;

    this.el = this.attachShadow({ mode: 'open' });
    this.el.appendChild(templateContent.cloneNode(true));

    this.inputE1 = this.el.querySelector('#input1');
    this.inputE2 = this.el.querySelector('#input2');
  }

  // Subscribing 'keyup' events for both 'input1 and input2'.
  connectedCallback() {
    this.inputE1.addEventListener('keyup', this.handleKeyDown);
    this.inputE2.addEventListener('keyup', this.handleKeyDown);
  }

  // Handling 'keyup' events for both 'input1 and input2'.
  // Validation and also error output is shown.
  handleKeyDown = (e) => {
    const curInput = this.getCurInputProps(e);
    const errorStr = this.validate(curInput);
    curInput.elem.setCustomValidity(errorStr);
    curInput.elem.reportValidity();
  }

  // Getting currently selected input field's properties.
  getCurInputProps(e) {
    let radioType;
    if (e.target.id == 'input1') {
      radioType = this.el.querySelector('[name=validation-NLP]:checked').value;
      return { elem: this.inputE1, radioType: radioType };
    }
    else {
      radioType = this.el.querySelector('[name=validation-NP]:checked').value;
      return { elem: this.inputE2, radioType: radioType };
    }
  }

  // On key-up validation for 'input1 and input2' elements using Regular Expressions.
  validate(args) {
    let radioType = args.radioType;
    let inputVal = args.elem.value;
    if (radioType === 'number') { // Numbers validation
      if (/[^0-9]/.test(inputVal)) return 'Only numbers';
    } else if (radioType === 'letter') { // Letters validation
      if (/[^a-zA-Z]/.test(inputVal)) return 'Only letters';
    } else { // Password validation.
      let pattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#&*(),]).*/;
      let isMatching = pattern.test(inputVal);
      let isConsecutive = this.findConsecutiveNumbers(inputVal);
      if (!isMatching) {
        return 'Should contain letters, numbers and at least 1 special char (!@#&*),';
      }
      else if (isConsecutive) {
        return 'Should not contain 3 consecutive numbers';
      }
    }
    return '';
  }

  findConsecutiveNumbers(str) {
    // Checking for sequential numerical numbers.
    for (var index in str)
      // "a123*", if index=1...if(2 == 2 && 3 == 3).
      if (+str[+index + 1] == +str[index] + 1 && +str[+index + 2] == +str[index] + 2) return true; 
    return false;
  }
  
}
customElements.define('my-input', MyInput);