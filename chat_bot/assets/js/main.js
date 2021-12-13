const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
const bot_img = "img/bot.png";
const person_img = "img/user.png"
const bot_name = "Bot";
const person_name = "User 001"
const prompts = [
    ["hi", "hey", "good morning", "good afternoon", "good night"],
    ["how are you", "how is life", "how are thingth"],
    ["what are you doing", "what is up", "what is going on"],
    ["how old are you"],
    ["who are you", "are you a human", "are you a bot", "are you a human or bot"],
    ["who created you", "who made you"],
    [
        "your name please",
        "your name",
        "may i know your name",
        "what is your name",
        "what call yourself"
    ],
    ["i love you"],
    ["happy", "good", "fun", "wonderful", "fantastic", "cool"],
    ["bad", "bored", "tired"],
    ["help me", "tell me a story", "tell me joke"],
    ["ah", "yes", "ok", "okay", "nice"],
    ["bye", "good bye", "goodbye", "see your later"],
    ["what should i eat today"],
    ["bro"],
    ["what", "why", "how", "where", "when"],
    ["no", "not sure", "maybe", "no thanks"],
    [""],
    ["hahaha", "ha", "lol", "hehehe", "funny", "joke"]
];
const replies = [
    ["Hello!", "Hi!", "Hi there!"],
    [
        "Fine... how are you?",
        "Pretty well, how are you?",
        "Fantastic, how are you?",
    ],
    [
        "Nothing much",
        "About to go to sleep",
        "Can you guess?",
        "I don`t know actually"
    ],
    ["I am infinite"],
    ["I am just a bot", "i am a bot. What are you"],
    ["There one true God. JavaScript"],
    ["I am nemeless", "I don`t have a name"],
    ["I love you too", "Me too"],
    ["Hawe you ewer felt bed?", "glad to hear it"],
    ["Why?", "Why? You shouldn`t", "Try to watching TV"],
    ["What about?", "Once upon a time..."],
    ["Tell me a story", "Tell me a joke", "Tell me aboyt yourself"],
    ["Bye", "Goodbye", "See you later"],
    ["Soup", "Pasts", "Sushi", "Buckwheat"],
    ["Bro!"],
    ["Great qestion"],
    ["That`s ok", "I understand", "What do youwant to talk about?"],
    ["Please say something :( "],
    ["Hahaha", "Good one!"],
];
const alternative = [
    "Some",
    "Go on...",
    "Bro...",
    "Try again",
    "I`m listening...",
    "I don`t understand :/ "
];
const robot = ["How do you do, fellow human", "I am not a bot"];

msgerForm.addEventListener("submit", event => {
    event.preventDefault();
    const msgText = msgerInput.value;
    if (!msgText) return;
    msgerInput.value = "";
    addChat(person_name, person_img, "right", msgText);
    output(msgText);
});
function output(input) {
    let product;
    let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
    text = text
    .replace(/ a /g, " ")
    .replace(/i feel /g, " ")
    .replace(/whats/g, "what is")
    .replace(/please/g, "")
    .replace(/please/g, "")
    .replace(/r u/g, "are you");
    if (compare(prompts, replies, text)) {
        product = compare(prompts, replies, text);
    } else if (text.match(/thank/gi)) {
        product = "You`re welcome!"
    } else if (text.match(/(robot|bot|robo)/gi)) {
        product = robot[Math.floor(Math.random() * robot.length)];
    } else {
        product = alternative[Math.floor(Math.random() * alternative.length)];
    }
    const delay = input.split(" ").length * 100;
    setTimeout(() => {
        addChat(bot_name, bot_img, "left", product);
    }, delay);
}

function compare(promptsArray, repliesArray, string) {
    let reply;
    let replyFound = false;
    for (let x = 0; x < promptsArray.length; x++) {
        for (let y = 0; y < promptsArray[x].length; y++) {
            if (promptsArray[x][y] === string) {
                let replies = repliesArray[x];
                reply = replies[Math.floor(Math.random() * replies.length)];
                replyFound = true;
                break;
            }
        }
        if (replyFound) {
            break;
        }
    }
    return reply;
}

function addChat(name, img, side, text) {
    const msgHTML = `
    <div class="msg ${side}-msg">
        <div class="msg-img" style="background-image: url(${img})"></div>
        <div class="msg-bubble">
            <div class ="msg-info">
                <div class="msg-info-name">${name}</div>
                <div class="msg-info-time">${formatDate(new Date())}</div>
            </div>
        <div class="msg-text">${text}</div>
    </div>
    </div>
    `;
    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 500;
}
function get(selector, root = document) {
    return root.querySelector(selector);
}
function formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();
    return `${h.slice(-2)}:${m.slice(-2)}`;
}
function random(min, max) {
    return Math.floor(Math.random() * (max - min) * min);
}