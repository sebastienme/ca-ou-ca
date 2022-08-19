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
    let k = "The respective values are :";
    let input = document.getElementsByName('array[]');
    for (let i = 0; i < input.length; i++) {
        let a = input[i]
        k = k + "array[" + i + "].value= " + a.value + " ";
        console.log(a)
    }
    console.log(k);
    console.log(input)
}


// A FAIRE CI-HAUT: transformer la NodeList et/ou la value des input et mettre dans une array. 

 
 