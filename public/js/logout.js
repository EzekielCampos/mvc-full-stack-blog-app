// This function will send a POST request to the API endpoint to log the user out
const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    // If it is succesful will redirect user back to hompeage
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};
// This event listener is waiting for when the form is submitted
document.querySelector('#logout').addEventListener('click', logout);
