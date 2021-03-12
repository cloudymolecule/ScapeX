document.addEventListener("DOMContentLoaded", () => {
    
    //main menu
    const mLoginLogout = document.getElementById('menu-login-logout')
    const mRegister = document.getElementById('menu-register')
    const mCreate = document.getElementById('menu-create')
    const mMy = document.getElementById('menu-my')
    const mTop = document.getElementById('menu-top')
    const mSearch = document.getElementById('menu-search')
    const mAbout = document.getElementById('menu-about')
    const interface = document.getElementById('interface')

    //hot corners
    const cTopRight = document.getElementById('corner-top-right')

    function clearElems(elementId) {
        document.getElementById(elementId).innerHTML = ""
    }

    // basic local authentication
    let loggedUser = false
    function loggedToggle(user = false) {
        if (loggedUser) {
            loggedUser = user
            mLoginLogout.innerHTML = 'Login'
            mRegister.removeAttribute('class', 'menu-element-off')
            mRegister.setAttribute('class', 'menu-element')
            mCreate.removeAttribute('menu-element')
            mCreate.setAttribute('class', 'menu-element-off')
            mMy.removeAttribute('menu-element')
            mMy.setAttribute('class', 'menu-element-off')
        } else if (!loggedUser) {
            loggedUser = user
            clearElems('interface')
            mLoginLogout.innerHTML = 'Logout'
            mRegister.removeAttribute('menu-element')
            mRegister.setAttribute('class', 'menu-element-off')
            mCreate.removeAttribute('class', 'menu-element-off')
            mCreate.setAttribute('class', 'menu-element')
            mMy.removeAttribute('class', 'menu-element-off')
            mMy.setAttribute('class', 'menu-element')
        }
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
        
        if (!loggedUser) {
            form.setAttribute('class', 'form')
            p.innerText = "Log in to your ScapeX account"
            labName.setAttribute('class', 'input-styles')
            labName.innerText = "Email or Username:"
            inputName.setAttribute('type', 'text')
            inputName.autocomplete = "off"
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
                        loggedToggle(object.data.attributes.id)
                        interface.innerHTML = `You logged in successfully, ${object.data.attributes.username}.`
                    }
                })
                .catch(function(error) {
                    console.log(error.message)
                })
            })
        } else if (loggedUser) {
            loggedToggle()
            interface.innerHTML = 'You logged out successfully.'
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

        if (!loggedUser) {
            clearElems('interface')
            form.setAttribute('class', 'form')
            p.innerText = "Create a ScapeX Account"
            labName.setAttribute('class', 'input-styles')
            labName.innerText = "Username:"
            inputName.setAttribute('type', 'text')
            inputName.autocomplete = "off"
            inputName.setAttribute('class', 'input-styles-inp')
            inputName.setAttribute('id', 'input-name')
            labEmail.setAttribute('class', 'input-styles')
            labEmail.innerText = "Email:"
            inputEmail.setAttribute('type', 'text')
            inputEmail.autocomplete = "off"
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
                    if (object.errors) {
                        clearElems('corner-top-right')
                        object.errors.forEach(error => {
                            let err = document.createElement('p')
                            err.innerHTML = error
                            err.setAttribute('class', 'warning')
                            cTopRight.appendChild(err)
                        })
                        cTopRight.removeAttribute('class')
                        cTopRight.setAttribute('class', 'corner-active')
                        setTimeout(() => {
                            clearElems('corner-top-right')
                            cTopRight.removeAttribute('class')
                            cTopRight.setAttribute('class', 'corner-inactive')
                        }, 6000)
                    } else {
                        loggedToggle(object.data.attributes.id)
                        interface.innerHTML = `Account created successfully, welcome ${object.data.attributes.username}.`
                    }
                })
                .catch(function(error) {
                    console.log(error.message)
                })
            })
        } 
        

        

    })

    mCreate.addEventListener('click', () => {
        if (loggedUser) { //re-enable this
            clearElems('interface')
            const p = document.createElement('p') //create room title
            p.innerText = 'Create Escape Room'

            const div = document.createElement('div') //create room form
            div.setAttribute('class', 'form')

            const labName = document.createElement('label') //room name
            labName.innerText = 'Room name:'
            labName.setAttribute('class', 'input-styles')
            const inputName = document.createElement('input')
            inputName.setAttribute('type', 'text')
            inputName.autocomplete = "off"
            inputName.setAttribute('class', 'input-styles-inp')
            inputName.setAttribute('id', 'input-name')

            const settingDiv = document.createElement('div')
            settingDiv.setAttribute('class', 'setting-div')

            const labSetting = document.createElement('label') //setting
            labSetting.innerText = 'Choose a setting:'
            labSetting.setAttribute('class', 'input-styles')
            const br = document.createElement('br')

            //setting fantasy
            const settingRadioLab1 = document.createElement('label') 
            const settingRadio1 = document.createElement('input')
            settingRadioLab1.innerText = 'Fantasy'
            settingRadio1.setAttribute('type', 'radio')
            settingRadio1.setAttribute('name', 'setting')
            settingRadio1.setAttribute('value', 'fantasy')
            settingRadio1.setAttribute('id', 'radio-fantasy')
            settingRadioLab1.setAttribute('class', 'input-styles')

            //setting dungeon
            const settingRadioLab2 = document.createElement('label')
            const settingRadio2 = document.createElement('input')
            settingRadioLab2.innerText = 'Dungeon'
            settingRadio2.setAttribute('type', 'radio')
            settingRadio2.setAttribute('name', 'setting')
            settingRadio2.setAttribute('value', 'dungeon')
            settingRadio2.setAttribute('id', 'radio-dungeon')
            settingRadioLab2.setAttribute('class', 'input-styles')

            //setting abandoned
            const settingRadioLab3 = document.createElement('label')
            const settingRadio3 = document.createElement('input')
            settingRadioLab3.innerText = 'Abandoned'
            settingRadio3.setAttribute('type', 'radio')
            settingRadio3.setAttribute('name', 'setting')
            settingRadio3.setAttribute('value', 'abandoned')
            settingRadio3.setAttribute('id', 'radio-abandoned')
            settingRadioLab3.setAttribute('class', 'input-styles')

            //setting haunted
            const settingRadioLab4 = document.createElement('label')
            const settingRadio4 = document.createElement('input')
            settingRadioLab4.innerText = 'Haunted'
            settingRadio4.setAttribute('type', 'radio')
            settingRadio4.setAttribute('name', 'setting')
            settingRadio4.setAttribute('value', 'haunted')
            settingRadio4.setAttribute('id', 'radio-haunted')
            settingRadioLab4.setAttribute('class', 'input-styles')

            //setting generic
            const settingRadioLab5 = document.createElement('label')
            const settingRadio5 = document.createElement('input')
            settingRadioLab5.innerText = 'Generic'
            settingRadio5.setAttribute('type', 'radio')
            settingRadio5.setAttribute('name', 'setting')
            settingRadio5.setAttribute('value', 'generic')
            settingRadio5.setAttribute('id', 'radio-generic')
            settingRadioLab5.setAttribute('class', 'input-styles')

            const div2 = document.createElement('div')
            div2.setAttribute('class', 'room-form')

            const labTime = document.createElement('label')
            labTime.innerText = 'Choose a time limit in minutes (60 max):'
            labTime.setAttribute('class', 'input-styles')
            const inputTime = document.createElement('input')
            inputTime.setAttribute('type', 'number')
            inputTime.setAttribute('maxlength', '2')
            inputTime.autocomplete = "off"
            inputTime.setAttribute('class', 'input-styles-inp-num')
            inputTime.setAttribute('id', 'input-time-limit')

            const labSuccess = document.createElement('label')
            labSuccess.innerText = 'Room completion message:'
            labSuccess.setAttribute('class', 'input-styles')
            const inputSuccess = document.createElement('textarea')
            inputSuccess.setAttribute('cols', '3')
            inputSuccess.setAttribute('maxlength', '255')
            inputSuccess.autocomplete = "off"
            inputSuccess.setAttribute('class', 'input-styles-inp-success')
            inputSuccess.setAttribute('id', 'input-completed-message')

            const labAttempts = document.createElement('label')
            labAttempts.innerText = 'Number of attempts allowed (10 max):'
            labAttempts.setAttribute('class', 'input-styles')
            const inputAttempts = document.createElement('input')
            inputAttempts.setAttribute('type', 'number')
            inputAttempts.setAttribute('maxlength', '2')
            inputAttempts.autocomplete = "off"
            inputAttempts.setAttribute('class', 'input-styles-inp-num')
            inputAttempts.setAttribute('id', 'input-attempts-allowed')

            const labNumOfObj = document.createElement('label')
            labNumOfObj.innerText = 'Number of objects (50 max):'
            labNumOfObj.setAttribute('class', 'input-styles')
            const inputNumOfObj = document.createElement('input')
            inputNumOfObj.setAttribute('type', 'text')
            inputNumOfObj.setAttribute('maxlength', '2')
            inputNumOfObj.autocomplete = "off"
            inputNumOfObj.setAttribute('class', 'input-styles-inp-num')
            inputNumOfObj.setAttribute('id', 'input-obj-room')
            
            const labReqObj = document.createElement('label')
            labReqObj.innerText = 'Number of objects to exit room (3 max):'
            labReqObj.setAttribute('class', 'input-styles')
            const inputReqObj = document.createElement('input')
            inputReqObj.setAttribute('type', 'number')
            inputReqObj.setAttribute('maxlength', '1')
            inputReqObj.autocomplete = "off"
            inputReqObj.setAttribute('class', 'input-styles-inp-num')
            inputReqObj.setAttribute('id', 'input-obj-exit')
            
            const labLock = document.createElement('label')
            labLock.innerText = 'Number or phrase required to exit the room'
            labLock.setAttribute('class', 'input-styles')
            const inputLock = document.createElement('input')
            inputLock.setAttribute('type', 'input')
            inputLock.autocomplete = "off"
            inputLock.setAttribute('class', 'input-styles-inp')
            inputLock.setAttribute('id', 'input-lock')
            
            const submitButton = document.createElement('input')
            submitButton.setAttribute('type', 'submit')
            submitButton.setAttribute('value', 'Create')
            submitButton.setAttribute('class', 'input-styles-button')

            interface.appendChild(p)
            interface.appendChild(br)
            div.appendChild(labName)
            div.appendChild(inputName)
            interface.appendChild(br)
            interface.appendChild(div)
            interface.appendChild(labSetting)
           
            settingDiv.appendChild(settingRadio1)
            settingDiv.appendChild(settingRadioLab1)
            
            settingDiv.appendChild(settingRadio2)
            settingDiv.appendChild(settingRadioLab2)
            
            settingDiv.appendChild(settingRadio3)
            settingDiv.appendChild(settingRadioLab3)
            
            settingDiv.appendChild(settingRadio4)
            settingDiv.appendChild(settingRadioLab4)
            
            settingDiv.appendChild(settingRadio5)
            settingDiv.appendChild(settingRadioLab5)
            
            interface.appendChild(settingDiv)

            div2.appendChild(labTime)
            div2.appendChild(inputTime)
            div2.appendChild(labSuccess)
            div2.appendChild(inputSuccess)
            div2.appendChild(labAttempts)
            div2.appendChild(inputAttempts)
            div2.appendChild(labNumOfObj)
            div2.appendChild(inputNumOfObj)
            div2.appendChild(labReqObj)
            div2.appendChild(inputReqObj)
            div2.appendChild(labLock)
            div2.appendChild(inputLock)
            
            interface.appendChild(div2)
            interface.appendChild(br)
            interface.appendChild(submitButton)

            submitButton.addEventListener('click', () => {
                
                

                
                
                let formData = {
                    user_id: loggedUser,
                    name: document.getElementById('input-name').value,
                    setting: document.querySelector('input[name="setting"]:checked').value,
                    time_limit: document.getElementById('input-time-limit').value,
                    completed_message: document.getElementById('input-completed-message').value,
                    attempts_allowed: document.getElementById('input-attempts-allowed').value,
                    times_completed: 0,
                    obj_room: document.getElementById('input-obj-room').value,
                    obj_exit: document.getElementById('input-obj-exit').value,
                    lock: document.getElementById('input-lock').value
                }

                let configObj = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formData)
                }
                
                fetch('http://localhost:3000/rooms', configObj)
                .then(function(response) {
                    return response.json()
                })
                .then(function(object) {
                    if (object.errors) {
                        clearElems('corner-top-right')
                        object.errors.forEach(error => {
                            let err = document.createElement('p')
                            err.innerHTML = error
                            err.setAttribute('class', 'warning')
                            cTopRight.appendChild(err)
                        })
                        cTopRight.removeAttribute('class')
                        cTopRight.setAttribute('class', 'corner-active')
                        setTimeout(() => {
                            clearElems('corner-top-right')
                            cTopRight.removeAttribute('class')
                            cTopRight.setAttribute('class', 'corner-inactive')
                        }, 6000)
                    } else {
                        // loggedToggle(object.data.attributes.id)
                        // interface.innerHTML = ``
                        console.log(object)
                    }
                })
                .catch(function(error) {
                    console.log(error.message)
                })
            })
            
        }
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

