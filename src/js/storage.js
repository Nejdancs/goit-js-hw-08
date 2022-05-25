export default { saveLocaleStorage, getLocalStorage };

function saveLocaleStorage(key, value) {
  try {
    const valueToJson = JSON.stringify(value);
    localStorage.setItem(key, valueToJson);
  } catch (error) {
    console.error(error.message);
  }
}

function getLocalStorage(key) {
  const savedData = localStorage.getItem(key);

  if (!savedData) {
    return;
  }

  try {
    return JSON.parse(savedData);
  } catch (error) {
    console.log(error.message);
  }
}
