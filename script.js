
//IIFE function, Called after defined

(function onLoad() {
    const input = document.querySelector('#name')

    // prevent user to press numeric values with event preventing
    input.addEventListener('keypress', (e) => {
        if (e.which < 48 || e.which > 57) { // char codes of non numerics
            return true
        } else e.preventDefault()
    })

    // prevent default browser behavior
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault()
    })
})()


const radios = document.getElementsByName('gender');

let gender

// get by name from localstorage

function getFromStorage(name) {
    return localStorage.getItem(name)
}


function onSubmit() {
    document.getElementById('error-msg').style.display = "none"

    let name = document.querySelector('#name').value

    // fetch request with promises
    const postPromise = fetch("https://api.genderize.io/?name=" + name, {
        method: 'GET'
    })
    postPromise.then((res) => {
        return res.json() // parse response to json
    }).then(res => { //receive parsed value

        document.querySelector('#predicted-gender').innerHTML = res.gender
        document.querySelector('#predicted-percent').innerHTML = res.probability

        // show error message if prediction was failed
        if (res.probability === 0){
            document.getElementById('error-msg').style.display = "block"
        }

        // get saved value from localstorage if available
        if (getFromStorage(name)) {
            document.querySelector('#saved-gender').innerHTML = getFromStorage(name)
            document.getElementById('has-save').style.display = "block"
        }
        else {
            document.querySelector('#saved-gender').innerHTML = ""
            document.getElementById('has-save').style.display = "none"
        }
    }).catch(err => {
        document.getElementById('error-msg').style.display = "block"
        return err
    })
}


// save to localstorage function definition
function onSave() {
    let name = document.querySelector('#name').value
    for (let i = 0, length = radios.length; i < length; i++) { // get checked value of input radios
        if (radios[i].checked) {
            gender = radios[i].value
        }
    }
    localStorage.setItem(name, gender)
    document.querySelector('#saved-gender').innerHTML = getFromStorage(name)
    document.getElementById('has-save').style.display = "block" // show saved data wrapper

}


// remove from localstorage function definition

function onRemoveLocal(){
    let name = document.querySelector('#name').value
    localStorage.removeItem(name)
    document.getElementById('has-save').style.display = "none" // hide saved data wrapper
}
