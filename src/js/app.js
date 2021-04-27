import CardValidatorWidget from './CardValidatorWidget';

const container = document.querySelector('.container');
const validator = new CardValidatorWidget(container);

validator.bindToDOM();
