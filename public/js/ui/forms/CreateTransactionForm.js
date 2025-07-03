/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(null, (err, response) => {
      if(response.success) {
        const arrOfResponses = [...response.data];
        const expenseList = document.querySelector('#expense-accounts-list');
        const incomeList = document.querySelector('#income-accounts-list');

        expenseList.innerHTML = '';
        incomeList.innerHTML = '';
        arrOfResponses.forEach(el => {
          incomeList.innerHTML += `<option value="${el.id}">${el.name}</option>`
          expenseList.innerHTML += `<option value="${el.id}">${el.name}</option>`
        })
      }
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if(response.success) {
        this.element.reset();

        const incomeWidget = App.getModal('newIncome');
        incomeWidget.close();

        const expenseWidget = App.getModal('newExpense');
        expenseWidget.close();

        App.update();
      }
    })
  }
}