(function onLoad() {
    const input = document.querySelector('#name')
    input.addEventListener('keypress', (e) => {
        if (e.which < 48 || e.which > 57) {
            return true
        } else e.preventDefault()
    })
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault()
    })
})()


const radios = document.getElementsByName('gender');

let gender

function getFromStorage(name) {
    return localStorage.getItem(name)
}

function onSubmit() {
    let name = document.querySelector('#name').value
    const postPromise = fetch("https://api.genderize.io/?name=" + name, {
        method: 'GET'
    })
    postPromise.then((res) => {
        return res.json()
    }).then(res => {
        document.querySelector('#predicted-gender').innerHTML = res.gender
        document.querySelector('#predicted-percent').innerHTML = res.probability

        if (getFromStorage(name)) {
            document.querySelector('#saved-gender').innerHTML = getFromStorage(name)
            document.getElementById('has-save').style.display = "block"
        }
        else {
            document.querySelector('#saved-gender').innerHTML = ""
            document.getElementById('has-save').style.display = "none"
        }
    }).catch(err => {
        return err
    })
}

function onSave() {
    let name = document.querySelector('#name').value
    for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            gender = radios[i].value
        }
    }
    localStorage.setItem(name, gender)
    document.querySelector('#saved-gender').innerHTML = getFromStorage(name)
    document.getElementById('has-save').style.display = "block"

}


function onRemoveLocal(){
    let name = document.querySelector('#name').value
    localStorage.removeItem(name)
    document.getElementById('has-save').style.display = "none"

}
