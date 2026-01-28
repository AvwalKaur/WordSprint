/////**********1st way**************///////
// print the text in typewriter fashion into the box allocated 
// let typewriter = document.querySelector('.typewriter');

// const text = "Train your fingers. Beat the clock. Sprint with words.";
// let idx = 0;
// let string = "";

// function typeWriter() {
//     let interval = setInterval(() => {
//         if (idx < text.length) {
//             string += text.charAt(idx);
//             idx++;
//             typewriter.innerHTML = string;
//         } else {
//             clearInterval(interval);
//             console.log("END");

//             // after 1 sec open the main.html file
//             setTimeout(() => {
//                 window.location.href = "main.html";
//             }, 1500)  // 1.5 sec
//         }
//     }, 200)  // 0.2 sec
// }

// typeWriter();


/////**********2nd way**************///////
/*Write one sentence, pause 1sec, start deleting it, pause for some time, start next sentence ...... once all sentences done => open index.html*/
let typewriter = document.querySelector('.typewriter');
const array = [
    "Train your fingers.",
    "Beat the clock.",
    "Sprint with words."
];
let sentencePointer = 0;
let letterPointer = 0;
let newString = "";
let newInterval = null;

function typeWriter2() {
    // print all letters of string
    let currSentence = array[sentencePointer];
    newInterval = setInterval(() => {
        if (letterPointer < currSentence.length) {
            newString += currSentence.charAt(letterPointer);
            letterPointer++;
            typewriter.innerHTML = newString;
        } else {
            clearInterval(newInterval);
            newInterval = null;
            console.log("Done");

            // delete this sentence now by pausing 1sec
            setTimeout(deleteLetters, 1000);
        }
    }, 100)
}

function deleteLetters() {
    newInterval = setInterval(() => {
        if (newString.length > 0) {
            newString = newString.slice(0, -1);
            typewriter.innerHTML = newString;
        } else {
            // stop deleting first
            clearInterval(newInterval);
            newInterval = null;
            // ab delete ho gya hai next sentence ki bari to print
            sentencePointer++;
            letterPointer = 0;

            if (sentencePointer < array.length) {
                setTimeout(typeWriter2, 300);
            } else {
                console.log("All done");
                // move to main.html
                setTimeout(() => {
                    window.location.href = "main.html";
                }, 500)
            }
        }
    }, 100)
}

document.addEventListener('DOMContentLoaded', () => {
    typeWriter2();
})