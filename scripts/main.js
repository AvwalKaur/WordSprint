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

        // reset cursor
        array.forEach(span => span.classList.remove('active'));
        cursorCurrIdx = 0;
        if (array.length > 0) {
            array[0].classList.add('active');
        }

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

        // reset textArea ke upar focus
        textAreaFocus();
    });
}




// MAIN FUNCTION jo start mein game ke cheezein rhengi
function init() {
    breakParagraphIntoSpans(paragraphs[0]);
    tryAgainFunctionality();
    textAreaFunctionality();
    paraContainer.addEventListener('click', () => {
        textArea.focus();
    })
    textAreaFocus();
    array[0].classList.add('active');
    resetDayNight();
    setupModal();

}

init();