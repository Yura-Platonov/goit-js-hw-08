import storage from './storage';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const textareaElement = document.querySelector('form textarea');

const refs = {
    form: document.querySelector('.feedback-form'),
    
}

// подія введення тексту
const formData = {};
refs.form.addEventListener('input', throttle(loge, 500));

// додавання значення полів в веб-сховище
function loge(e) {
    formData[e.target.name] = e.target.value;
    storage.save(STORAGE_KEY, formData);
}

// перевірка та введення даних в поля з веб-сховища
populateTextarea();

function populateTextarea() {
    const userData = storage.load(STORAGE_KEY);
    if (userData) {
        const keys = Object.keys(userData);
        for (const key of keys) {
            const inputElement = document.querySelector(`[name="${key}"]`);
            inputElement.value = userData[key];
        }
    }
}

// відпрака форми, очищення полів та веб-сховища
refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
    if (inputElement.value === '' || textareaElement.value === '') {
        return alert('Fields must be filled in');
      }
    console.log(formData);
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
