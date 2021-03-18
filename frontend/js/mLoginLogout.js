document.addEventListener("DOMContentLoaded", () => {
    mLoginLogout.addEventListener('click', () => {
        interface.innerHTML = `
            <p>Log in to your ScapeX account</p>
            <form class="form" id="form">
                <label class="input-styles">Email or Username:</label>
                <input type"text" class="input-styles-inp" id="input-name">
                <label class="input-styles">Password:</label>
                <input type="password" class="input-styles-inp" id="input-password"><br />
                <input type="input" type="submit" value="Log In" class="input-styles-button" id="submit-button">
            </form>`
        const form = document.getElementById('form')
        form.addEventListener('click', function(e) {e.preventDefault()})
        const submitButton = document.getElementById('submit-button')

        if (!loggedUser) {
            submitButton.addEventListener('click', () => {
                let formData = {
                    input: document.getElementById('input-name').value,
                    password: document.getElementById('input-password').value,
                }

                let configObj = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formData)
                }

                fetch('http://localhost:3000/login', configObj)
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
                        console.log(loggedUser)
                        interface.innerText = `You logged in successfully, ${user.username}.`
                    }
                })
                .catch(function(error) {
                    console.log(error.message)
                })
            })
        } else if (loggedUser) {
            loggedToggle()
            interface.innerText = 'You logged out successfully.'
        }
    })
})