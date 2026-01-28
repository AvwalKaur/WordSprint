// CHANGING DAY OR NIGHT ICON
function resetDayNight() {
    dayOrNight.addEventListener('click', () => {
        let currVal = dayOrNight.classList[1];
        const mainCont = document.getElementById('main-container');
        const resCont = document.querySelector('.result-container');
        const paraCont = document.querySelector('.para-container');
        const tryagin = document.querySelector('.tryAgain');

        if (currVal === "night") {
            // change innerHTML of button night to day
            dayOrNight.innerHTML = `<i class="fa-regular fa-sun"></i>`;
            // remove night from classList
            dayOrNight.classList.remove("night");
            // add day in classList
            dayOrNight.classList.add("day");
            console.log(dayOrNight.classList);
            // change the style
            mainCont.style.background = "rgba(30, 41, 59, 0.8)";
            mainCont.style.borderColor = "rgba(255, 255, 255, 0.1)";
            mainCont.style.boxShadow = "0 20px 50px rgba(0, 0, 0, 0.3)";

            resCont.style.color = "pink";
            tryagin.style.backgroundColor = "pink";
            tryagin.style.color = "#000";
        } else {
            document.body.style.backgroundColor = "#f1f5f9";
            // change innerHTML of button day to night
            dayOrNight.innerHTML = `<i class="fa-solid fa-moon"></i>`;
            // remove day from classList
            dayOrNight.classList.remove("day");
            // add night in classList
            dayOrNight.classList.add("night");
            // chnage the style
            mainCont.style.background = "rgba(255, 255, 255, 0.7)"; // Original Glass
            mainCont.style.borderColor = "black"; // Back to your original black border
            mainCont.style.boxShadow = "0 20px 50px rgba(0, 0, 0, 0.1)";

            paraCont.style.background = "rgba(255, 255, 255, 0.7)";
            paraCont.style.color = "rgb(93, 92, 92)"; // Original gray text

            resCont.style.color = "#9d00ff"; // Original stats purple
            tryagin.style.backgroundColor = "#9d00ff";
            tryagin.style.color = "#fff";
        }

        textArea.focus();
    })

    // redirect back to index.html page 
    backToIndex.addEventListener('click', () => {
        window.location.href = "index.html";
    })
}

function feedback(netValue, accValue) {
    if (netValue !== "0" && accValue !== "0 %") {
        // feedback on netWPM
        if (netValue <= 20) {
            netWPMFeedback.innerText = "Focus on memorizing key positions. Don't worry about speed yet; just find the right rhythm.";
        }
        else if (netValue <= 40) {
            netWPMFeedback.innerText = "You've got the basics! Start practicing without looking at the keyboard to build muscle memory.";
        }
        else if (netValue <= 60) {
            netWPMFeedback.innerText = "Great pace! To reach the next level, try to keep your hands relaxed and use all ten fingers";
        }
        else if (netValue <= 80) {
            netWPMFeedback.innerText = "Excellent speed. You are now faster than 90% of people. Focus on maintaining this consistency.";
        }
        else {
            netWPMFeedback.innerText = "Incredible! You are at a competitive level. Try challenging yourself with more difficult vocabularies.";
        }

        // feedback on accuracy
        const accNum = parseInt(accValue)
        if (accNum >= 98) {
            accuracyFeedback.innerText = "Flawless execution! Since your accuracy is high, you can now try to push for more speed."
        } else if (accNum >= 90) {
            accuracyFeedback.innerText = "Solid control. You're hitting the right keys, but a bit more focus will make you perfectly precise."
        } else if (accNum >= 80) {
            accuracyFeedback.innerText = "You're rushing! Slow down your typing speed until you can maintain at least 95% accuracy."
        } else {
            accuracyFeedback.innerText = "Stop sprinting! Your accuracy is too low. Speed is useless without correctness. Go back to basics."
        }
    } else {
        second.style.display = "none";
        third.style.display = "none";
    }
}

function setupModal() {
    // checkSummary pe click kren to modal open ho jae 
    checkSummary.addEventListener('click', () => {
        // pick values from the result Container agar aa gya hai to 
        const rawValue = raw.innerText.split(': ')[1] || "0";
        const netValue = net.innerText.split(': ')[1] || "0";
        const accValue = acc.innerText.split(': ')[1] || "0 %";

        // update in overlay
        mRaw.innerText = rawValue;
        mNet.innerText = netValue;
        mAcc.innerText = accValue;

        // show the results and feedback 
        feedback(netValue, accValue);

        // show modal to user on screen
        modal.style.display = "flex";
    })

    // close modal 
    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
    })

    // even if we click outside modal, still it closes 
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    })
}


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
/*even if the textarea has been made hidden, still abhi jaise hi page load hoga to text area focus ho jaega and user jaise hi type krega vaise hi input event fire ho jaega*/
function textAreaFocus() {
    textArea.focus();
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
        array[lastIdx].style.color = "#ef4444";
        // count mistakes 
        currMistakes++;
        mistakes.innerHTML = `Mistakes : ${currMistakes}`;
    }
    moveCursorForward();
}

function backwardTyping(lastIdx, currLength) {
    lastIdx = currLength;
    array[lastIdx].style.color = "rgb(93, 92, 92)";
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
    let currTimeRemaining = 5;
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
