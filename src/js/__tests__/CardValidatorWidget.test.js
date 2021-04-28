import CardValidatorWidget from '../CardValidatorWidget';

const container = document.createElement('div');
const cardValidatorWidget = new CardValidatorWidget(container);
cardValidatorWidget.bindToDOM();

test('Метод onSubmit запускает коллбеки', () => {
  const event = new Event('click');
  let fn = () => {};
  fn = jest.fn();
  cardValidatorWidget.subscribeOnSubmit(fn);
  cardValidatorWidget.onSubmit(event, 1);
  expect(fn).toBeCalled();
});

test('Метод onInput запускает коллбеки', () => {
  const event = {
    preventDefault: () => {},
    target: {
      value: 'test',
    },
  };
  let fn1 = () => {};
  fn1 = jest.fn();
  cardValidatorWidget.subscribeOnInput(fn1);
  cardValidatorWidget.onInput(event);
  expect(fn1).toBeCalled();
});

test('Метод showPaymentSystemCard корректно присваивает классы', () => {
  const cardClass = 'mir';
  cardValidatorWidget.showPaymentSystemCard(cardClass);
  const cardElement = cardValidatorWidget.cards.find((card) => card.classList.contains(cardClass));
  expect(cardElement.classList.contains('mute-card')).toBeFalsy();

  cardValidatorWidget.showPaymentSystemCard();
  expect(cardElement.classList.contains('mute-card')).toBeFalsy();
});

test('Метод showValidationResult корректно присваивает классы', () => {
  cardValidatorWidget.showValidationResult(true);
  expect(cardValidatorWidget.validatorResultEl.classList.contains('success')).toBeTruthy();
  expect(cardValidatorWidget.validatorResultEl.classList.contains('failure')).toBeFalsy();

  cardValidatorWidget.showValidationResult(false);
  expect(cardValidatorWidget.validatorResultEl.classList.contains('failure')).toBeTruthy();
  expect(cardValidatorWidget.validatorResultEl.classList.contains('success')).toBeFalsy();
});
