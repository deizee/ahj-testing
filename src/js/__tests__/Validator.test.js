import Validator from '../Validator';

const container = document.createElement('div');
const validator = new Validator(container);

test('Метод init вызывает методы bindToDOM, subscribeOnSubmit и subscribeOnInput', () => {
  validator.cardValidatorWidget.bindToDOM = jest.fn();
  validator.cardValidatorWidget.subscribeOnSubmit = jest.fn();
  validator.cardValidatorWidget.subscribeOnInput = jest.fn();
  validator.init();
  expect(validator.cardValidatorWidget.bindToDOM).toBeCalled();
  expect(validator.cardValidatorWidget.subscribeOnSubmit).toBeCalled();
  expect(validator.cardValidatorWidget.subscribeOnInput).toBeCalled();
});

test('Метод validation корректно валидирует входные данные', () => {
  expect(validator.validation('347936689175690')).toBeTruthy();
});

test.each([
  ['Mir', '2201382000000013', 'mir'],
  ['Visa', '4012888888881881', 'visa'],
  ['MasterCard', '5155555555554444', 'master'],
  ['MasterCard', '5255555555554444', 'master'],
  ['MasterCard', '5355555555554444', 'master'],
  ['MasterCard', '5455555555554444', 'master'],
  ['MasterCard', '5555555555554444', 'master'],
  ['Amex', '347936689175690', 'amex'],
  ['Amex', '371456244162991', 'amex'],
  ['JCB', '3530111333300000', 'jcb'],
  ['Discover', '6011111111111117', 'discover'],
])('Метод findPaymentSystem верно идентифицирует платежную систему %s', (_, cardNumber, expected) => {
  validator.cardValidatorWidget.showPaymentSystemCard = jest.fn();
  validator.findPaymentSystem(cardNumber);
  expect(validator.cardValidatorWidget.showPaymentSystemCard).toBeCalledWith(expected);
});

test('Если метод findPaymentSystem не нашел нужную платенуюсистему, то он вызывает метод showPaymentSystemCard без параметров', () => {
  validator.cardValidatorWidget.showPaymentSystemCard = jest.fn();
  validator.findPaymentSystem('9');
  expect(validator.cardValidatorWidget.showPaymentSystemCard).toBeCalledWith();
});

test('Метод checkValidate работает корректно', () => {
  validator.cardValidatorWidget.showValidationResult = jest.fn();
  validator.validation = jest.fn();

  validator.checkValidate('123');
  expect(validator.cardValidatorWidget.showValidationResult).toBeCalledWith(false);

  validator.checkValidate('2201382000000013');
  expect(validator.cardValidatorWidget.showValidationResult).toBeCalledWith(validator.validation('2201382000000013'));
});
