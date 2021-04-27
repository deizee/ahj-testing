export default class CardValidatorWidget {
  constructor(container) {
    this.container = container;
  }

  static get markup() {
    return `
      <div class="card-validator">
        <h3 class="card-validator_header">Check your credit card number</h3>
        <div class="cards-container">
            <div class="card visa"></div>
            <div class="card mastercard"></div>
            <div class="card mir"></div>
            <div class="card discover"></div>
            <div class="card americanexpress"></div>
            <div class="card jcb"></div>
        </div>
        <form class="card-validator-form">
            <div>
                <div class="form-control">
                    <label for="card-validator-input">Enter your credit card number</label>
                    <input id="card-validator-input" class="card-validator-input" type="text">
                </div>
            </div>
            <div>
                <button type="submit" class="card-validator-submit">Click to Validate</button>
            </div>
        </form>
       </div>
    `;
  }

  static get inputSelector() {
    return '.card-validator-input';
  }

  static get submitSelector() {
    return '.card-validator-submit';
  }


  bindToDOM() {
    this.container.innerHTML = this.constructor.markup;
    const submit = this.container.querySelector(this.constructor.submitSelector);
    submit.addEventListener('click', evt => this.onSubmit(evt));
  }

  onSubmit(evt) {
    evt.preventDefault();
    const inputEl = this.container.querySelector(this.constructor.inputSelector);
    if (isValidInn(inputEl.value)) {
      inputEl.classList.add('valid');
    } else {
      inputEl.classList.add('invalid');
    }
  }
}
