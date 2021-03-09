document.addEventListener("DOMContentLoaded", () => {
    let loggedNow = 0 //Checks if logged in - TODO: Find a better way
    
    //main menu
    const mLoginLogout = document.getElementById('menu-login-logout')
    const mRegister = document.getElementById('menu-register')
    const mCreate = document.getElementById('menu-create')
    const mMy = document.getElementById('menu-my')
    const mTop = document.getElementById('menu-top')
    const mSearch = document.getElementById('menu-search')
    const mAbout = document.getElementById('menu-about')
    const interface = document.getElementById('interface')
    
    //corners
    const cTopRight = document.getElementById('corner-top-right')

    function clearElems(elementId) {
        document.getElementById(elementId).innerHTML = ""
    }

    

    //main menu
    mLoginLogout.addEventListener('click', () => {
        clearElems('interface')

        const form = document.createElement('div')
        const p = document.createElement('p')
        const labName = document.createElement('label')
        const inputName = document.createElement('input')
        const labPass = document.createElement('label')
        const inputPass = document.createElement('input')
        const br = document.createElement('br')
        const submitButton = document.createElement('input')
        
        if (loggedNow === 0) {
            form.setAttribute('class', 'form')
            p.innerText = "Log in to your ScapeX account"
            labName.setAttribute('class', 'input-styles')
            labName.innerText = "Username:"
            inputName.setAttribute('type', 'text')
            inputName.setAttribute('class', 'input-styles-inp')
            inputName.setAttribute('id', 'input-name')
            labPass.setAttribute('class', 'input-styles')
            labPass.innerText = "Password:"
            inputPass.setAttribute('type', 'password')
            inputPass.setAttribute('class', 'input-styles-inp')
            inputPass.setAttribute('id', 'input-password')
            submitButton.setAttribute('type', 'submit')
            submitButton.setAttribute('value', 'Log In')
            submitButton.setAttribute('class', 'input-styles-button')
            interface.appendChild(p)
            form.appendChild(labName)
            form.appendChild(inputName)
            form.appendChild(labPass)
            form.appendChild(inputPass)
            form.appendChild(br)
            form.appendChild(submitButton)
            interface.appendChild(form)

            
            
    
            submitButton.addEventListener('click', () => {
                let formData = {
                    username: document.getElementById('input-name').value,
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
    
                fetch('http://localhost:3000/sessions/login', configObj)
                .then(function(response) {
                    return response.json()
                })
                .then(function(object) {
                    if (object.error) {
                        clearElems('corner-top-right')
                        let error = document.createElement('p')
                        error.innerHTML = object.error
                        error.setAttribute('class', 'warning')
                        cTopRight.appendChild(error)
                        cTopRight.removeAttribute('class')
                        cTopRight.setAttribute('class', 'corner-active')
                        setTimeout(() => {
                            clearElems('corner-top-right')
                            cTopRight.removeAttribute('class')
                            cTopRight.setAttribute('class', 'corner-inactive')
                        }, 6000)
                    } else {
                        clearElems('interface')
                        loggedNow = 1
                        interface.innerHTML = 'You logged in successfully.'
                        mLoginLogout.innerHTML = 'Logout'
                        mRegister.removeAttribute('menu-element')
                        mRegister.setAttribute('class', 'menu-element-off')
                    }
                    
                    
                    console.log(object)
                })
                .catch(function(error) {
                    console.log(error.message)
                })
            })
        } else if (loggedNow === 1) {
            loggedNow = 0
            mLoginLogout.innerHTML = 'Login'
            interface.innerHTML = "You successfully logged out"
            mRegister.removeAttribute('class', 'menu-element-off')
            mRegister.setAttribute('class', 'menu-element')
        }
    })

    mRegister.addEventListener('click', () => {
        
        
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

        if (loggedNow === 0) {
            clearElems('interface')
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
    
                fetch('http://localhost:3000/users', configObj)
                .then(function(response) {
                    return response.json()
                })
                .then(function(object) {
                    if (object.error) {
                        clearElems('corner-top-right')
                        let error = document.createElement('p')
                        error.innerHTML = object.error
                        error.setAttribute('class', 'warning')
                        cTopRight.appendChild(error)
                        cTopRight.removeAttribute('class')
                        cTopRight.setAttribute('class', 'corner-active')
                        setTimeout(() => {
                            clearElems('corner-top-right')
                            cTopRight.removeAttribute('class')
                            cTopRight.setAttribute('class', 'corner-inactive')
                        }, 6000)
                    } else {
                        clearElems('interface')
                        interface.innerHTML = 'Account created succesfully, please log in'
                    }
                    
                    
                    console.log(object)
                })
                .catch(function(error) {
                    console.log(error.message)
                })
            })
        } 
        

        

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

