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

    //html functions
    function clearElems(elementId) {
        document.getElementById(elementId).innerHTML = ""
    }

    function elementBuilder(element, innTxt, autoComp, attributes) {
        const elem = document.createElement(element)
        if (attributes) {
            for (const [key, value] of Object.entries(attributes)) {
                elem.setAttribute(key, value)
            }
        }
        if (innTxt != null) {
            elem.innerText = innTxt
        }
        if (autoComp != null) {
            elem.autocomplete = 'off'
        }
        return elem
    }

    function massAppend(mainElem, arrOfElems) {
        for (let i = 0; i < arrOfElems.length; i++) {
            mainElem.appendChild(arrOfElems[i])    
        } 
    }

    function switchAttr(element, attr, newAttr) {
        element.removeAttribute(attr)
        element.setAttribute(attr, newAttr)
    }

    // basic local authentication
    let loggedUser = false
    function loggedToggle(user = false) {
        if (loggedUser) {
            loggedUser = user
            mLoginLogout.innerText = 'Login'
            switchAttr(mRegister, 'class', 'menu-element')
            switchAttr(mCreate, 'class', 'menu-element-off')           
            switchAttr(mMy, 'class', 'menu-element-off')
            
        } else if (!loggedUser) {
            loggedUser = user
            clearElems('interface')
            mLoginLogout.innerText = 'Logout'
            switchAttr(mRegister, 'class', 'menu-element-off')          
            switchAttr(mCreate, 'class', 'menu-element')
            switchAttr(mMy, 'class', 'menu-element')
        }
    }

    //main menu
    mLoginLogout.addEventListener('click', () => {
        clearElems('interface')
        const form = elementBuilder('div', null, null, {'class':'form'})
        const p = elementBuilder('p', 'Log in to your ScapeX account')
        const labName = elementBuilder('label', 'Email or Username:', null, {'class':'input-styles'})
        const inputName = elementBuilder('input', null, 'off', {'type':'text', 'class':'input-styles-inp', 'id':'input-name'})
        const labPass = elementBuilder('label', 'Password:', null, {'class':'input-styles'} )
        const inputPass = elementBuilder('input', null, 'off', {'type':'password', 'class':'input-styles-inp', 'id':'input-password'})
        const submitButton = elementBuilder('input', null, null, {'type':'submit', 'value':'Log In', 'class':'input-styles-button'})
        const br = document.createElement('br')
        
        if (!loggedUser) {
            interface.appendChild(p)
            massAppend(form, [labName, inputName, labPass, inputPass, br, submitButton])
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
                        const error = elementBuilder('p', object.error, null, {'class':'warning'})
                        cTopRight.appendChild(error)
                        switchAttr(cTopRight, 'class', 'corner-active')
                        setTimeout(() => {
                            clearElems('corner-top-right')
                            switchAttr(cTopRight, 'class', 'corner-inactive')
                        }, 6000)
                    } else {
                        loggedToggle(object.data.attributes.id)
                        interface.innerText = `You logged in successfully, ${object.data.attributes.username}.`
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

    mRegister.addEventListener('click', () => {
        const form = elementBuilder('div', null, null, {'class':'form'})
        const p = elementBuilder('p', "Create a ScapeX Account", null)
        const labName = elementBuilder('label', 'Username:', null, {'class':'input-styles'})
        const inputName = elementBuilder('input', null, 'off', {'type':'text', 'class':'input-styles-inp', 'id':'input-name'})
        const labEmail = elementBuilder('label', 'Email:', null, {'class':'input-styles'})
        const inputEmail = elementBuilder('input', null, 'off', {'type':'text', 'class':'input-styles-inp', 'id':'input-email'})
        const labPass = elementBuilder('label', 'Password:', null, {'class':'input-styles'})
        const inputPass = elementBuilder('input', null, null, {'type':'password', 'class':'input-styles-inp', 'id':'input-password'})
        const labPassCon = elementBuilder('label', 'Confirm password:', null, {'class':'input-styles'})
        const inputPassCon = elementBuilder('input', null, null, {'type':'password', 'class':'input-styles-inp', 'id':'input-password-con'})
        const submitButton = elementBuilder('input', null, null, {'type':'submit', 'value':'Register', 'class':'input-styles-button'})
        const br = document.createElement('br')

        if (!loggedUser) {
            clearElems('interface')
            interface.appendChild(p)
            massAppend(form, [labName, inputName, labEmail, inputEmail, labPass, inputPass, labPassCon, inputPassCon, br, submitButton])
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
                        const error = elementBuilder('p', object.error, null, {'class':'warning'})
                        cTopRight.appendChild(error)
                        switchAttr(cTopRight, 'class', 'corner-active')
                        setTimeout(() => {
                            clearElems('corner-top-right')
                            switchAttr(cTopRight, 'class', 'corner-inactive')
                        }, 8000)
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
        if (loggedUser) {
            clearElems('interface')
            const p = elementBuilder('p', 'Create Escape Room', null)
            const div = elementBuilder('div', null, null, {'class':'form'})
            const labName = elementBuilder('label', 'Room name:', null, {'class':'input-styles'})
            const inputName = elementBuilder('input', null, 'off', {'type':'text', 'class':'input-styles-inp', 'id':'input-name'})
            const settingDiv = elementBuilder('div', null, null, {'class':'setting-div'})
            const labSetting = elementBuilder('label', 'Choose a setting:', null, {'class':'input-styles'})
            const settingRadioLab1 = elementBuilder('label', 'Fantasy', null, {'class':'input-styles'})
            const settingRadio1 = elementBuilder('input', null, null, {'type':'radio', 'name':'setting', 'value':'fantasy', 'checked':'checked', 'id':'radio-fantasy'})
            const settingRadioLab2 = elementBuilder('label', 'Dungeon', null, {'class':'input-styles'})
            const settingRadio2 = elementBuilder('input', null, null, {'type':'radio', 'name':'setting', 'value':'fantasy', 'id':'radio-dungeon'})
            const settingRadioLab3 = elementBuilder('label', 'Abandoned', null, {'class':'input-styles'})
            const settingRadio3 = elementBuilder('input', null, null, {'type':'radio', 'name':'setting', 'value':'fantasy', 'id':'radio-abandoned'})
            const settingRadioLab4 = elementBuilder('label', 'Haunted', null, {'class':'input-styles'})
            const settingRadio4 = elementBuilder('input', null, null, {'type':'radio', 'name':'setting', 'value':'fantasy', 'id':'radio-haunted'})
            const settingRadioLab5 = elementBuilder('label', 'Generic', null, {'class':'input-styles'})
            const settingRadio5 = elementBuilder('input', null, null, {'type':'radio', 'name':'setting', 'value':'fantasy', 'id':'radio-generic'})
            const div2 = elementBuilder('div', null, null, {'class':'room-form'})
            const labTime = elementBuilder('label', 'Choose a time limit in minutes (60 max):', null, {'class':'input-styles'})
            const inputTime = elementBuilder('input', null, 'off', {'type':'text', 'maxlength':'2', 'class':'input-styles-inp-num', 'id':'input-time-limit'})
            const labSuccess = elementBuilder('label', 'Room completion message:', null, {'class':'input-styles'})
            const inputSuccess = elementBuilder('textarea', null, 'off', {'cols':'3', 'maxlength':'255', 'class':'input-styles-inp-success', 'id':'input-completed-message'})
            const labAttempts = elementBuilder('label', 'Number of attempts allowed (10 max):', null, {'class':'input-styles'})
            const inputAttempts = elementBuilder('input', null, 'off', {'type':'text', 'maxlength':'2', 'class':'input-styles-inp-num', 'id':'input-attempts-allowed'})
            const labNumOfObj = elementBuilder('label', 'Number of objects (50 max):', null, {'class':'input-styles'})
            const inputNumOfObj = elementBuilder('input', null, 'off', {'type':'text', 'maxlength':'2', 'class':'input-styles-inp-num', 'id':'input-obj-room'})
            const labReqObj = elementBuilder('label', 'Number of objects to exit room (3 max):', null, {'class':'input-styles'})
            const inputReqObj = elementBuilder('input', null, 'off', {'type':'text', 'maxlength':'1', 'class':'input-styles-inp-num', 'id':'input-obj-exit'})
            const labLock = elementBuilder('label', 'Number or phrase required to exit the room', null, {'class':'input-styles'})
            const inputLock = elementBuilder('input', null, 'off', {'type':'text', 'class':'input-styles-inp', 'id':'input-lock'})
            const submitButton = elementBuilder('input', null, null, {'type':'submit', 'value':'Create', 'class':'input-styles-button'})
            const br = document.createElement('br')
            massAppend(div, [labName, inputName])
            massAppend(interface, [p, br, br, div, labSetting])
            massAppend(settingDiv, [
                settingRadio1, settingRadioLab1, settingRadio2,
                settingRadioLab2, settingRadio3, settingRadioLab3,
                settingRadio4, settingRadioLab4, settingRadio5, settingRadioLab5
            ])
            interface.appendChild(settingDiv)
            massAppend(div2, [
                labTime, inputTime, labSuccess, inputSuccess, labAttempts, inputAttempts,
                labNumOfObj, inputNumOfObj, labReqObj, inputReqObj, labLock, inputLock
            ])
            massAppend(interface, [div2, br, submitButton])
            
            submitButton.addEventListener('click', () => {
                
                let formData = {
                    user_id: loggedUser,
                    name: document.getElementById('input-name').value,
                    setting: document.querySelector('input[name="setting"]:checked').value,
                    time_limit: document.getElementById('input-time-limit').value,
                    completed_message: document.getElementById('input-completed-message').value,
                    attempts_allowed: document.getElementById('input-attempts-allowed').value,
                    times_completed: 0,
                    attempts: 0,
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
                        const error = elementBuilder('p', object.error, null, {'class':'warning'})
                        cTopRight.appendChild(error)
                        switchAttr(cTopRight, 'class', 'corner-active')
                        setTimeout(() => {
                            clearElems('corner-top-right')
                            switchAttr(cTopRight, 'class', 'corner-inactive')
                        }, 8000)
                    } else {                                
                        clearElems('interface')
                        const pItemCreate = elementBuilder('p', 'Escape Room Items', null)
                        interface.appendChild(pItemCreate)
                        const itemsContainer = document.createElement('div')
                        // div.setAttribute('class', 'form')

                        interface.appendChild(itemsContainer)

                        for (let i = 0; i < object.data.attributes.obj_room; i++) {   // TODO: create items 
                            // t.string "name"
                            // t.string "description"
                            // t.string "looked_message"
                            // t.boolean "take"
                            // t.string "take_message"
                            // t.boolean "closed"
                            // t.string "closed_message"
                            // t.boolean "talk"
                            // t.string "talk_message"
                            // t.boolean "locked"
                            // t.string "locked_message"
                            // t.string "opened_message"
                            // t.integer "room_id"
                            const itemDiv = document.createElement('div')

                            const labItemName = document.createElement('label') //item name
                            labItemName.innerText = 'Name:'
                            // labItemName.setAttribute('class', 'input-styles')
                            const inputItemName = document.createElement('input')
                            inputItemName.setAttribute('type', 'text')
                            inputItemName.autocomplete = "off"
                            // inputItemName.setAttribute('class', 'input-styles-inp')
                            // inputItemName.setAttribute('id', 'input-name')

                            const labItemDesc = document.createElement('label') //description
                            labItemDesc.innerText = 'Name:'
                            // labItemDesc.setAttribute('class', 'input-styles')
                            const inputItemDesc = document.createElement('input')
                            inputItemDesc.setAttribute('type', 'text')
                            inputItemDesc.autocomplete = "off"
                            // inputItemDesc.setAttribute('class', 'input-styles-inp')
                            // inputItemDesc.setAttribute('id', 'input-name')

                            const labItemLook = document.createElement('label') //looked_message
                            labItemLook.innerText = 'Name:'
                            // labItemLook.setAttribute('class', 'input-styles')
                            const inputItemLook = document.createElement('input')
                            inputItemLook.setAttribute('type', 'text')
                            inputItemLook.autocomplete = "off"
                            // inputItemLook.setAttribute('class', 'input-styles-inp')
                            // inputItemLook.setAttribute('id', 'input-name')

                            const labiItemTake = document.createElement('label') //take radio
                            labiItemTake.innerText = 'Choose a setting:'
                            labiItemTake.setAttribute('class', 'input-styles')

                            const lab = document.createElement('label') //take yes
                            const settingRadio1 = document.createElement('input')
                            settingRadioLab1.innerText = 'Fantasy'
                            settingRadio1.setAttribute('type', 'radio')
                            settingRadio1.setAttribute('name', 'setting')
                            settingRadio1.setAttribute('value', 'fantasy')
                            settingRadio1.setAttribute('checked', 'checked')
                            settingRadio1.setAttribute('id', 'radio-fantasy')
                            settingRadioLab1.setAttribute('class', 'input-styles')

                            const settingRadioLab1 = document.createElement('label') //take no
                            const settingRadio1 = document.createElement('input')
                            settingRadioLab1.innerText = 'Fantasy'
                            settingRadio1.setAttribute('type', 'radio')
                            settingRadio1.setAttribute('name', 'setting')
                            settingRadio1.setAttribute('value', 'fantasy')
                            settingRadio1.setAttribute('checked', 'checked')
                            settingRadio1.setAttribute('id', 'radio-fantasy')
                            settingRadioLab1.setAttribute('class', 'input-styles')

                            const labItemName = document.createElement('label') //take_message (conditional)
                            labItemName.innerText = 'Name:'
                            // labItemName.setAttribute('class', 'input-styles')
                            const inputItemName = document.createElement('input')
                            inputItemName.setAttribute('type', 'text')
                            inputItemName.autocomplete = "off"
                            // inputItemName.setAttribute('class', 'input-styles-inp')
                            // inputItemName.setAttribute('id', 'input-name')

                            const labSetting = document.createElement('label') //closed radio
                            labSetting.innerText = 'Choose a setting:'
                            labSetting.setAttribute('class', 'input-styles')

                            const settingRadioLab1 = document.createElement('label') //closed yes
                            const settingRadio1 = document.createElement('input')
                            settingRadioLab1.innerText = 'Fantasy'
                            settingRadio1.setAttribute('type', 'radio')
                            settingRadio1.setAttribute('name', 'setting')
                            settingRadio1.setAttribute('value', 'fantasy')
                            settingRadio1.setAttribute('checked', 'checked')
                            settingRadio1.setAttribute('id', 'radio-fantasy')
                            settingRadioLab1.setAttribute('class', 'input-styles')

                            const settingRadioLab1 = document.createElement('label') //closed no
                            const settingRadio1 = document.createElement('input')
                            settingRadioLab1.innerText = 'Fantasy'
                            settingRadio1.setAttribute('type', 'radio')
                            settingRadio1.setAttribute('name', 'setting')
                            settingRadio1.setAttribute('value', 'fantasy')
                            settingRadio1.setAttribute('checked', 'checked')
                            settingRadio1.setAttribute('id', 'radio-fantasy')
                            settingRadioLab1.setAttribute('class', 'input-styles')

                            const labItemName = document.createElement('label') //closed_message (conditional)
                            labItemName.innerText = 'Name:'
                            // labItemName.setAttribute('class', 'input-styles')
                            const inputItemName = document.createElement('input')
                            inputItemName.setAttribute('type', 'text')
                            inputItemName.autocomplete = "off"
                            // inputItemName.setAttribute('class', 'input-styles-inp')
                            // inputItemName.setAttribute('id', 'input-name')

                            const labSetting = document.createElement('label') //talk radio
                            labSetting.innerText = 'Choose a setting:'
                            labSetting.setAttribute('class', 'input-styles')

                            const settingRadioLab1 = document.createElement('label') //talk yes
                            const settingRadio1 = document.createElement('input')
                            settingRadioLab1.innerText = 'Fantasy'
                            settingRadio1.setAttribute('type', 'radio')
                            settingRadio1.setAttribute('name', 'setting')
                            settingRadio1.setAttribute('value', 'fantasy')
                            settingRadio1.setAttribute('checked', 'checked')
                            settingRadio1.setAttribute('id', 'radio-fantasy')
                            settingRadioLab1.setAttribute('class', 'input-styles')

                            const settingRadioLab1 = document.createElement('label') //talk no
                            const settingRadio1 = document.createElement('input')
                            settingRadioLab1.innerText = 'Fantasy'
                            settingRadio1.setAttribute('type', 'radio')
                            settingRadio1.setAttribute('name', 'setting')
                            settingRadio1.setAttribute('value', 'fantasy')
                            settingRadio1.setAttribute('checked', 'checked')
                            settingRadio1.setAttribute('id', 'radio-fantasy')
                            settingRadioLab1.setAttribute('class', 'input-styles')

                            const labItemName = document.createElement('label') //talk_message (conditional)
                            labItemName.innerText = 'Name:'
                            // labItemName.setAttribute('class', 'input-styles')
                            const inputItemName = document.createElement('input')
                            inputItemName.setAttribute('type', 'text')
                            inputItemName.autocomplete = "off"
                            // inputItemName.setAttribute('class', 'input-styles-inp')
                            // inputItemName.setAttribute('id', 'input-name')



                            const labSetting = document.createElement('label') //locked radio
                            labSetting.innerText = 'Choose a setting:'
                            labSetting.setAttribute('class', 'input-styles')

                            const settingRadioLab1 = document.createElement('label') //locked yes
                            const settingRadio1 = document.createElement('input')
                            settingRadioLab1.innerText = 'Fantasy'
                            settingRadio1.setAttribute('type', 'radio')
                            settingRadio1.setAttribute('name', 'setting')
                            settingRadio1.setAttribute('value', 'fantasy')
                            settingRadio1.setAttribute('checked', 'checked')
                            settingRadio1.setAttribute('id', 'radio-fantasy')
                            settingRadioLab1.setAttribute('class', 'input-styles')

                            const settingRadioLab1 = document.createElement('label') //locked no
                            const settingRadio1 = document.createElement('input')
                            settingRadioLab1.innerText = 'Fantasy'
                            settingRadio1.setAttribute('type', 'radio')
                            settingRadio1.setAttribute('name', 'setting')
                            settingRadio1.setAttribute('value', 'fantasy')
                            settingRadio1.setAttribute('checked', 'checked')
                            settingRadio1.setAttribute('id', 'radio-fantasy')
                            settingRadioLab1.setAttribute('class', 'input-styles')

                            const labItemName = document.createElement('label') //locked_message (conditional)
                            labItemName.innerText = 'Name:'
                            // labItemName.setAttribute('class', 'input-styles')
                            const inputItemName = document.createElement('input')
                            inputItemName.setAttribute('type', 'text')
                            inputItemName.autocomplete = "off"
                            // inputItemName.setAttribute('class', 'input-styles-inp')
                            // inputItemName.setAttribute('id', 'input-name')
                            itemDiv.appendChild(labItemName)
                            itemDiv.appendChild(inputItemName)
                            itemsContainer.appendChild(itemDiv)



                            
                            
                        }
                        function itemsCreator() {
                            class Item {
                                constructor(
                                    name,
                                    description,
                                    looked_message,
                                    take,
                                    take_message,
                                    closed,
                                    closed_message,
                                    talk,
                                    talk_message,
                                    locked,
                                    locked_message,
                                    opened_message,
                                    room_id
                                ) {
                                    this.name = object.data.attributes.name
                                    this.description = object.data.attributes.description
                                    this.looked_message = object.data.attributes.looked_message
                                    this.take = object.data.attributes.take
                                    this.take_message = object.data.attributes.take_message
                                    this.closed = object.data.attributes.closed
                                    this.closed_message = object.data.attributes.closed_message
                                    this.talk = object.data.talk
                                    this.talk_message = object.data.attributes.talk_message
                                    this.locked = object.data.attributes.locked
                                    this.locked_message = object.data.attributes.locked_message
                                    this.opened_message = object.data.attributes.opened_message
                                    this.room_id = object.data.attributes.room_id
                                }
                            }
                        }
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

