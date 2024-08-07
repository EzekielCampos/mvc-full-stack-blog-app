// This function will handle the creation of a new comment
const postFormData = async (event) => {
  event.preventDefault();
  //This will get the user input values
  const title = document.querySelector('#post-title').value.trim();
  const description = document.querySelector('#post-desc').value.trim();

  // If the description is not empty then it will make an api request to create
  // a post
  if (title && description) {
    const response = await fetch('api/create-post', {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: { 'Content-Type': 'application/json' },
    });
    // If the api request is succesful then it will redirect to the user dashboard page

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      // If it fails then a error message will show
      alert(response.statusText);
    }
  }
};
// This event listener is waiting for when the form is submitted
document.querySelector('.new-post-form').addEventListener('submit', postFormData);
