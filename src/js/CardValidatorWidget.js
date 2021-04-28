export default class CardValidatorWidget {
  constructor(container) {
    this.container = container;
    this.submitSubscribers = [];
    this.inputSubscribers = [];
  }

  static get markup() {
    return `
      <div class="card-validator">
        <h3 class="card-validator_header">Check your credit card number</h3>
        <div class="cards-container">
            <div class="card visa"></div>
            <div class="card master"></div>
            <div class="card mir"></div>
            <div class="card discover"></div>
            <div class="card amex"></div>
            <div class="card jcb"></div>
        </div>
        <form class="card-validator-form">
            <div>
                <div class="form-control">
                    <label for="card-validator-input">Enter your credit card number</label>
                    <input id="card-validator-input" class="card-validator-input" type="text">
                    <span class="card-validator-result"></span>
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
    return '.card-validator-form';
  }

  get validatorResultEl() {
    return this.container.querySelector('.card-validator-result');
  }

  bindToDOM() {
    this.container.innerHTML = this.constructor.markup;
    const inputElement = this.container.querySelector('.card-validator-input');
    this.cards = [...this.container.querySelectorAll('.card')];

    const submit = this.container.querySelector(this.constructor.submitSelector);
    submit.addEventListener('submit', (event) => this.onSubmit(event, inputElement.value));

    const input = this.container.querySelector(this.constructor.inputSelector);
    input.addEventListener('input', (event) => this.onInput(event));
  }

  showPaymentSystemCard(cardClass) {
    this.cards.forEach((el) => {
      if (!cardClass) {
        el.classList.remove('mute-card');
        return;
      }
      if (!el.classList.contains(cardClass)) {
        el.classList.add('mute-card');
      }
    });
  }

  showValidationResult(result) {
    this.validatorResultEl.classList.add('card-validator-result');
    this.validatorResultEl.classList.remove('success');
    this.validatorResultEl.classList.remove('failure');
    if (result) {
      this.validatorResultEl.classList.add('success');
    } else {
      this.validatorResultEl.classList.add('failure');
    }
  }

  subscribeOnSubmit(callback) {
    this.submitSubscribers.push(callback);
  }

  subscribeOnInput(callback) {
    this.inputSubscribers.push(callback);
  }

  onSubmit(event, value) {
    event.preventDefault();
    this.submitSubscribers.forEach((o) => o(value));
  }

  onInput(event) {
    event.preventDefault();
    this.inputSubscribers.forEach((o) => o(event.target.value));
  }
}
