const nameInput = document.createElement('input');
nameInput.type = 'text';
nameInput.placeholder = 'Enter your name...';
nameInput.autofocus = true;

const startButton = document.createElement('button');
startButton.textContent = 'Start';

const nameEntryContainer = document.createElement('div');
nameEntryContainer.appendChild(nameInput);
nameEntryContainer.appendChild(startButton);
document.body.insertBefore(nameEntryContainer, document.body.firstChild);

messageInput.disabled = true;
sendButton.disabled = true;

let userName = '';

startButton.addEventListener('click', () => {
    if (nameInput.value.trim() !== '') {
        userName = nameInput.value.trim();
        nameEntryContainer.style.display = 'none';
        messageInput.disabled = false;
        sendButton.disabled = false;
        messageInput.focus();
    } else {
        alert('Please enter your name.');
    }
});

const ws = new WebSocket(`wss://${window.location.host}`);

ws.onmessage = (event) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = event.data; 
    messages.appendChild(messageElement);
};

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        const fullMessage = `${userName}: ${message}`;
        ws.send(fullMessage);
        messageInput.value = '';
    }
});

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});
