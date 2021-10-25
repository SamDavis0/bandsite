let form = document.querySelector('form')

form.addEventListener('submit', async (e) => {
    //prevent default behavior of the form
    e.preventDefault()

    //make a fetch /api
    let newMessage = {
        name: document.querySelector('#feedback-form-name').value,
        
        message: document.querySelector('#feedback-form-message').value
    }
    let results = await fetch('/api', {
        method: 'post',
        headers: {'Content-type': 'application/json; charset=UTF-8'},
        body: JSON.stringify(newMessage)
    })
    let messages = await results.json()
    updateFeedback(messages)
})




// grab the api data and display all the message when page loads
const displayMessages = async () => {
    let result = await fetch('/api')

    let messages = await result.json()
    updateFeedback(messages)
}


const updateFeedback = (messagesArr) => {
    let htmlBlock = "";
    messagesArr.forEach((item, key) =>{

        htmlBlock += '     <div class="feedback-item item-list media-list">';
        htmlBlock += '       <div class="feedback-item media">';
        // htmlBlock += '       <div class="media-left"><button class="feedback-delete btn btn-xs btn-danger"><span id="' + key + '" class="glyphicon glyphicon-remove"></span></button></div>';
        htmlBlock += '         <div class="feedback-info media-body">';
        htmlBlock += '           <div class="feedback-head">';
        htmlBlock += '             <div> <small class="feedback-name label label-info fw-bold fs-5">' + item.name + '</small></div>';
        htmlBlock += '           </div>';
        htmlBlock += '           <div class="feedback-message">' + item.message + '</div>';
        htmlBlock += '         </div>'; 
        htmlBlock += '       </div>';
        htmlBlock += '     </div>';
    })
    //attach to a dom element
    let feedbackMessages = document.querySelector('.feedback-messages');
    feedbackMessages.innerHTML = htmlBlock;
}
displayMessages()