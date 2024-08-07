// This function will handle the creation of a new user
const signupFormHandler = async (event) => {
  // Since this a form will prevent the page from refreshing
  event.preventDefault();

  // Gets all user input to create a new account

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // Verifies that all inputs are not empty
  if (name && email && password) {
    // Makes a fetch request to create a new user including
    // the user input
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // If everything goes well user will be logged in and sent to their dashboard
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      // If it fails then a error message will show
      alert(response.statusText);
    }
  }
};
// This event listener is waiting for when the form is submitted
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
