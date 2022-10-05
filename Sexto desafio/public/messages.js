const socket = io.connect();

const inputs = document.getElementsByTagName('input');
const button = document.getElementById('submit');

button.addEventListener('click', e => {
    e.preventDefault();
    if (inputs[0].value) {
        const newMessage = {
            email: inputs[0].value,
            message: inputs[1].value
        }

        socket.emit('client-message', newMessage)
    }
});

socket.on('messages', data => {
    let messagesList = data.map(message => `
        <li>
            <p class="d-inline text-primary fw-bold">${message.email}</p>
            <p class="d-inline text-danger"> ${message.date} </p>
            <p class="d-inline text-success fst-italic">:${message.message}</p>
        </li>
    `).join('')
    document.getElementById('messagesContainer').innerHTML = messagesList
});