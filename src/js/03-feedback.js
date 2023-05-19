import storage from './storage';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const textareaElement = document.querySelector('form textarea');

const refs = {
  form: document.querySelector('.feedback-form'),
};

const formData = {};

// Обработчик события ввода текста
function handleInput(e) {
  formData[e.target.name] = e.target.value;
  storage.save(STORAGE_KEY, formData);
}

// Добавляем обработчик события с использованием throttle
refs.form.addEventListener('input', throttle(handleInput, 500));

// Проверка и заполнение полей данными из веб-хранилища
populateTextarea();

function populateTextarea() {
    const userData = storage.load(STORAGE_KEY);
    if (userData) {
      const entries = Object.entries(userData);
      const inputElements = document.querySelectorAll('form input, form textarea');
      
      inputElements.forEach((inputElement) => {
        const name = inputElement.name;
        const value = entries.find(([key]) => key === name)?.[1] || '';
        inputElement.value = value;
      });
    }
  }


// Отправка формы, очистка полей и веб-хранилища
refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  if (textareaElement.value === '') {
    e.preventDefault();
    return alert('Fields must be filled in');
  }

  console.log(formData);
  e.currentTarget.reset();
  storage.remove('' + STORAGE_KEY);
  formData = {};
}
