let namesRemaining = []; //main array
let namesInTransit = []; //array when transiting between round

//function to get the instructions
const instructionsBtn = document.querySelector('.btn-instructions')
const instructions = document.querySelector('.instructions')
const toRoll = document.querySelector('.to-roll');
instructionsBtn.addEventListener('click', () => {
    toRoll.style.maxHeight = "300px";
})

//funtion to start the game
const qtyButton = document.querySelector('.qty-btn')
const section = document.querySelector('.step-1') 
qtyButton.addEventListener('click', function() {
    let input = document.createElement('input')
    let form = document.createElement('form')
    let label = document.createElement('label')
    let submit = document.createElement('button')
    qtyButton.style.display = "none";
    section.appendChild(form)
    form.setAttribute('class', 'names-qty')
    form.setAttribute('action', 'index.html')
    form.setAttribute('method', 'post')
    form.appendChild(label)
    label.setAttribute('for', 'names-qty')
    label.innerHTML = 'Combien de noms as-tu?';
    form.appendChild(input)
    input.setAttribute('type', 'number')
    input.setAttribute('id', 'names-qty')
    input.setAttribute('value', '')
    input.setAttribute('min', '2')
    input.setAttribute('max', '100')
    input.setAttribute('required', '')
    input.setAttribute('onkeypress', 'return event.keyCode != 13;')
    section.appendChild(submit)
    submit.setAttribute('type', 'button')
    submit.setAttribute('name', 'button')
    submit.setAttribute('onclick', 'getInputValue();')
    submit.setAttribute('class', 'input-btn')
    submit.innerHTML = 'Soumettre'
    
})

//function that get input (integer) from the user

function getInputValue(){
    // Selecting the input element and get its value 
    const form = document.querySelector('.names-qty')
    const btn = document.querySelector('.input-btn')
    let inputVal = document.getElementById("names-qty").value;
    if (inputVal >= 2) {
        createsInputLabels(inputVal)   
        form.style.display = 'none';
        btn.style.display = 'none';
    } else {
        window.location.reload();
    }

}

//function that creates the labels from the form
const inputLabels = document.querySelector('.input-labels')
const form = document.querySelector('.form')
function createsForm(){
    let input = document.createElement('input')
    form.appendChild(input)
    input.setAttribute('type', 'text')
    input.setAttribute('name', 'array[]')
    input.setAttribute('value', '')
    input.setAttribute('required', '')
};

//function that creates the form
function createsInputLabels(number) {
    let btn = document.createElement('button')
    for (let i = 0; i < number; i++) {
        createsForm()
    }
    btn.innerHTML = "Prêt?";
    btn.setAttribute('type', 'button')
    btn.setAttribute('name', 'button')
    btn.setAttribute('class', 'ready')
    btn.setAttribute('onclick', 'sendForm()') //when the button is clicked, the sendForm() function is trigger
    inputLabels.appendChild(btn);
}

//function that send the form and send each labels into a array  
function sendForm() {
    let newArray = []
    let input = document.getElementsByName('array[]');
    for (let i = 0; i < input.length; i++) {
        let a = input[i]
        newArray = createArray(newArray, a.value)
    }
    namesRemaining = newArray;
    namesRemainingIfRefresh = newArray;
    clearMainSection();
    console.log("sendForm(): " + newArray);
    return namesRemaining
}

//function that adds a value to an array
function createArray(newArray, value) {
    newArray.push(value);
    return newArray;
}

//function that clears the main section and triggers randomly elements in the list of the names that's left 
const main = document.querySelector('.main')
const btn = document.querySelector('.user-choice')
let alt;
function clearMainSection() {
    main.innerHTML = "";
    showButton() //button the confirm the choice of the user
    
    //quick script to be able to get two random element from the array so the user can choose between the two
    let randomNum = getRandomInt(namesRemaining) //namesRemaining is the array of the list of the names that remained for each round
    let arrayNumber = [randomNum.number1, randomNum.number2]
    for (let i = 0; i < 2; i++) {
        createContainer(arrayNumber[i], i);
    }

    //removing elements form the main list each time a selection is made
    namesRemaining = namesRemaining.filter(name => name !== namesRemaining[randomNum.number1] && name !== namesRemaining[randomNum.number2])
    const userChoice = document.querySelectorAll('.comparison')
    const id0 = document.querySelector('#comp-0')
    const id1 = document.querySelector('#comp-1')
    userChoice.forEach((choice) => {
        choice.addEventListener('click', function() {
            alt = choice.getAttribute('alt')
            if (choice.getAttribute('id') == 'comp-0') {  //if script to make the div bright neon when the user click on it
                id0.classList.add('comparison-click')
                id1.classList.remove('comparison-click')
            } else {
                id1.classList.add('comparison-click')
                id0.classList.remove('comparison-click') 
            }
            console.log(choice.getAttribute('id'))
            console.log("Alt : " + alt + " and nameInTransit: " + namesInTransit + " and namesRemaining: " + namesRemaining)
            return alt;
        })
    })
    console.log("namesRemaining: " + namesRemaining) 
}

//function that creates the container for comparasion of the two words
function createContainer(i, ii) {
    const div = document.createElement('div')
    main.appendChild(div);
    div.setAttribute('class', 'comparison');
    div.setAttribute('id', `comp-${ii}`)
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

//function that toggle (Hide/Show) an the user choice button
function showButton() {
    btn.style.display = "block";
  }

//the button below is clicked when the user confirms the element he wants
const chooseButton = document.querySelector('.user-choice')
const ghost = document.querySelector('.ghost')
const div = document.createElement('div')

chooseButton.addEventListener('click', function() {
    if (alt.length != 0) {                                              //if the user choose an element, the script goes on
        div.innerHTML = ""
        namesInTransit.push(alt);
        console.log("namesInTransit: " + namesInTransit + " | namesRemaining: " + namesRemaining)
        chooseButton.style.display = 'none';
        if (namesRemaining.length === 0 && namesInTransit.length === 1) { //since we push an element in the namesInTransit array, it declare a winner element...
            const btn = document.createElement('button');                 //...only if the main list is at 0 and the namesInTransit is at 1 element
            main.innerHTML = `Le nom gagnant est: <span class='span-winner'>${alt}</span>`
            main.classList.add('winner')
            btn.innerHTML = "Recommencer avec les mêmes noms";
            btn.setAttribute('class', 'refresh')
            ghost.appendChild(btn);
            btn.onclick = function() {                                    //button to make the user redo the game with the same names choosen before
                clearMainSection();
                this.remove();
            }
            namesRemaining = namesRemainingIfRefresh;
            namesInTransit = []
        } else if (namesRemaining.length === 1) {                        //if there is only one element left in the main list, it normally can't be compare to another them...
            namesInTransit.push(namesRemaining[0])                       //...so this one element passes and goes to the next round
            namesRemaining = namesInTransit;
            namesInTransit = []
            clearMainSection()
        } else if (namesRemaining.length === 0) {                        //if there is only, 0 element left in the main list, that means a round is over and the user can begin another round
            namesRemaining = namesInTransit;
            namesInTransit = []
            clearMainSection();
        } else {
            clearMainSection();                                          //if there is other element to be compared with each other
        }
        alt = '';
    } else {                                                            //if the user did not choose an element

    }    
})


