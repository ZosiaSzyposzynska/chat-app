const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();
  userName = userNameInput.value;

  if(!userName){

    alert('This field can not be empty.');
    return;

  }
  loginForm.classList.remove('show');
  messagesSection.classList.add('show');
});

addMessageForm.addEventListener('submit', function (event) {
  event.preventDefault();
  sendMessage();
});

function sendMessage() {
  const messageContent = messageContentInput.value.trim();

  if (!messageContent) {
    alert('Please enter a message.');
    return;
  }

  addMessage(userName, messageContent);

  
  messageContentInput.value = '';
}

function addMessage(author, content) {
  const message = document.createElement('li');
  message.classList.add('message', 'message--received');
  if (author === userName) {
    message.classList.add('message--self');
  }
  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author}</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
}
