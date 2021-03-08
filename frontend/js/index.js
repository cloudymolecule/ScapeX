document.addEventListener("DOMContentLoaded", () => {
    
    const mLoginLogout = document.getElementById('menu-login-logout')
    const mRegister = document.getElementById('menu-register')
    const mCreate = document.getElementById('menu-create')
    const mMy = document.getElementById('menu-my')
    const mTop = document.getElementById('menu-top')
    const mSearch = document.getElementById('menu-search')
    const mAbout = document.getElementById('menu-about')
    
    const interface = document.getElementById('interface')
    function clearElems(elementId) {
        document.getElementById(elementId).innerHTML = ""
    }

    //main menu
    mLoginLogout.addEventListener('click', () => {
        clearElems('interface')
        if (mLoginLogout.innerHTML === 'Login') {
            interface.innerHTML = 'Login here!'
        } else {
            interface.innerHTML = 'Logout here!'
        }
    })

    mRegister.addEventListener('click', () => {
        clearElems('interface')
        
        const form = document.createElement('div')
        const p = document.createElement('p')
        const labName = document.createElement('label')
        const inputName = document.createElement('input')
        const labEmail = document.createElement('label')
        const inputEmail = document.createElement('input')
        const labPass = document.createElement('label')
        const inputPass = document.createElement('input')
        const labPassCon = document.createElement('label')
        const inputPassCon = document.createElement('input')
        const br = document.createElement('br')
        const submitButton = document.createElement('input')

        form.setAttribute('class', 'form')
        p.innerText = "Create a ScapeX account"
        labName.setAttribute('class', 'input-styles')
        labName.innerText = "Username:"
        inputName.setAttribute('type', 'text')
        inputName.setAttribute('class', 'input-styles-inp')
        inputName.setAttribute('id', 'input-name')
        labEmail.setAttribute('class', 'input-styles')
        labEmail.innerText = "Email:"
        inputEmail.setAttribute('type', 'text')
        inputEmail.setAttribute('class', 'input-styles-inp')
        inputEmail.setAttribute('id', 'input-email')
        labPass.setAttribute('class', 'input-styles')
        labPass.innerText = "Password:"
        inputPass.setAttribute('type', 'password')
        inputPass.setAttribute('class', 'input-styles-inp')
        inputPass.setAttribute('id', 'input-password')
        labPassCon.setAttribute('class', 'input-styles')
        labPassCon.innerText = "Confirm password:"
        inputPassCon.setAttribute('type', 'password')
        inputPassCon.setAttribute('class', 'input-styles-inp')
        inputPassCon.setAttribute('id', 'input-password-con')
        submitButton.setAttribute('type', 'submit')
        submitButton.setAttribute('value', 'Register')
        submitButton.setAttribute('class', 'input-styles-button')

        interface.appendChild(p)
        form.appendChild(labName)
        form.appendChild(inputName)
        form.appendChild(labEmail)
        form.appendChild(inputEmail)
        form.appendChild(labPass)
        form.appendChild(inputPass)
        form.appendChild(labPassCon)
        form.appendChild(inputPassCon)
        form.appendChild(br)
        form.appendChild(submitButton)
        interface.appendChild(form)

        submitButton.addEventListener('click', () => {
            let formData = {
                name: document.getElementById('input-name').value,
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

            fetch('http://localhost:3000/users', configObj)
            .then(function(response) {
                return response.json()
            })
            .then(function(object) {
                console.log(object)
            })
            .catch(function(error) {
                console.log(error.message)
            })
        })

    })

    mCreate.addEventListener('click', () => {
        clearElems('interface')
        interface.innerHTML = 'Create escape room here!'
    })

    mMy.addEventListener('click', () => {
        clearElems('interface')
        interface.innerHTML = 'My escape rooms!'
    })

    mTop.addEventListener('click', () => {
        clearElems('interface')
        interface.innerHTML = 'Top 100 escape rooms!'
    })

    mSearch.addEventListener('click', () => {
        clearElems('interface')
        interface.innerHTML = 'Search escape rooms!'
    })
    
    mAbout.addEventListener('click', () => {
        clearElems('interface')
        interface.innerHTML = 'This is the about page :)'

    })
    


})

