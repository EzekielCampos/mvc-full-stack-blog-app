const updateFormData = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const description = document.querySelector('#post-desc').value.trim();
  console.log(title, description);

  if (title && description) {
    const response = await fetch('api/create-post/update-post', {
      method: 'PUT',
      body: JSON.stringify({ title, description }),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(response);

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('.update-post-form').addEventListener('submit', updateFormData);

const deleteData = async (event) => {
  event.preventDefault();

    const response = await fetch('api/create-post/delete-post', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(response);

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
};

document.getElementById('delete-btn').addEventListener('click', deleteData);
