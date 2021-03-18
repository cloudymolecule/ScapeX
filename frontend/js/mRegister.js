
document.addEventListener("DOMContentLoaded", () => {
    const mRegister = document.getElementById('menu-register')
    mRegister.addEventListener('click', () => {
        if (!loggedUser) {
            interface.innerHTML = `
                <p>Create a ScapeX Account</p>
                <form class="form" id="form">
                    <label class="input-styles">Username:</label>
                    <input type="text" class="input-styles-inp" id="input-name">
                    <label class="input-styles">Email:</label>
                    <input type="text" class="input-styles-inp" id="input-email">
                    <label class="input-styles">Password:</label>
                    <input type="password" class="input-styles-inp" id="input-password">
                    <label class="input-styles">Confirm password:</label>
                    <input type="password" class="input-styles-inp" id="input-password-con"></ br>
                    <input type="submit" value="Register" class="input-styles-button" id="submit-button">
                </form>`
            const form = document.getElementById('form')
            form.addEventListener('click', function(e) {e.preventDefault()})
            const submitButton = document.getElementById('submit-button')
            submitButton.addEventListener('click', () => {
                let formData = {
                    username: document.getElementById('input-name').value,
                    email: document.getElementById('input-email').value,
                    password: document.getElementById('input-password').value,
                    password_confirmation: document.getElementById('input-password-con').value
                }

                let configObj = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formData)
                }

                fetch('http://localhost:3000/users/new', configObj)
                .then(function(response) {
                    return response.json()
                })
                .then(function(object) {
                    if (object.errors) {
                        errorsDisplay(object.errors)
                    } else {
                        const user = new User(
                            object.data.attributes.username, 
                            object.data.attributes.email, 
                            object.data.id, 
                            object.data.attributes.rooms)
                        loggedToggle(user)
                        interface.innerHTML = `Account created successfully, welcome ${user.username}.`
                    }
                })
                .catch(function(error) {
                    console.log(error.message)
                })
            })
        } 
    })
})