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


function onSubmit() {
    const name = document.querySelector('#name').value
    console.log(name)

    const radios = document.getElementsByName('gender');
    console.log(radios)
    
    let gender
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            gender = radios[i].value
            console.log(gender)
        }
    }
}