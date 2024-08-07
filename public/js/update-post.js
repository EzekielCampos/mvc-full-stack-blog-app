// This function will update a post using the API route
const updateFormData = async (event) => {
  event.preventDefault();
  // Gets all the user input
  const title = document.querySelector('#post-title').value.trim();
  const description = document.querySelector('#post-desc').value.trim();
  console.log(title, description);

  if (title && description) {
    // This api endpoint will update the post
    const response = await fetch('api/create-post/update-post', {
      method: 'PUT',
      body: JSON.stringify({ title, description }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If it was successful then it will redirect user to the dashboard
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('.update-post-form').addEventListener('submit', updateFormData);

// This function will delete a post
const deleteData = async (event) => {
  event.preventDefault();

  //This api route will delete the post
  const response = await fetch('api/create-post/delete-post', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // If the delte was succesful then user will be redirected back to their dashboard
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
};

document.getElementById('delete-btn').addEventListener('click', deleteData);
