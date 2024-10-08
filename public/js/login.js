// This will take the user credentials to verify that an account exists
const loginFormHandler = async (event) => {
  // Prevent the page from refreshing
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard');
    } else {
      const result = await response.json();
      alert(result.message);
    }
  }
};
// This event listener is waiting for when the form is submitted
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
