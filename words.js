const guesses = document.getElementById("guesses");
const start = document.getElementById("start");
const end = document.getElementById("end");
const buttons = document.getElementsByClassName("calc-btn");


window.addEventListener("keydown", function (e) {
    parseKey(e.key);
});

let guessIndex = 0;
let guessedWord = "";

function checkGuess(guessedWord, compare) {
    console.log(guessedWord, compare, words[5])
    if (guessedWord == words[5]) {
        console.log("fdfe")
        for (let i = guessIndex-4; i < guessIndex; i++) {
            const child = guesses.children[i];
            shake(child);
        };
        showPopup("You need to use all four lines!");
        return false
    }
    if (word_list[guessedWord.charAt(0).toLowerCase()].includes(guessedWord.toLowerCase())) {
        let diffScore = 0;
        for (let i = 0; i < guessedWord.length; i++) {
            if (compare[i] != guessedWord[i]) {
                diffScore ++;
            }
        }
        if (diffScore != 1) {
            for (let i = guessIndex-4; i < guessIndex; i++) {
                const child = guesses.children[i];
                shake(child);
            };
            showPopup("Just one different letter per line!");
            return false
        }
    } else {   
        for (let i = guessIndex-4; i < guessIndex; i++) {
            const child = guesses.children[i];
            shake(child);
        };     
        showPopup("This word isn't in the list!");
        return false
    }
    return true
}

function getRandomNumber(n) {
    return Math.floor(Math.random() * (n + 1));
}

function shake(element) {
    element.classList.add('btn-wrong');
    setTimeout(function () {
        element.classList.remove('btn-wrong');;
    }, 600);
};

function showPopup(message) {
    const popup = document.getElementById("popup");
    popup.classList.add("show");
    popup.textContent = message;
  
    setTimeout(function () {
        popup.classList.remove("show");
    }, 1700);
}

function parseKey(pressedKey) {
    pressedKey = pressedKey.toUpperCase()
    if (pressedKey == "ENTER") {
        if (guessIndex % 4 == 0 && guessIndex != 0) {
            if (guessIndex == 16) {
                if (checkGuess(guessedWord, words[5])) {
                    if (guessIndex == 16) {
                        for (element of buttons) {
                            element.classList.add('btn-victory');
                        }
                        showPopup("You won!");
                    }
                };
            } else if (checkGuess(guessedWord, words[guessIndex/4-1])) {
                words[guessIndex/4] = guessedWord; 
                guessedWord = "";
                for (let i = guessIndex-4; i < guessIndex; i++) {
                    const child = guesses.children[i];
                    child.classList.add('btn-accepted');
                }
            };
        };
        

    } else if (pressedKey == "BACKSPACE") {
        if (guessIndex > 0) {
            if (guessIndex % 4 == 0) {
                for (let i = guessIndex-4; i < guessIndex; i++) {
                    const child = guesses.children[i];
                    child.classList.remove('btn-accepted');
                }
            }
            guessIndex--;
            guesses.children.item(guessIndex).textContent = "";
        }
        guessedWord = guessedWord.slice(0, -1); 
    } else if (keyLayout.includes(pressedKey)) {
        if (guessIndex % 4 == 0 && guessIndex != 0 && guessedWord != "") {
            return
        };
        
        guesses.children.item(guessIndex).textContent = pressedKey;
        guessIndex++;
        guessedWord += pressedKey;
    }

}

for (let i = 0; i<16; i++) {
    let cell = document.createElement("div");
    cell.className = "calc-btn";
    guesses.appendChild(cell);
}


let combinationIndex = getRandomNumber(combinations.length-1);


let words = [combinations[combinationIndex][0].toUpperCase(), "", "", "", "", combinations[combinationIndex][1].toUpperCase()];
let startWord = words[0];
let endWord = words[5];

for (let letter of startWord) {
    let cell = document.createElement("div");
    cell.className = "calc-btn";
    cell.textContent = letter;
    start.appendChild(cell);
}

for (let letter of endWord) {
    let cell = document.createElement("div");
    cell.className = "calc-btn";
    cell.textContent = letter;
    end.appendChild(cell);
}



const keyboard = document.getElementById("keyboard");



const keyLayout = [
    "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
    "A", "S", "D", "F", "G", "H", "J", "K", "L",
    "BACKSPACE", "Z", "X", "C", "V", "B", "N", "M", "ENTER"
];

for (let keyName of keyLayout) {
    let cell = document.createElement("div");
    cell.className = "key-btn";
    switch (keyName) {
        case "BACKSPACE":
            cell.innerHTML = `<i class="material-icons-outlined">backspace</i>`;
            break;
        case "ENTER":
            cell.innerHTML = `<i class="material-icons-outlined">check_circle</i>`;
            break;
        default:
            cell.textContent = keyName;
            break;
    };
    cell.addEventListener("click", function() {
        let keyInput = this.textContent;
        if (keyInput == "check_circle") {
            keyInput = "ENTER";
        }
        parseKey(keyInput);
    });
    keyboard.appendChild(cell);
}


