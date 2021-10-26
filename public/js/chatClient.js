const socket = io();

let chatUserName = document.querySelector('#chat-username')
let chatMessage = document.querySelector('#chat-message')
let chatForm = document.querySelector('form')
let chatDisplay = document.querySelector('.chat-display')

socket.on('updateMessage', (data) =>{

    let newMessage = document.createElement('p')
    if(chatUserName.value === data.username){
        newMessage.className = "text-white"
    }
    else{
        newMessage.className = "text-grey"
    }
    newMessage.innerHTML = `<strong>${data.username}</strong>: ${data.message}`
    chatDisplay.insertBefore(newMessage, chatDisplay.firstChild)
})

chatForm.addEventListener('submit', (e) => {
    e.preventDefault()
    socket.emit('postMessage', {
        username: chatUserName.value,
        message: chatMessage.value
    })

})
