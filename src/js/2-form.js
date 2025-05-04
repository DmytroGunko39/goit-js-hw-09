const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
};

let formData = {
  email: '',
  message: '',
};

//------Reading the data from the LS and creating the object
const fillFieldsForm = feedbackForm => {
  try {
    const formDataFromLS = JSON.parse(
      localStorage.getItem('feedback-form-state')
    );

    if (formDataFromLS === null) {
      return;
    }

    formData.email = formDataFromLS.email || '';
    formData.message = formDataFromLS.message || '';

    //------Object keys = form.elements.value;
    Object.keys(formDataFromLS).forEach(
      key => (feedbackForm.elements[key].value = formDataFromLS[key])
    );
  } catch (err) {
    console.log(err);
  }
};

fillFieldsForm(refs.feedbackForm);

//------Saving the data to the LS
const onFormChange = ({ target: formErea }) => {
  try {
    const fieldName = formErea.name;
    const fieldValue = formErea.value.trim();

    //------ Avoiding saving empty values
    if (fieldValue === '') {
      delete formData[fieldName];
    } else {
      formData[fieldName] = fieldValue;
    }

    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  } catch (err) {
    console.log(err);
  }
};

//------Submit the data; Cleaned LS and form;

const onFormSubmit = event => {
  event.preventDefault();

  localStorage.removeItem('feedback-form-state');
  event.currentTarget.reset();
  if (!Object.values(formData).every(value => value.trim() !== '')) {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);
};

refs.feedbackForm.addEventListener('input', onFormChange);
refs.feedbackForm.addEventListener('submit', onFormSubmit);
