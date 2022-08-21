let namesRemaining = [];
let namesInTransit = [];
//input choices number to be input by the user
const inputButton = document.querySelector('.input-btn');
let inputNumber;
inputButton.addEventListener('click', function() {
    inputNumber = prompt("Entrez le nombre de choix que vous avez?")
    createsInputLabels(inputNumber)
})

//function for the user to input names. The number of names to input is equal to the choices number requested above
const inputLabels = document.querySelector('.input-labels')
const form = document.querySelector('.form')
function createsForm(){
    let input = document.createElement('input')
    form.appendChild(input)
    input.setAttribute('type', 'text')
    input.setAttribute('name', 'array[]')
    input.setAttribute('value', '')
};

function createsInputLabels(number) {
    let btn = document.createElement('button')
    for (let i = 0; i < number; i++) {
        createsForm()
    }
    btn.innerHTML = "Ready?";
    btn.setAttribute('type', 'button')
    btn.setAttribute('name', 'button')
    btn.setAttribute('onclick', 'sendForm()')
    inputLabels.appendChild(btn);
}

//function when the user click on the submit button of the form
function sendForm() {
    let newArray = []
    let k = "The respective values are :";
    let input = document.getElementsByName('array[]');
    for (let i = 0; i < input.length; i++) {
        let a = input[i]
        k = k + "array[" + i + "].value= " + a.value + " ";
        newArray = createArray(newArray, a.value)
    }
    namesRemaining = newArray;
    clearMainSection();
    console.log("sendForm(): " + newArray);
    return namesRemaining
}

//function that adds a value to an array
function createArray(newArray, value) {
    newArray.push(value);
    return newArray;
}

//function that clears the main section
const main = document.querySelector('.main')
const btn = document.querySelector('.user-choice')
let alt;
function clearMainSection() {
    main.innerHTML = "";
    showButton()
    let randomNum = getRandomInt(namesRemaining)
    let arrayNumber = [randomNum.number1, randomNum.number2]
    for (let i = 0; i < 2; i++) {
        createContainer(arrayNumber[i]);
    }
    namesRemaining = namesRemaining.filter(name => name !== namesRemaining[randomNum.number1] && name !== namesRemaining[randomNum.number2])
    const userChoice = document.querySelectorAll('.comparison')
    userChoice.forEach((choice) => {
        choice.addEventListener('click', function() {
            alt = choice.getAttribute('alt')
            console.log("Alt : " + alt + " and nameInTransit: " + namesInTransit + " and namesRemaining: " + namesRemaining)
            return alt;
        })
    })
    console.log("namesRemaining: " + namesRemaining) 
}

//function that creates the container for comparasion of the two words
function createContainer(i) {
    const div = document.createElement('div')
    main.appendChild(div);
    div.setAttribute('class', 'comparison');
    div.setAttribute('alt', `${namesRemaining[i]}`)
    div.innerHTML = `${namesRemaining[i]}`
}

//function that get random number
function getRandomInt(array) {
    let number1;
    let number2;
    do {
        number1 = Math.floor(Math.random() * array.length);
        number2 = Math.floor(Math.random() * array.length);
    }
    while (number1 === number2)
    
    return {number1, number2}
}
  

//function that compares two strings


//function that toggle (Hide/Show) an the user choice button
function showButton() {
    btn.style.display = "block";
  }

//function when the user confirmed the name to choose from
const chooseButton = document.querySelector('.user-choice')
const ghost = document.querySelector('.ghost')
const div = document.createElement('div')

chooseButton.addEventListener('click', function() {
    if (alt.length != 0) {
        div.innerHTML = ""
        namesInTransit.push(alt);
        console.log("namesInTransit: " + namesInTransit + " | namesRemaining: " + namesRemaining)
        chooseButton.style.display = 'none';
        if (namesRemaining.length === 0 && namesInTransit.length === 1) {
            main.innerHTML = `Le nom gagnant est:  ${alt}`
        } else if (namesRemaining.length === 1) {
            namesInTransit.push(namesRemaining[0])
            namesRemaining = namesInTransit;
            namesInTransit = []
            clearMainSection()
        } else if (namesRemaining.length === 0) {
            namesRemaining = namesInTransit;
            namesInTransit = []
            clearMainSection();
        } else {
            clearMainSection();
        }
        alt = '';
    } else {
        ghost.appendChild(div);
        div.innerHTML = "Il faut choisir une case"
    }    
})
