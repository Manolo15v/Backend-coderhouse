const socket = io.connect();


const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('messageInput');
const buttonSubmit = document.getElementById('submit');

const schemaAuthor = new normalizr.schema.Entity('author', {}, { idAttribute: 'id' });

const schemaMessage = new normalizr.schema.Entity('post', { author: schemaAuthor }, { idAttribute: '_id' });

const schemaMessages = new normalizr.schema.Entity('posts', { messages: [schemaMessage] }, { idAttribute: 'id' })

buttonSubmit.addEventListener('click', e => {
    e.preventDefault();

    const newMessage = {
        author: {
            email: usernameInput.value,
            nombre: document.getElementById('firstname').value,
            apellido: document.getElementById('lastname').value,
            edad: document.getElementById('age').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value
        },
        text: messageInput.value
    }

    socket.emit('client-message', newMessage);

});

socket.on('messages', data => {
    let dataSize = JSON.stringify(data).length;
    console.log(data, dataSize);

    let messages = normalizr.denormalize(data.result, schemaMessages, data.entities);

    let messagesSize = JSON.stringify(messages).length;
    console.log(messages, messagesSize);

    let compressionRatio = parseInt((dataSize * 100) / messagesSize);

    document.getElementById('compression-info').innerText = compressionRatio;

    // console.log(messages.messages);

    if (messages.messages) {
        const messagesHtml = messagesList(messages.messages);
        document.getElementById('messagesContainer').innerHTML = messagesHtml
    }

});


function messagesList(messages) {
    return messages.map(message => `
        <li>
            <p class="d-inline text-primary fw-bold">${message.author.email}</p>
            <p class="d-inline text-danger"> ${message.date} </p>
            <p class="d-inline text-success fst-italic">:${message.text}</p>
            <img width="50" src="${message.author.avatar}" alt=" ">
        </li>
    `).join(' ');
}


usernameInput.addEventListener('input', () => {
    const emailExists = usernameInput.value.length
    const messageExists = messageInput.value.length
    messageInput.disabled = !emailExists
    buttonSubmit.disabled = !emailExists || !messageExists
})

messageInput.addEventListener('input', () => {
    const messageExists = messageInput.value.length
    buttonSubmit.disabled = !messageExists
})