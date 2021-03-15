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
    
                fetch('http://localhost:3000/users', configObj)
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
                        <input type="radio" name="setting" value="fantasy" checked="checked" id="radio-dungeon">
                        <label class="input-styles">Abandoned</label>
                        <input type="radio" name="setting" value="fantasy" checked="checked" id="radio-abandoned">
                        <label class="input-styles">Haunted</label>
                        <input type="radio" name="setting" value="fantasy" checked="checked" id="radio-haunted">
                        <label class="input-styles">Generic</label>
                        <input type="radio" name="setting" value="fantasy" checked="checked" id="radio-generic">
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
            form.addEventListener('click', function(e) {e.preventDefault()})
            const submitButton = document.getElementById('submit-button')
            
            submitButton.addEventListener('click', () => {
                
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
                
                fetch('http://localhost:3000/rooms', configObj)
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

                                fetch('http://localhost:3000/items', configObj)
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
                                       //success item message here
                                       const item_id = object.data.id
                                       console.log(item_id)
                                       itemFormElem.className = 'item-form saved'
                                       const savedName = document.getElementById(`name-${i}`).value
                                       itemFormElem.innerHTML = `
                                            <p class="items-alternate">${savedName}</p>
                                            <input type="submit" value="Edit" class="input-styles-button" id="edit-button-${i}"">
                                            <input type="submit" value="Delete" class="input-styles-button" id="delete-button-${i}">`
                                        const editButton = document.getElementById(`edit-button-${i}`)
                                        const deleteButton = document.getElementById(`delete-button-${i}`)
                                        editButton.addEventListener('click', function(e) {e.preventDefault()})
                                        deleteButton.addEventListener('click', function(e) {e.preventDefault()})
                                        editButton.addEventListener('click', () => {
                                            itemFormElem.className = 'item-form'
                                            let configObj = {
                                                method: 'GET',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Accept': 'application/json'
                                                }
                                            }    
                                            
                                            fetch(`http://localhost:3000/items/${item_id}`, configObj)
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
                                                //success item message here
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
                                                        room_id
                                                    ) {
                                                        this.id = object.data.id
                                                        this.name = object.data.attributes.name
                                                        this.description = object.data.attributes.description
                                                        this.looked_message = object.data.attributes.looked_message
                                                        this.take = object.data.attributes.take
                                                        this.take_message = object.data.attributes.take_message
                                                        this.closed = object.data.attributes.closed
                                                        this.closed_message = object.data.attributes.closed_message
                                                        this.talk = object.data.attributes.talk
                                                        this.talk_message = object.data.attributes.talk_message
                                                        this.locked = object.data.attributes.locked
                                                        this.locked_message = object.data.attributes.locked_message
                                                        this.opened_message = object.data.attributes.opened_message
                                                        this.room_id = object.data.attributes.room_id
                                                    }
                                                }
                                                const currentItem = new Item
                                                console.log(currentItem)
                                                function checkChecked(radio) {
                                                    if (radio === 'can-it-be-taken') {if (currentItem.take === true) {return 'checked="checked"'}}
                                                    if (radio === 'is-it-closed') {if (currentItem.closed === true) {return 'checked="checked"'}}
                                                    if (radio === 'can-it-talk') {if (currentItem.talk === true) {return 'checked="checked"'}}
                                                    if (radio === 'is-it-locked') {if (currentItem.locked === true) {return 'checked="checked"'}}
                                                }
                                                function messagesCheck(messageIncluded) {
                                                    if (messageIncluded === "take") {
                                                        if (currentItem.take === true) {
                                                            return `
                                                            <label class="input-styles">Message when taken:</label>
                                                            <textarea class="input-styles-inp" id="take-message${i}" cols="20" rows="2" maxlength="255">${currentItem.take_message}</textarea><br />`

                                                        }
                                                    }
                                                    if (messageIncluded === "closed") {
                                                        console.log(currentItem.closed_message)
                                                        if (currentItem.closed === true) {
                                                            return `
                                                            <label class="input-styles">Message when closed:</label>
                                                            <textarea class="input-styles-inp" id="closed-message${i}" cols="20" rows="2" maxlength="255">${currentItem.closed_message}</textarea><br />
                                                        `
                                                        
                                                        }
                                                    }
                                                    if (messageIncluded === "talk") {
                                                        if (currentItem.talk === true) {
                                                            return `
                                                            <label class="input-styles">Can it talk:</label>
                                                            <textarea class="input-styles-inp" id="talk-message${i}" cols="20" rows="2" maxlength="255">${currentItem.talk_message}</textarea><br />
                                                        `
                                                        }
                                                    }
                                                    if (messageIncluded === "locked") {
                                                        if (currentItem.locked === true) {
                                                            return `
                                                            <label class="input-styles">Locked Message:</label>
                                                            <textarea class="input-styles-inp" id="locked-message${i}" cols="20" rows="2" maxlength="255">${currentItem.locked_message}</textarea><br />
    
                                                            <label class="input-styles">Opened Message:</label>
                                                            <textarea class="input-styles-inp" id="opened-message${i}" cols="20" rows="2" maxlength="255">${currentItem.opened_message}</textarea><br />
                                                        `
                                                        }
                                                    }
                    
                                                }
                                                
                                                itemFormElem.innerHTML = `
                                                <label class="input-styles">Name:</label>
                                                <input type="text" class="input-styles-inp" value=""id="name-${i}"><br />
            
                                                <label class="input-styles">Description:</label>
                                                <input type="text" value="" class="input-styles-inp" id="description-${i}"><br />
            
                                                <label class="input-styles">When looked at:</label>
                                                <input type="text" value="" class="input-styles-inp" id="looked-${i}"><br />
            
                                                <label class="input-styles">Can it be taken?:</label>
                                                <input type="radio" name="can-it-be-taken" value="no" ${checkChecked('can-it-be-taken')} id="radio-can-it-be-taken-no-${i}">
                                                <label class="input-styles">no</label>
                                                <input type="radio" name="can-it-be-taken" value="yes" ${checkChecked('can-it-be-taken')} id="radio-can-it-be-taken-yes-${i}">
                                                <label class="input-styles">yes</label><br />
                                                <div id="can-it-be-taken-${i}">
                                                ${messagesCheck('take')}
                                                </div>
            
                                                <label class="input-styles">Is it closed?:</label>
                                                <input type="radio" name="is-it-closed" value="no" ${checkChecked('is-it-closed')} id="radio-is-it-closed-no-${i}">
                                                <label class="input-styles">no</label>
                                                <input type="radio" name="is-it-closed" value="yes" ${checkChecked('is-it-closed')} id="radio-is-it-closed-yes-${i}">
                                                <label class="input-styles">yes</label><br />
                                                <div id="is-it-closed-${i}">
                                                ${messagesCheck('closed')}
                                                </div>
                                                    
                                                <label class="input-styles">Can it talk:</label>
                                                <input type="radio" name="can-it-talk" value="no" ${checkChecked('can-it-talk')} id="radio-can-it-talk-no-${i}">
                                                <label class="input-styles">no</label>
                                                <input type="radio" name="can-it-talk" value="yes" ${checkChecked('can-it-talk')} id="radio-can-it-talk-yes-${i}">
                                                <label class="input-styles">yes</label><br />
                                                <div id="can-it-talk-${i}">
                                                ${messagesCheck('talk')}
                                                </div>
            
                                                <label class="input-styles">Is it locked:</label>
                                                <input type="radio" name="is-it-locked" value="no" ${checkChecked('is-it-locked')} id="radio-is-it-locked-no-${i}">
                                                <label class="input-styles">no</label>
                                                <input type="radio" name="is-it-locked" value="yes" ${checkChecked('is-it-locked')} id="radio-is-it-locked-yes-${i}">
                                                <label class="input-styles">yes</label><br />
                                                <div id="is-it-locked-${i}">
                                                ${messagesCheck('locked')}
                                                </div>
                                                <br />
                                                <input type="submit" value="Edit" class="input-styles-button" id="edit-button-${i}">`
                                                
                                                const editButton = document.getElementById(`edit-button-${i}`)
                                                editButton.addEventListener('click', function(e) {e.preventDefault()})
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
                                                    <textarea class="input-styles-inp" id="take-message${i}" cols="20" rows="2" maxlength="255"></textarea><br />`

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
                                                    <textarea class="input-styles-inp" id="closed-message${i}" cols="20" rows="2" maxlength="255"></textarea><br />`
                                                
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
                                                    <textarea class="input-styles-inp" id="talk-message${i}" cols="20" rows="2" maxlength="255"></textarea><br />`
                                                
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
                                                    <textarea class="input-styles-inp" id="opened-message${i}" cols="20" rows="2" maxlength="255"></textarea><br />`
                                                
                                                    IsItLocked.appendChild(messageDiv)
                                                })

                                                radioIsItLockedNo.addEventListener('change', function(e) {
                                                    isItLockedYesNo = false
                                                    clearElems(`is-it-locked-${i}`)
                                                })
                                                //here
                                                }
                                            })
                                            .catch(function(error) {
                                                console.log(error.message)
                                            })
                                        })
                                        
                                    }
                                })
                                .catch(function(error) {
                                    console.log(error.message)
                                })
                            })
                            

                            // deleteButton.addEventListener('click', () => {
                            //     console.log(`delete ${i}`)
                            // })
                            
                            
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
