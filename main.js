document.addEventListener('DOMContentLoaded', function() {
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    const resultDiv = document.getElementById('result');

    messageForm.addEventListener('submit', function(event) {
        event.preventDefault();
        sendMessageAndRetrieve();
    });

    function sendMessageAndRetrieve() {
        const urlSend = 'https://livechat.pythonanywhere.com/send-message'; 
        const urlRetrieve = 'https://livechat.pythonanywhere.com/retrieve-message';
        const channel = 'C05KSRKRUTH';
        const message = messageInput.value; // Get user input message

        // Send message using a GET request
        $.ajax({
            url: `${urlSend}?channel=${channel}&message=${message}`,
            method: 'GET',
            success: function(result) {
                resultDiv.textContent = result;
                if (result !== '0') {
                    retrieveMessage(urlRetrieve, channel);
                }
            },
            error: function(error) {
                console.error('Error sending message:', error);
            }
        });
    }

    function retrieveMessage(url, channel) {
        // Retrieve message using a GET request
        $.ajax({
            url: `${url}?channel=${channel}`,
            method: 'GET',
            success: function(result) {
                resultDiv.textContent += '\nRetrieved message: ' + result;
            },
            error: function(error) {
                console.error('Error retrieving message:', error);
            }
        });
    }
});