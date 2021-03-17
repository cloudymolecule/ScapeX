document.addEventListener("DOMContentLoaded", () => {
    
    //main menu
    const mLoginLogout = document.getElementById('menu-login-logout')
    const mRegister = document.getElementById('menu-register')
    const mCreate = document.getElementById('menu-create')
    const mMy = document.getElementById('menu-my')
    const mTop = document.getElementById('menu-top')
    const mSearch = document.getElementById('menu-search')
    const mPlay = document.getElementById('menu-play')
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
                        clearElems('corner-top-right')
                        object.errors.forEach(error => {
                            const errorRegis = elementBuilder('p', error, null, {'class':'warning'})
                            switchAttr(cTopRight, 'class', 'corner-active')
                            cTopRight.appendChild(errorRegis)
                        })
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
        if (!loggedUser) { //change!
            interface.innerHTML = `
                <form id="form">
                    <p>Create Escape Room</p>
                    <label class="input-styles">Room Name:</label>
                    <input type="text" class="input-styles-inp" id="input-name"><br />
                    <label class="input-styles">Choose a setting:</label><br />
                    <div class="setting-div">
                        <label class="input-styles">Fantasy</label>
                        <input type="radio" name="setting" value="fantasy" checked="checked" id="radio-fantasy">
                        <label class="input-styles">Dungeon</label>
                        <input type="radio" name="setting" value="fantasy" id="radio-dungeon">
                        <label class="input-styles">Abandoned</label>
                        <input type="radio" name="setting" value="fantasy" id="radio-abandoned">
                        <label class="input-styles">Haunted</label>
                        <input type="radio" name="setting" value="fantasy" id="radio-haunted">
                        <label class="input-styles">Generic</label>
                        <input type="radio" name="setting" value="fantasy" id="radio-generic">
                    </div><br />
                    <label class="input-styles">Choose a time limit in minutes (60 max):</label>
                    <input type="text" maxlength="2" class="input-styles-inp-num" id="input-time-limit"><br />
                    <label class="input-styles">Room completion message:</label><br />
                    <textarea class="input-styles-inp-success" id="input-completed-message" cols="50" rows="5" maxlength="255"></textarea><br />
                    <label class="input-styles">Number of attempts allowed (10 max):</label>
                    <input type="text" maxlength="2" class="input-styles-inp-num" id="input-attempts-allowed"><br />  
                    <label class="input-styles">Number of objects (50 max):</label>
                    <input type="text" maxlength="2" class="input-styles-inp-num" id="input-obj-room"><br />
                    <label class="input-styles">Number of objects to exit room (3 max):</label>
                    <input type="text" maxlength="1" class="input-styles-inp-num" id="input-obj-exit"><br />  
                    <label class="input-styles">Number or phrase required to exit the room:</label>
                    <input type="text" class="input-styles-inp" id="input-lock"><br /><br />  
                    <input type="submit" value="Create" class="input-styles-button" id="submit-button">
                </form>`
            const form = document.getElementById('form')
            const submitButton = document.getElementById('submit-button')
            
            submitButton.addEventListener('click', (e) => {
                e.preventDefault()
                let formData = {
                    user_id: 1,//loggedUser, change!
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
                
                fetch('http://localhost:3000/rooms/new', configObj)
                .then(function(response) {
                    return response.json()
                })
                .then(function(object) {
                    if (object.errors) {
                        clearElems('corner-top-right')
                        object.errors.forEach(error => {
                            const errorRoom = elementBuilder('p', error, null, {'class':'warning'})
                            switchAttr(cTopRight, 'class', 'corner-active')
                            cTopRight.appendChild(errorRoom)
                        })
                        setTimeout(() => {
                            clearElems('corner-top-right')
                            switchAttr(cTopRight, 'class', 'corner-inactive')
                        }, 8000)
                    } else {                                
                        let currentRoom = object.data.attributes.id
                        //add room success message
                        interface.innerHTML = `
                            <p>Escape Room Items</p>
                            <div id="items" class="items-alternate"></div>`
                        const items = document.getElementById('items')
                        
                        for (let i = 0; i < object.data.attributes.obj_room; i++) {   // TODO: create items 
                            const itemFormElem = elementBuilder('form', null, null, {'class':'item-form', 'id':'item-form'})
                            itemFormElem.innerHTML = `
                                    <label class="input-styles">Name:</label>
                                    <input type="text" class="input-styles-inp" id="name-${i}"><br />

                                    <label class="input-styles">Description:</label>
                                    <input type="text" class="input-styles-inp" id="description-${i}"><br />

                                    <label class="input-styles">When looked at:</label>
                                    <input type="text" class="input-styles-inp" id="looked-${i}"><br />

                                    <label class="input-styles">Can it be taken?:</label>
                                    <input type="radio" name="can-it-be-taken" value="no" checked="checked" id="radio-can-it-be-taken-no-${i}">
                                    <label class="input-styles">no</label>
                                    <input type="radio" name="can-it-be-taken" value="yes" id="radio-can-it-be-taken-yes-${i}">
                                    <label class="input-styles">yes</label><br />
                                    <div id="can-it-be-taken-${i}"></div>

                                    <label class="input-styles">Is it closed?:</label>
                                    <input type="radio" name="is-it-closed" value="no" checked="checked" id="radio-is-it-closed-no-${i}">
                                    <label class="input-styles">no</label>
                                    <input type="radio" name="is-it-closed" value="yes" id="radio-is-it-closed-yes-${i}">
                                    <label class="input-styles">yes</label><br />
                                    <div id="is-it-closed-${i}"></div>
                                        
                                    <label class="input-styles">Can it talk:</label>
                                    <input type="radio" name="can-it-talk" value="no" checked="checked" id="radio-can-it-talk-no-${i}">
                                    <label class="input-styles">no</label>
                                    <input type="radio" name="can-it-talk" value="yes" id="radio-can-it-talk-yes-${i}">
                                    <label class="input-styles">yes</label><br />
                                    <div id="can-it-talk-${i}"></div>

                                    <label class="input-styles">Is it locked:</label>
                                    <input type="radio" name="is-it-locked" value="no" checked="checked" id="radio-is-it-locked-no-${i}">
                                    <label class="input-styles">no</label>
                                    <input type="radio" name="is-it-locked" value="yes" id="radio-is-it-locked-yes-${i}">
                                    <label class="input-styles">yes</label><br />
                                    <div id="is-it-locked-${i}"></div>
                                    <br />
                                    <input type="submit" value="Save" class="input-styles-button" id="save-button-${i}">`
                                    


                            items.appendChild(itemFormElem)

                            const saveButton = document.getElementById(`save-button-${i}`)
                            saveButton.addEventListener('click', function(e) {e.preventDefault()})
                            const canItBeTaken = document.getElementById(`can-it-be-taken-${i}`)
                            const radioCanItBeTakenYes = document.getElementById(`radio-can-it-be-taken-yes-${i}`)
                            const radioCanItBeTakenNo = document.getElementById(`radio-can-it-be-taken-no-${i}`)
                            let canItBeTakenYesNo = false
                            radioCanItBeTakenYes.addEventListener('change', function(e) {
                                canItBeTakenYesNo = true
                                clearElems(`can-it-be-taken-${i}`)
                                const messageDiv = document.createElement('div')
                                messageDiv.innerHTML = `
                                    <label class="input-styles">Message when taken:</label>
                                    <textarea class="input-styles-inp" id="take-message${i}" cols="20" rows="2" maxlength="255"></textarea><br />
                                `
                                canItBeTaken.appendChild(messageDiv)
                            })

                            radioCanItBeTakenNo.addEventListener('change', function(e) {
                                canItBeTakenYesNo = false
                                clearElems(`can-it-be-taken-${i}`)
                            })

                            const isItClosed = document.getElementById(`is-it-closed-${i}`)
                            const radioIsItClosedYes = document.getElementById(`radio-is-it-closed-yes-${i}`)
                            const radioIsItClosedNo = document.getElementById(`radio-is-it-closed-no-${i}`)
                            let isItClosedYesNo = false
                            radioIsItClosedYes.addEventListener('change', function(e) {
                                isItClosedYesNo = true
                                clearElems(`is-it-closed-${i}`)
                                const messageDiv = document.createElement('div')
                                messageDiv.innerHTML = `
                                    <label class="input-styles">Message when closed:</label>
                                    <textarea class="input-styles-inp" id="closed-message${i}" cols="20" rows="2" maxlength="255"></textarea><br />
                                `
                                isItClosed.appendChild(messageDiv)
                            })

                            radioIsItClosedNo.addEventListener('change', function(e) {
                                isItClosedYesNo = false
                                clearElems(`is-it-closed-${i}`)
                            })

                            const canItTalk = document.getElementById(`can-it-talk-${i}`)
                            const radioCanItTalkYes = document.getElementById(`radio-can-it-talk-yes-${i}`)
                            const radioCanItTalkNo = document.getElementById(`radio-can-it-talk-no-${i}`)
                            let canItTalkYesNo = false
                            radioCanItTalkYes.addEventListener('change', function(e) {
                                canItTalkYesNo = true
                                clearElems(`can-it-talk-${i}`)
                                const messageDiv = document.createElement('div')
                                messageDiv.innerHTML = `
                                    <label class="input-styles">Can it talk:</label>
                                    <textarea class="input-styles-inp" id="talk-message${i}" cols="20" rows="2" maxlength="255"></textarea><br />
                                `
                                canItTalk.appendChild(messageDiv)
                            })

                            radioCanItTalkNo.addEventListener('change', function(e) {
                                canItTalkYesNo = false
                                clearElems(`can-it-talk-${i}`)
                            })
                            
                            const IsItLocked = document.getElementById(`is-it-locked-${i}`)
                            const radioIsItLockedYes = document.getElementById(`radio-is-it-locked-yes-${i}`)
                            const radioIsItLockedNo = document.getElementById(`radio-is-it-locked-no-${i}`)
                            let isItLockedYesNo = false
                            radioIsItLockedYes.addEventListener('change', function(e) {
                                isItLockedYesNo = true
                                clearElems(`is-it-locked-${i}`)
                                const messageDiv = document.createElement('div')
                                messageDiv.innerHTML = `
                                    <label class="input-styles">Locked Message:</label>
                                    <textarea class="input-styles-inp" id="locked-message${i}" cols="20" rows="2" maxlength="255"></textarea><br />

                                    <label class="input-styles">Opened Message:</label>
                                    <textarea class="input-styles-inp" id="opened-message${i}" cols="20" rows="2" maxlength="255"></textarea><br />
                                `
                                IsItLocked.appendChild(messageDiv)
                            })

                            radioIsItLockedNo.addEventListener('change', function(e) {
                                isItLockedYesNo = false
                                clearElems(`is-it-locked-${i}`)
                            })
                            saveButton.addEventListener('click', () => {
                                console.log(`save ${i}`)
                                
                                function isThereContent(element) {
                                    if (element && element.value) { return element.value } else { return null}
                                }

                                let formData = {
                                    room_id: 1,
                                    name: document.getElementById(`name-${i}`).value,
                                    description: document.getElementById(`description-${i}`).value,
                                    looked_message: document.getElementById(`looked-${i}`).value,
                                    take: canItBeTakenYesNo,
                                    take_message: isThereContent(document.getElementById(`take-message${i}`)),
                                    closed: isItClosedYesNo,
                                    closed_message: isThereContent(document.getElementById(`closed-message${i}`)),
                                    talk: canItTalkYesNo,
                                    talk_message: isThereContent(document.getElementById(`talk-message${i}`)),
                                    locked: isItLockedYesNo,
                                    locked_message: isThereContent(document.getElementById(`locked-message${i}`)),
                                    opened_message: isThereContent(document.getElementById(`opened-message${i}`))
                                }

                                let configObj = {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json'
                                    },
                                    body: JSON.stringify(formData)
                                }

                                fetch('http://localhost:3000/items/new', configObj)
                                .then(function(response) {
                                    return response.json()
                                })
                                .then(function(object) {
                                    if (object.errors) {
                                        clearElems('corner-top-right')
                                        object.errors.forEach(error => {
                                            const errorItems = elementBuilder('p', error, null, {'class':'warning'})
                                            switchAttr(cTopRight, 'class', 'corner-active')
                                            cTopRight.appendChild(errorItems)
                                        })
                                        setTimeout(() => {
                                            clearElems('corner-top-right')
                                            switchAttr(cTopRight, 'class', 'corner-inactive')
                                        }, 8000)
                                    } else {
                                        itemFormElem.className = 'item-form saved'
                                        const savedName = document.getElementById(`name-${i}`).value
                                        itemFormElem.innerHTML = `<p class="items-alternate">Item: ${savedName}</p>`
                                    }
                                })
                                .catch(function(error) {
                                    console.log(error.message)
                                })
                            })
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
        loggedUser = 1
        
        interface.innerHTML = `
            <p>User Rooms<p>
            <div id="rooms"></div>
        `
        const roomsDiv = document.getElementById('rooms')
        if (loggedUser) {
            let configObj = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            }
    
            fetch(`http://localhost:3000/${loggedUser}/rooms`, configObj)
            .then(function(response) {
                return response.json()
            })
            .then(function(object) {
                class Room {
                    constructor(id, user_id, name, setting, time_limit, completed_message, attempts, attempts_allowed, times_completed, obj_room, obj_exit, lock, items) {
                        this.id = id
                        this.user_id = user_id
                        this.name = name
                        this.setting = setting
                        this.time_limit = time_limit
                        this.completed_message = completed_message
                        this.attempts = attempts
                        this.attempts_allowed = attempts_allowed
                        this.times_completed = times_completed
                        this.obj_room = obj_room
                        this.obj_exit = obj_exit
                        this.lock = lock
                        this.items = items
                    }
                }
                object.data.forEach(r => {
                    const roo = elementBuilder('div', null, null)
                    const thisRoom = new Room(
                        r.id,
                        r.relationships.user.data.id,
                        r.attributes.name,
                        r.attributes.setting,
                        r.attributes.time_limit,
                        r.attributes.completed_message,
                        r.attributes.attempts,
                        r.attributes.attempts_allowed,
                        r.attributes.times_completed,
                        r.attributes.obj_room,
                        r.attributes.obj_exit,
                        r.attributes.lock,
                        r.attributes.items.length
                    )
                    
                    roo.innerHTML = `
                        <p>Room Name: ${thisRoom.name}</p>
                        <input type="submit" value="Edit" class="input-styles-button" id="edit-button-${thisRoom.id}">
                        <input type="submit" value="Delete" class="input-styles-button" id="delete-button-${thisRoom.id}">
                        <input type="submit" value="Edit Items" class="input-styles-button" id="edit-items-button-${thisRoom.id}">`
                    
                    roomsDiv.appendChild(roo)
                    const editButton = document.getElementById(`edit-button-${thisRoom.id}`)
                    const deleteButton = document.getElementById(`delete-button-${thisRoom.id}`)
                    const editItemsButton = document.getElementById(`edit-items-button-${thisRoom.id}`)

                    function checkCheckedSetting(radio) {
                        if (radio === thisRoom.setting) {return 'checked="checked"'}
                    }
                    editButton.addEventListener('click', () => {
                        interface.innerHTML =  `
                            <form id="form">
                                <p>Edit: ${thisRoom.name}</p>
                                <label class="input-styles">Room Name:</label>
                                <input type="text" value="${thisRoom.name}"class="input-styles-inp" id="input-name"><br />
                                <label class="input-styles">Choose a setting:</label><br />
                                <div class="setting-div">
                                    <label class="input-styles">Fantasy</label>
                                    <input type="radio" ${checkCheckedSetting('fantasy')} name="setting" value="fantasy" id="radio-fantasy">
                                    <label class="input-styles">Dungeon</label>
                                    <input type="radio" ${checkCheckedSetting('dungeon')} name="setting" value="fantasy" id="radio-dungeon">
                                    <label class="input-styles">Abandoned</label>
                                    <input type="radio" ${checkCheckedSetting('abandoned')} name="setting" value="fantasy" id="radio-abandoned">
                                    <label class="input-styles">Haunted</label>
                                    <input type="radio" ${checkCheckedSetting('haunted')} name="setting" value="fantasy" id="radio-haunted">
                                    <label class="input-styles">Generic</label>
                                    <input type="radio" ${checkCheckedSetting('generic')} name="setting" value="fantasy" id="radio-generic">
                                </div><br />
                                <label class="input-styles">Choose a time limit in minutes (60 max):</label>
                                <input type="text" value="${thisRoom.time_limit}" "maxlength="2" class="input-styles-inp-num" id="input-time-limit"><br />
                                <label class="input-styles">Room completion message:</label><br />
                                <textarea class="input-styles-inp-success" id="input-completed-message" cols="50" rows="5" maxlength="255">${thisRoom.completed_message}</textarea><br />
                                <label class="input-styles">Number of attempts allowed (10 max):</label>
                                <input type="text" value="${thisRoom.attempts_allowed}" maxlength="2" class="input-styles-inp-num" id="input-attempts-allowed"><br />  
                                <label class="input-styles">Number of objects (50 max):</label>
                                <input type="text" value="${thisRoom.obj_room}" maxlength="2" class="input-styles-inp-num" id="input-obj-room"><br />
                                <label class="input-styles">Number of objects to exit room (3 max):</label>
                                <input type="text" value="${thisRoom.obj_exit}" maxlength="1" class="input-styles-inp-num" id="input-obj-exit"><br />  
                                <label class="input-styles">Number or phrase required to exit the room:</label>
                                <input type="text" value="${thisRoom.lock}" class="input-styles-inp" id="input-lock"><br /><br />  
                                <input type="submit" value="Update" class="input-styles-button" id="update-button">
                            </form>`

                            const update = document.getElementById('update-button')
                            update.addEventListener('click', function(e) {
                                e.preventDefault()
                                    let formData = {
                                    user_id: 1,//loggedUser, change!
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
                                    method: 'PATCH',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json'
                                    },
                                    body: JSON.stringify(formData)
                                }
                                fetch(`http://localhost:3000/rooms/${thisRoom.id}/update`, configObj)
                                .then(function(response) {
                                    return response.json()
                                })
                                .then(function(object) {
                                    if (object.errors) {
                                        clearElems('corner-top-right')
                                        object.errors.forEach(error => {
                                            const errorUpdate = elementBuilder('p', error, null, {'class':'warning'})
                                            switchAttr(cTopRight, 'class', 'corner-active')
                                            cTopRight.appendChild(errorUpdate)
                                        })
                                        setTimeout(() => {
                                            clearElems('corner-top-right')
                                            switchAttr(cTopRight, 'class', 'corner-inactive')
                                        }, 8000)
                                    } else {
                                        interface.innerHTML = `Edit success.`
                                    }
                                })
                                .catch(function(error) {
                                    console.log(error.message)
                                })
                            })
                    })
                    deleteButton.addEventListener('click', (e) => {
                        e.preventDefault()
                        let configObj = {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                        }
                        fetch(`http://localhost:3000/rooms/${thisRoom.id}/delete`, configObj)
                        .then(function(response) {
                            return response.json()
                        })
                        .then(function(object) {
                            interface.innerHTML = object.success
                        })
                        .catch(function(error) {
                            console.log(error.message)
                        })
                        interface.innerHTML =`delete-button-${r.id}`
                    })
                    editItemsButton.addEventListener('click', (e) => {
                        e.preventDefault()
                        
                        
                        
                        let haha = thisRoom.items
                        let wow = setInterval(() => {
                            makeItems()
                        }, 50)
                      
                        let itemsIds = []
                        let configObj2 = {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                        }
                        fetch(`http://localhost:3000/items/${thisRoom.id}/index`, configObj2)
                        .then(function(response) {
                            return response.json()
                        })
                        .then(function(object) {
                            object.data.forEach(item => {
                                itemsIds.push(item.id)
                            })
                        })
                        itemsIds.reverse()
                        function makeItems() {
                            if (haha < thisRoom.obj_room) {
                                console.log(haha)
                                haha += 1
                                let formData = {
                                    room_id: thisRoom.id,
                                    name: 'add name',
                                    description: 'add description',
                                    looked_message: 'add looked message',
                                    take: false,
                                    take_message: null,
                                    closed: false,
                                    closed_message: null,
                                    talk: false,
                                    talk_message: null,
                                    locked: false,
                                    locked_message: null,
                                    opened_message: null
                                }
                                let configObj3 = {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json'
                                    },
                                    body: JSON.stringify(formData)
                                }
                                fetch('http://localhost:3000/items/new', configObj3)
                            } else if (haha > thisRoom.obj_room) {
                                haha -= 1
                                let configObj = {
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json'
                                    },
                                }
                                fetch(`http://localhost:3000/items/${itemsIds[0]}/delete`, configObj)
                                itemsIds.shift()
                            } else {
                                console.log('out')
                                clearTimeout(wow)
                            }
                        }
                        

                        
                        
                        
                        
                        
                        
                        let configObj = {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                        }
                        fetch(`http://localhost:3000/items/${thisRoom.id}/index`, configObj)
                        .then(function(response) {
                            return response.json()
                        })
                        .then(function(object) {
                            // savedItems = object.data.length
                            
                            class Item {
                                constructor(
                                    id,
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
                                    room_id,
                                    room_obj
                                ) {
                                    this.id = id
                                    this.name = name
                                    this.description = description
                                    this.looked_message = looked_message
                                    this.take = take
                                    this.take_message = take_message
                                    this.closed = closed
                                    this.closed_message = closed_message
                                    this.talk = talk
                                    this.talk_message = talk_message
                                    this.locked = locked
                                    this.locked_message = locked_message
                                    this.opened_message = opened_message
                                    this.room_id = room_id
                                    this.room_obj = room_obj
                                }
                            }
                            interface.innerHTML = `
                                    <p>Edit this room's items</p>
                                    <div id="items" class="items-alternate"></div>`
                                    // checkEmptyItems()
                            object.data.forEach(i => { 
                                const thisItem = new Item(
                                    i.id,
                                    i.attributes.name,
                                    i.attributes.description,
                                    i.attributes.looked_message,
                                    i.attributes.take,
                                    i.attributes.take_message,
                                    i.attributes.closed,
                                    i.attributes.closed_message,
                                    i.attributes.talk,
                                    i.attributes.talk_message,
                                    i.attributes.locked,
                                    i.attributes.locked_message,
                                    i.attributes.opened_message,
                                    i.attributes.room.id,
                                    i.attributes.room.obj_room
                                )
                                // roomItems = thisItem.room_obj here
                                const items = document.getElementById('items')
                                const itemFormElem =  elementBuilder('form', null, null, {'class':'item-form', 'id':`item-form-${thisItem.id}`})
                                
                               
                                function checkCheckedItem(radio) {
                                    if (radio === 'can-it-be-taken-yes') {if (thisItem.take === true) {return 'checked="checked"'}}
                                    if (radio === 'is-it-closed-yes') {if (thisItem.closed === true) {return 'checked="checked"'}}
                                    if (radio === 'can-it-talk-yes') {if (thisItem.talk === true) {return 'checked="checked"'}}
                                    if (radio === 'is-it-locked-yes') {if (thisItem.locked === true) {return 'checked="checked"'}}

                                    if (radio === 'can-it-be-taken-no') {if (thisItem.take === false) {return 'checked="checked"'}}
                                    if (radio === 'is-it-closed-no') {if (thisItem.closed === false) {return 'checked="checked"'}}
                                    if (radio === 'can-it-talk-no') {if (thisItem.talk === false) {return 'checked="checked"'}}
                                    if (radio === 'is-it-locked-no') {if (thisItem.locked === false) {return 'checked="checked"'}}
                                }
                                function messagesCheck(messageIncluded) {
                                    if (messageIncluded === "take") {
                                        if (thisItem.take === true) {
                                            return `
                                            <label class="input-styles">Message when taken:</label>
                                            <textarea class="input-styles-inp" id="take-message${thisItem.id}" cols="20" rows="2" maxlength="255">${thisItem.take_message}</textarea><br />`
                                        } else {return ""}
                                    } 
                                    if (messageIncluded === "closed") {
                                        if (thisItem.closed === true) {
                                            return `
                                            <label class="input-styles">Message when closed:</label>
                                            <textarea class="input-styles-inp" id="closed-message${thisItem.id}" cols="20" rows="2" maxlength="255">${thisItem.closed_message}</textarea><br />
                                        `
                                        } else {return ""}
                                    } 
                                    if (messageIncluded === "talk") {
                                        if (thisItem.talk === true) {
                                            return `
                                            <label class="input-styles">Can it talk:</label>
                                            <textarea class="input-styles-inp" id="talk-message${thisItem.id}" cols="20" rows="2" maxlength="255">${thisItem.talk_message}</textarea><br />
                                        `
                                        } else {return ""}
                                    } 
                                    if (messageIncluded === "locked") {
                                        if (thisItem.locked === true) {
                                            return `
                                            <label class="input-styles">Locked Message:</label>
                                            <textarea class="input-styles-inp" id="locked-message${thisItem.id}" cols="20" rows="2" maxlength="255">${thisItem.locked_message}</textarea><br />
                    
                                            <label class="input-styles">Opened Message:</label>
                                            <textarea class="input-styles-inp" id="opened-message${thisItem.id}" cols="20" rows="2" maxlength="255">${thisItem.opened_message}</textarea><br />
                                        `
                                        } else {return ""}
                                    } 
                                }
                                
                                itemFormElem.innerHTML = `
                                    <label class="input-styles">Name:</label>
                                    <input "type="text" value="${thisItem.name}" class="input-styles-inp" id="name-${thisItem.id}"><br />

                                    <label class="input-styles">Description:</label>
                                    <input type="text" value="${thisItem.description}" class="input-styles-inp" id="description-${thisItem.id}"><br />

                                    <label class="input-styles">When looked at:</label>
                                    <input type="text" value="${thisItem.looked_message}" class="input-styles-inp" id="looked-${thisItem.id}"><br />

                                    <label class="input-styles">Can it be taken?:</label>
                                    <input type="radio" ${checkCheckedItem('can-it-be-taken-no')} name="can-it-be-taken" value="no" id="radio-can-it-be-taken-no-${thisItem.id}">
                                    <label class="input-styles">no</label>
                                    <input type="radio" ${checkCheckedItem('can-it-be-taken-yes')} name="can-it-be-taken" value="yes" id="radio-can-it-be-taken-yes-${thisItem.id}">
                                    <label class="input-styles">yes</label><br />
                                    <div id="can-it-be-taken-${thisItem.id}">
                                    ${messagesCheck('take')}
                                    </div>
                                    
                                    <label class="input-styles">Is it closed?:</label>
                                    <input type="radio" ${checkCheckedItem('is-it-closed-no')} name="is-it-closed" value="no" id="radio-is-it-closed-no-${thisItem.id}">
                                    <label class="input-styles">no</label>
                                    <input type="radio" ${checkCheckedItem('is-it-closed-yes')} name="is-it-closed" value="yes" id="radio-is-it-closed-yes-${thisItem.id}">
                                    <label class="input-styles">yes</label><br />
                                    <div id="is-it-closed-${thisItem.id}">
                                    ${messagesCheck('closed')}
                                    </div>
                                    
                                    <label class="input-styles">Can it talk:</label>
                                    <input type="radio" ${checkCheckedItem('can-it-talk-no')} name="can-it-talk" value="no" id="radio-can-it-talk-no-${thisItem.id}">
                                    <label class="input-styles">no</label>
                                    <input type="radio" ${checkCheckedItem('can-it-talk-yes')} name="can-it-talk" value="yes" id="radio-can-it-talk-yes-${thisItem.id}">
                                    <label class="input-styles">yes</label><br />
                                    <div id="can-it-talk-${thisItem.id}">
                                    ${messagesCheck('talk')}
                                    </div>

                                    <label class="input-styles">Is it locked:</label>
                                    <input type="radio" ${checkCheckedItem('is-it-locked-no')} name="is-it-locked" value="no" id="radio-is-it-locked-no-${thisItem.id}">
                                    <label class="input-styles">no</label>
                                    <input type="radio" ${checkCheckedItem('is-it-locked-yes')} name="is-it-locked" value="yes" id="radio-is-it-locked-yes-${thisItem.id}">
                                    <label class="input-styles">yes</label><br />
                                    <div id="is-it-locked-${thisItem.id}">
                                    ${messagesCheck('locked')}
                                    </div>

                                    <br />
                                    <input type="submit" value="Update" class="input-styles-button" id="update-button-${thisItem.id}">`
                                    
                                





                                
                                
                                items.appendChild(itemFormElem)
                                
                                const updateButton = document.getElementById(`update-button-${thisItem.id}`)
                                updateButton.addEventListener('click', function(e) {e.preventDefault()})
                                const canItBeTaken = document.getElementById(`can-it-be-taken-${thisItem.id}`)
                                const radioCanItBeTakenYes = document.getElementById(`radio-can-it-be-taken-yes-${thisItem.id}`)
                                const radioCanItBeTakenNo = document.getElementById(`radio-can-it-be-taken-no-${thisItem.id}`)
                                let canItBeTakenYesNo = false
                                radioCanItBeTakenYes.addEventListener('change', function(e) {
                                    canItBeTakenYesNo = true
                                    clearElems(`can-it-be-taken-${thisItem.id}`)
                                    const messageDiv = document.createElement('div')
                                    messageDiv.innerHTML = `
                                        <label class="input-styles">Message when taken:</label>
                                        <textarea class="input-styles-inp" id="take-message${thisItem.id}" cols="20" rows="2" maxlength="255">${thisItem.take_message}</textarea><br />
                                    `
                                    canItBeTaken.appendChild(messageDiv)
                                })

                                radioCanItBeTakenNo.addEventListener('change', function(e) {
                                    canItBeTakenYesNo = false
                                    clearElems(`can-it-be-taken-${thisItem.id}`)
                                })

                                const isItClosed = document.getElementById(`is-it-closed-${thisItem.id}`)
                                const radioIsItClosedYes = document.getElementById(`radio-is-it-closed-yes-${thisItem.id}`)
                                const radioIsItClosedNo = document.getElementById(`radio-is-it-closed-no-${thisItem.id}`)
                                let isItClosedYesNo = false
                                radioIsItClosedYes.addEventListener('change', function(e) {
                                    isItClosedYesNo = true
                                    clearElems(`is-it-closed-${thisItem.id}`)
                                    const messageDiv = document.createElement('div')
                                    messageDiv.innerHTML = `
                                        <label class="input-styles">Message when closed:</label>
                                        <textarea class="input-styles-inp" id="closed-message${thisItem.id}" cols="20" rows="2" maxlength="255">${thisItem.closed_message}</textarea><br />
                                    `
                                    isItClosed.appendChild(messageDiv)
                                })

                                radioIsItClosedNo.addEventListener('change', function(e) {
                                    isItClosedYesNo = false
                                    clearElems(`is-it-closed-${thisItem.id}`)
                                })

                                const canItTalk = document.getElementById(`can-it-talk-${thisItem.id}`)
                                const radioCanItTalkYes = document.getElementById(`radio-can-it-talk-yes-${thisItem.id}`)
                                const radioCanItTalkNo = document.getElementById(`radio-can-it-talk-no-${thisItem.id}`)
                                let canItTalkYesNo = false
                                radioCanItTalkYes.addEventListener('change', function(e) {
                                    canItTalkYesNo = true
                                    clearElems(`can-it-talk-${thisItem.id}`)
                                    const messageDiv = document.createElement('div')
                                    messageDiv.innerHTML = `
                                        <label class="input-styles">Can it talk:</label>
                                        <textarea class="input-styles-inp" id="talk-message${thisItem.id}" cols="20" rows="2" maxlength="255">${thisItem.talk_message}</textarea><br />
                                    `
                                    canItTalk.appendChild(messageDiv)
                                })

                                radioCanItTalkNo.addEventListener('change', function(e) {
                                    canItTalkYesNo = false
                                    clearElems(`can-it-talk-${thisItem.id}`)
                                })
                                
                                const IsItLocked = document.getElementById(`is-it-locked-${thisItem.id}`)
                                const radioIsItLockedYes = document.getElementById(`radio-is-it-locked-yes-${thisItem.id}`)
                                const radioIsItLockedNo = document.getElementById(`radio-is-it-locked-no-${thisItem.id}`)
                                let isItLockedYesNo = false
                                radioIsItLockedYes.addEventListener('change', function(e) {
                                    isItLockedYesNo = true
                                    clearElems(`is-it-locked-${thisItem.id}`)
                                    const messageDiv = document.createElement('div')
                                    messageDiv.innerHTML = `
                                        <label class="input-styles">Locked Message:</label>
                                        <textarea class="input-styles-inp" id="locked-message${thisItem.id}" cols="20" rows="2" maxlength="255">${thisItem.locked_message}</textarea><br />

                                        <label class="input-styles">Opened Message:</label>
                                        <textarea class="input-styles-inp" id="opened-message${thisItem.id}" cols="20" rows="2" maxlength="255">${thisItem.opened_message}</textarea><br />
                                    `
                                    IsItLocked.appendChild(messageDiv)
                                })

                                radioIsItLockedNo.addEventListener('change', function(e) {
                                    isItLockedYesNo = false
                                    clearElems(`is-it-locked-${thisItem.id}`)
                                })
                                // saveButton.addEventListener('click', () => {
                                //     console.log(`save ${thisItem.id}`)
                                    
                                //     function isThereContent(element) {
                                //         if (element && element.value) { return element.value } else { return null}
                                //     }

                                    // let formData = {
                                    //     room_id: 1,
                                    //     name: document.getElementById(`name-${i}`).value,
                                    //     description: document.getElementById(`description-${i}`).value,
                                    //     looked_message: document.getElementById(`looked-${i}`).value,
                                    //     take: canItBeTakenYesNo,
                                    //     take_message: isThereContent(document.getElementById(`take-message${i}`)),
                                    //     closed: isItClosedYesNo,
                                    //     closed_message: isThereContent(document.getElementById(`closed-message${i}`)),
                                    //     talk: canItTalkYesNo,
                                    //     talk_message: isThereContent(document.getElementById(`talk-message${i}`)),
                                    //     locked: isItLockedYesNo,
                                    //     locked_message: isThereContent(document.getElementById(`locked-message${i}`)),
                                    //     opened_message: isThereContent(document.getElementById(`opened-message${i}`))
                                    // }

                                    // let configObj = {
                                    //     method: 'POST',
                                    //     headers: {
                                    //         'Content-Type': 'application/json',
                                    //         'Accept': 'application/json'
                                    //     },
                                    //     body: JSON.stringify(formData)
                                    // }

                                    // fetch('http://localhost:3000/items/new', configObj)
                                    // .then(function(response) {
                                    //     return response.json()
                                    // })
                                    // .then(function(object) {
                                    //     if (object.errors) {
                                    //         clearElems('corner-top-right')
                                    //         object.errors.forEach(error => {
                                    //             const errorItems = elementBuilder('p', error, null, {'class':'warning'})
                                    //             switchAttr(cTopRight, 'class', 'corner-active')
                                    //             cTopRight.appendChild(errorItems)
                                    //         })
                                    //         setTimeout(() => {
                                    //             clearElems('corner-top-right')
                                    //             switchAttr(cTopRight, 'class', 'corner-inactive')
                                    //         }, 8000)
                                    //     } else {
                                    //         itemFormElem.className = 'item-form saved'
                                    //         const savedName = document.getElementById(`name-${i}`).value
                                    //         itemFormElem.innerHTML = `<p class="items-alternate">Item: ${savedName}</p>`
                                    //     }
                                    // })
                                    // .catch(function(error) {
                                    //     console.log(error.message)
                                    // })
                            // })
                            })
                            
                        })
                        .catch(function(error) {
                            console.log(error.message)
                        })
                        // interface.innerHTML =`delete-button-${r.id}`
                    })
                })
            })
            .catch(function(error) {
                console.log(error.message)
            })
        } else {
            interface.innerHTML = 'Log in first'
        }
        
        
    })

    mTop.addEventListener('click', () => {
        clearElems('interface')
        interface.innerHTML = 'Top 100 escape rooms!'
    })

    mSearch.addEventListener('click', () => {
        clearElems('interface')
        interface.innerHTML = 'Search escape rooms!'
    })
    
    mPlay.addEventListener('click', () => {
        clearElems('interface')
        interface.innerHTML = 'escape some rooms! :)'

    })
})
