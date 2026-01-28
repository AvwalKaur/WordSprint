// defining paragraphs array
const paragraphs = [
    "Consistency matters more than intensity when learning any new skill. Writing code daily, even for a short time, helps your brain build patterns and confidence. Progress may feel slow at first, but small efforts compound over time and lead to strong fundamentals that last longer than quick motivation bursts.",

    "Debugging is not a distraction from programming; it is a core part of it. Every error message teaches you something about how systems think. Developers who embrace debugging instead of avoiding it develop deeper understanding and become more confident problem solvers.",

    "Good software is not written by typing fast but by thinking clearly. Clean logic, readable code, and well-structured functions matter more than clever tricks. Writing understandable code makes collaboration easier and saves time when projects grow larger.",

    "Learning programming can feel overwhelming because there is always something new to explore. The key is not to learn everything at once, but to build strong basics and slowly expand your knowledge through practice, experimentation, and real-world projects.",

    "Typing accuracy is more important than typing speed. Fast typing with frequent mistakes slows you down in the long run. Developing accuracy builds rhythm and confidence, which naturally improves speed without forcing it.",

    "Every complex problem becomes manageable when broken into smaller parts. Solving one small piece at a time reduces stress and improves focus. This approach works not only in coding but also in learning, planning, and decision making.",

    "Projects teach lessons that tutorials cannot. When you build something on your own, you face real challenges that force you to think independently. These struggles strengthen problem-solving skills and prepare you for real development work.",

    "Technology evolves quickly, but core concepts remain stable. Understanding how things work under the hood gives you flexibility to adapt to new tools and frameworks. Strong fundamentals make learning new technologies much easier.",

    "Making mistakes is a natural part of growth. Every incorrect attempt provides feedback that guides improvement. Instead of fearing errors, treat them as signals that help you refine your approach and deepen your understanding.",

    "Progress is rarely linear. Some days you will feel confident, and other days everything will seem confusing. Staying consistent during difficult phases is what separates temporary learners from long-term achievers."
];


// Selecting elements
const paraContainer = document.querySelector('.para-container');
const tryAgain = document.querySelector('.tryAgain');
const textArea = document.querySelector('#textArea');
const mistakes = document.querySelector('.mistakes');
let timerSpan = document.querySelector('.timerSpan');
const timer = document.querySelector('.timer');
let raw = document.querySelector('.rawWPM');
let net = document.querySelector('.netWPM');
let acc = document.querySelector('.accuracy');

// declaring and defining variables
let currParaIdx = 1;
let prevLength = 0;
let currMistakes = 0;
let cursorCurrIdx = 0;
let array;
let firstCharacterTyped = false;
let interval = null;
let isTypingAllowed = true;
let totalCharactersTyped = 0;

// PARAGRAPH RELATED FUNCTIONS
/*breaks para into spans and usko paracontainer ke andar daal deta hai*/
function breakParagraphIntoSpans(paragraph) {
    console.log(paragraph);
    let spans = "";
    for (let i = 0; i < paragraph.length; i++) {
        spans += `<span>${paragraph[i]}</span>`;
    }
    console.log(spans);

    // add to para container
    paraContainer.innerHTML = spans;
    array = Array.from(paraContainer.childNodes);
}

/*reset paragraph*/
function resetParagraph() {
    breakParagraphIntoSpans(paragraphs[currParaIdx]);
    currParaIdx++;
    if (currParaIdx === paragraphs.length) {
        currParaIdx = 0;
    }
}




// TEXT AREA FUNCTIONS
/*even if the textarea has been made hidden, still abhi koi bhi body pe click krega to text area focus ho jaega and textarea ka input event bhi work krega  properly*/
function textAreaFocus() {
    document.body.addEventListener('click', () => {
        textArea.focus();
        console.log(document.activeElement);
    })
}


/*input event fire of text area*/
function textAreaFunctionality() {
    textArea.addEventListener('input', (e) => {
        if (!isTypingAllowed) return;

        if (!firstCharacterTyped) {
            firstCharacterTyped = true;
            startTimer();
        }

        const textAreaValue = e.target.value;
        const currLength = textAreaValue.length;
        let lastIdx = textAreaValue.length - 1;

        if (currLength > prevLength) {
            forwardTyping(lastIdx, textAreaValue);
            prevLength = currLength;
            totalCharactersTyped++;
        }
        if (currLength < prevLength) {
            backwardTyping(lastIdx, currLength);
            prevLength--;
        }
    })
}

