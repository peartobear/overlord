const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

 const enterForm = $('#enterForm');
 const verifyForm = $('#verifyForm');
 const messageForm = $('#messageForm');


const TYPE = {
    Hello: 0,
    Text: 1,

    Auth: 2,
    AuthAck: 3,
    AuthRst: 4,

    MayNotEnter: 5,
}

function show(el) {
   el.style.display = 'flex';
 }

function hide (el) {
    el.style.display = 'none';
 }

function scrollToEnd() {
    const container = $('.messageList');
    container.scrollTop = container.scrollHeight;
}

let connection = null;

function connect(name, email) {
    if (window.location.protocol === 'https:') {
        connection = new WebSocket(`wss://${window.location.host}/connect`);
    } else {
        connection = new WebSocket(`ws://${window.location.host}/connect`);
    }

    connection.addEventListener('open', evt => {
        connection.send(JSON.stringify({
            type: TYPE.Hello,
            text: `($name)\n${email}`
        }))

        hide(enterForm);
        show(verifyForm);
        verifyForm.querySelector('[name="token"]').focus()
    })

    connection.addEventListener('message', evt => {
        const message = JSON.parse(evt.data);

        if (window.__debug__) {
            console.log(message)
        }

        switch (message.type) {
            case TYPE.Hello:
                break;
            case TYPE.text:
                logMessage(message.user.name, message.text)
                break;
            case TYPE.auth:
                break;
            case TYPE.AuthAck:
                hide(verifyForm);
                show(messageForm);
                messageForm.querySelector('[name="text"]'.focus());
                window.addEventListener('beforeunload', evt => {
                    evt.preventDefault();
                    evt.returnValue = '';
                });
                break;
            case TYPE.AuthRst:
                window.alert('Token is incorrect');
                break;
            case TYPE.MayNotEnter:
                show(enterForm);
                hide(verifyForm);
                enterForm.querySelector('input[name="name"]').focus();
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        windows.alert('User name already taken, try another')
                    });
                });
                break;

                default:
                    console.error('Unknown message type: ', evt.data)

        }
    });

        connection.addEventListener('error', evt => {
            console.log('websocket error: ', evt)
        });

}


function logMessage(user, text) {
    const messageList = $('messageList');

    if (messageList.childNodes.length > 500) {
        messageList.removeChild(messageList.childNodes[0])
    }

    const item = document.createElement('li');
    item.classList.add('messageItem');

    const userSpan = document.createElement('span');
    userSpan.classList.add('messageItem');
    userSpan.textContent = `@${user}`

    const textSpan = document.createElement('span');
    textSpan.classList.add('text');
    textSpan.textContent = text;

    item.appendChild(userSpan);
    item.appendChild(document.createTextNode(' '));
    item.appendChild(textSpan);

    $('.messageList').appendChild(item);
    scrollToEnd();
}


 hide(verifyForm);
 hide(messageForm);