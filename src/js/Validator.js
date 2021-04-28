import CardValidatorWidget from './CardValidatorWidget';
import paymentSystem from './paymentSystem';

class Validator {
  constructor(container) {
    this.cardValidatorWidget = new CardValidatorWidget(container);
  }

  init() {
    this.cardValidatorWidget.bindToDOM();
    this.cardValidatorWidget.subscribeOnSubmit(this.checkValidate.bind(this));
    this.cardValidatorWidget.subscribeOnInput(this.findPaymentSystem.bind(this));
  }

  validation(value) {
    // eslint-disable-next-line no-param-reassign
    value = value.replace(/\D/g, '');
    let nCheck = 0;
    let bEven = false;
    for (let n = value.length - 1; n >= 0; n -= 1) {
      let nDigit = parseInt(value.charAt(n), 10);
      // eslint-disable-next-line no-cond-assign
      if (bEven && (nDigit *= 2) > 9) {
        nDigit -= 9;
      }
      nCheck += nDigit;
      bEven = !bEven;
    }
    return nCheck % 10 === 0;
  }

  checkValidate(value) {
    if (value.length < 15) {
      this.cardValidatorWidget.showValidationResult(false);
      return;
    }
    this.cardValidatorWidget.showValidationResult(this.validation(value));
  }

  findPaymentSystem(value) {
    let number = value.slice(0, 2);
    if (!paymentSystem[number]) {
      number = value.slice(0, 1);
    }
    if (paymentSystem[number]) {
      this.cardValidatorWidget.showPaymentSystemCard(paymentSystem[number]);
    } else {
      this.cardValidatorWidget.showPaymentSystemCard();
    }
  }
}

export default Validator;
