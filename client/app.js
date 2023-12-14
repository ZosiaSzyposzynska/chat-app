
const socket = io();

const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';

socket.on('message', ({ author, content }) => addMessage(author, content));
socket.on('userList', (users) => {
  console.log('Current users:', users);
});

socket.on('newUser', (userName) => {
  const joinMessage = `Chat Bot: ${userName} has joined the conversation!`;
  addMessage('Chat Bot', joinMessage, 'italic');
});


socket.on('removeUser', (userName) => {
  const leaveMessage = `Chat Bot: ${userName} has left the conversation... :(`;
  addMessage('Chat Bot', leaveMessage, 'italic');
});

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();
  userName = userNameInput.value;

  if (!userName) {
    alert('This field cannot be empty.');
    return;
  }

  socket.emit('join', userName);

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
  socket.emit('message', { author: userName, content: messageContent });

  messageContentInput.value = '';
}

function addMessage(author, content, style) {
  const message = document.createElement('li');
  message.classList.add('message', 'message--received');
  if (author === 'Chat Bot') {
    message.classList.add('message--bot');
  }
  if (style) {
    message.style.fontStyle = style;
  }
  message.innerHTML = `
    <h3 class="message__author">${author}</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
}
