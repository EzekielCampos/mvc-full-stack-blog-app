// This function will handle the creation of a new comment
const submitComment = async (event) => {
  // Since this a form will prevent the page from refreshing
  event.preventDefault();
  //This vairable will be used to save the id number of the post 
  let postId = document.querySelector('#comment-frm');
  // Gets user input
  const description = document.querySelector('#user-comment').value.trim();

  // Saves the post id number from the dataset value 
  postId = postId.dataset.id;
// If the description is not empty then it will make an api request to create the comment
  if (description) {
    const result = await fetch('api/create-comment', {
      method: 'POST',
      body: JSON.stringify({ description }),
      headers: { 'Content-Type': 'application/json' },
    });

    // If the api request is succesful then it will redirect to the post page and the new comment will appear 
    // along with the others associated with that post
    if (result.ok) {
      document.location.replace(`view/post/${postId}`);
    } else {
      // If it fails then a error message will show
      alert(response.statusText);
    }
  }
};
// This event listener is waiting for when the form is submitted
document.querySelector('#comment-frm').addEventListener('submit', submitComment);
