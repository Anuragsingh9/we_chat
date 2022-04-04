const socket = io();

var audio = new Audio('Tone.mp3');
let userName = prompt('Enter Name');
socket.emit('new-user',userName);

const chatForm = document.getElementById('chat-form');

socket.on('send-message', data =>{
    console.log('ll',data);
    sendMessage(data,'left');
});

socket.on('new-joined',msg=>{
    console.log('welcome' + msg);
    showWelcomeMsg(msg);
})

socket.on('user-left',data=>{
    showUserLeftMsg(data);
});
// socket.on('recieve-message', message =>{
//     console.log('ll',message);
//     recieveMessage(message);
// });

chatForm.addEventListener('submit', e =>{
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    console.log(msg);
    position = 'right';
    
    sendMessage({message:msg, user:'You'},position)
    socket.emit('chat-message',msg)
    e.target.elements.msg.value = '';
});

function sendMessage(data,position){
    const div = document.createElement('div');
    div.classList.add('message');
    div.classList.add(`${position}`);
    div.innerHTML = `<span><label>${data.user}:</label> ${data.message} </span>`;

    const chat = document.querySelector('.chat').appendChild(div);
    console.log(chat);
    audio.play();

    // scroll bar at the bottom
        var messageBody = document.querySelector('.chat');
        messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
}

function showWelcomeMsg(message){
    console.log('fn ',message);
    const div = document.createElement('div');
    div.classList.add('message');
    div.classList.add('right');
    // div.classList.add('welcome-msg');
    div.innerHTML = `<span class="welcome-msg">${message} has joined the chat.</span>`;

    const chat = document.querySelector('.chat').appendChild(div);
    console.log(chat);
    audio.play();
    // scroll bar at the bottom
        var messageBody = document.querySelector('.chat');
        messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
}

function showUserLeftMsg(message){
    console.log('fn ',message);
    const div = document.createElement('div');
    div.classList.add('message');
    div.classList.add('right');
    // div.classList.add('welcome-msg');
    div.innerHTML = `<span class="left-msg">${message} left the chat</span>`;

    const chat = document.querySelector('.chat').appendChild(div);
    console.log(chat);

    // scroll bar at the bottom
        var messageBody = document.querySelector('.chat');
        messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
}
// here version_1 will be done.
