
const submitComment = async (event) => {
    event.preventDefault();
  const description = document.querySelector('#user-comment').value.trim();

  if (description) {
    const result = await fetch('api/create-comment', {
      method: 'POST',
      body: JSON.stringify({ description }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (result.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('#comment-frm').addEventListener('submit', submitComment);
