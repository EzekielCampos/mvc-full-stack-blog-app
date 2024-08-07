
const submitComment = async (event) => {
    event.preventDefault();

  let postId = document.querySelector("#comment-frm");
  const description = document.querySelector('#user-comment').value.trim();

  postId = postId.dataset.id;


  if (description) {
    const result = await fetch('api/create-comment', {
      method: 'POST',
      body: JSON.stringify({ description }),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(result);

    if (result.ok) {
      document.location.replace(`view/post/${postId}`);
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('#comment-frm').addEventListener('submit', submitComment);
