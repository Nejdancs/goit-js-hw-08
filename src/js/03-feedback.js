import throttle from 'lodash.throttle';
import isEmail from 'validator/es/lib/isEmail';
import '../css/common.css';
import '../css/03-feedback.css';

const formRef = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = 'feedback-form-state';
let formData = getLocalStorage(LOCALSTORAGE_KEY);

formRef.addEventListener('input', throttle(onFormInput, 500));
formRef.addEventListener('submit', onSubmit);

updateFormInput();

function onFormInput(e) {
  saveLocaleStorage(e, formData);
}

function updateFormInput() {
  if (formData.length === 0) {
    return;
  }

  const { elements } = formRef;
  const keysFormData = Object.keys(formData);

  keysFormData.forEach(key => {
    elements[key].value = formData[key];
  });
}

function saveLocaleStorage({ target: { value, name } }, formData) {
  formData[name] = value;

  try {
    const formDataToJson = JSON.stringify(formData);
    localStorage.setItem(LOCALSTORAGE_KEY, formDataToJson);
  } catch (error) {
    console.error(error.message);
  }
}

function getLocalStorage(key) {
  const savedData = localStorage.getItem(key);

  if (!savedData) {
    return {};
  }

  try {
    return JSON.parse(savedData);
  } catch (error) {
    console.log(error.message);
  }
}

function onSubmit(e) {
  e.preventDefault();

  const {
    elements: { email, message },
  } = e.target;

  if (!isEmail(email.value)) {
    alert('Email должен быть валидным');
    return;
  }

  if (!message.value) {
    alert('Заполните пожалуйста поле message');
    return;
  }

  console.log(formData);
  e.target.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
  formData = {};
}