function forwardTyping(lastIdx, textAreaValue) {
    if (array[lastIdx].innerText === textAreaValue.charAt(lastIdx)) {
        console.log("Same");
        array[lastIdx].style.color = "green";
    } else {
        console.log("Not same");
        array[lastIdx].style.color = "red";
        // count mistakes 
        currMistakes++;
        mistakes.innerHTML = `Mistakes : ${currMistakes}`;
    }
    moveCursorForward();
}

function backwardTyping(lastIdx, currLength) {
    lastIdx = currLength;
    array[lastIdx].style.color = "grey";
    moveCursorBackward();
}

function moveCursorForward() {
    if (cursorCurrIdx >= array.length - 1) return;
    array[cursorCurrIdx].classList.remove('active');
    cursorCurrIdx++;
    array[cursorCurrIdx].classList.add('active');
}

function moveCursorBackward() {
    if (cursorCurrIdx <= 0) return;
    array[cursorCurrIdx].classList.remove('active');
    cursorCurrIdx--;
    array[cursorCurrIdx].classList.add('active');
}




// STATS FUNCTIONS
// raw WPM => speed measure only 
function rawWPM(totalCharactersTyped) {
    // In 1 minute 
    return Math.round(totalCharactersTyped / 5);
}

// accuracy 
function accuracy(totalCharactersTyped, currMistakes) {
    if (totalCharactersTyped === 0) return 0;
    const correctCharacters = totalCharactersTyped - currMistakes;
    return Number(((correctCharacters / totalCharactersTyped) * 100).toFixed(1));
}

// net wpm => speed * accuracy(correctness)
function netWPM() {
    return Math.round(rawWPM(totalCharactersTyped) * (accuracy(totalCharactersTyped, currMistakes)) / 100);
}

function updateWpmAndAccuracy() {
    raw.innerText = `Raw WPM : ${rawWPM(totalCharactersTyped)}`
    acc.innerText = `Accuracy : ${accuracy(totalCharactersTyped, currMistakes)} %`;
    net.innerText = `Net WPM : ${netWPM()}`;
}




// TIMER FUNCTIONS
function startTimer() {
    // agar interval not null hai matlab purana timer chal rha hoga
    if (interval !== null) {
        clearInterval(interval);
    }

    // abhi interval null hai that means ab start hoga new timer 
    let currTimeRemaining = 4;
    interval = setInterval(function () {
        timerSpan.innerText = `${currTimeRemaining} sec`;
        currTimeRemaining--;
        if (currTimeRemaining === -1) {
            clearInterval(interval);
            interval = null;
            // timer khatam to typing stopped & display stats
            isTypingAllowed = false;
            updateWpmAndAccuracy();
        }
    }, 1000)
}




// TRY AGAIN FUNCTIONALITY FUNCTIONS
function tryAgainFunctionality() {
    tryAgain.addEventListener('click', () => {

        // 1. reset paragraph
        resetParagraph();

        // 2. reset mistakes
        currMistakes = 0;
        mistakes.innerHTML = `Mistakes : ${0}`;

        // 3. reset states
        textArea.value = "";
        isTypingAllowed = true;
        firstCharacterTyped = false;
        prevLength = 0;
        cursorCurrIdx = 0;

        // 4. reset timer 
        // purana interval stop kro
        if (interval !== null) {
            clearInterval(interval);
            interval = null;
        }
        timerSpan = document.querySelector('.timerSpan');
        timerSpan.innerHTML = `60 sec`;

        // 5. reset totalCharactersTyped
        totalCharactersTyped = 0;
        raw.innerText = `Raw WPM : 0`;
        net.innerText = `Net WPM : 0`;
        acc.innerText = `Accuracy : 0 %`;
    });
}




// MAIN FUNCTION jo start mein game ke cheezein rhengi
function init() {
    breakParagraphIntoSpans(paragraphs[0]);
    tryAgainFunctionality();
    textAreaFunctionality();
    textAreaFocus();
    array[0].classList.add('active');
}

init();