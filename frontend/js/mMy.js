document.addEventListener("DOMContentLoaded", () => {
    mMy.addEventListener('click', () => {
        loggedUser = 1
        const roomsDiv = document.getElementById('rooms')
        if (loggedUser) {
            let itemsCounter = 0
            interface.innerHTML = `
                <p>User Rooms<p>
                <div id="rooms"></div>`
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
                                        errorsDisplay(object.errors)
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
                        let rooIt = thisRoom.items
                        let intervalToPleaseServer = setInterval(() => {
                            makeItems()
                        }, 50)
                        interface.innerHTML = 'Please wait...'
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
                        itemIds = itemsIds.reverse()
                        function makeItems() {
                            if (rooIt < thisRoom.obj_room) {
                                rooIt += 1
                                let formData = {
                                    room_id: thisRoom.id,
                                    name: 'null',
                                    description: 'null',
                                    looked_message: 'null',
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
                            } else if (rooIt > thisRoom.obj_room) {
                                rooIt -= 1
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
                                clearInterval(intervalToPleaseServer)
                            }
                        }
                        
                        setTimeout(() => {
                            renderItems()
                        }, 1500)

                        function renderItems() {

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
                                
                                function checkForNull(value){
                                    if (value === null || value === 'null') {
                                        return ""
                                    } else {
                                        return value
                                    }
                                }
                                interface.innerHTML = `
                                        <p>Edit this room's items</p>
                                        <div id="items" class="items-alternate"></div>`
                                        // checkEmptyItems()
                                object.data.forEach(i => { 
                                    itemsCounter += 1
                                    const thisItem = new Item(
                                        i.id,
                                        checkForNull(i.attributes.name),
                                        checkForNull(i.attributes.description),
                                        checkForNull(i.attributes.looked_message),
                                        i.attributes.take,
                                        checkForNull(i.attributes.take_message),
                                        i.attributes.closed,
                                        checkForNull(i.attributes.closed_message),
                                        i.attributes.talk,
                                        checkForNull(i.attributes.talk_message),
                                        i.attributes.locked,
                                        checkForNull(i.attributes.locked_message),
                                        checkForNull(i.attributes.opened_message),
                                        i.attributes.room.id,
                                        i.attributes.room.obj_room
                                    )
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
                                                <label class="input-styles">What does it say?:</label>
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
                                        <input type="submit" value="Update" class="input-styles-button" id="update-button-${thisItem.id}">
                                        <input type="submit" value="Delete" class="input-styles-button" id="delete-button-${thisItem.id}">`

                                    items.appendChild(itemFormElem)
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
                                            <textarea class="input-styles-inp" id="take-message${thisItem.id}" cols="20" rows="2" maxlength="255">${thisItem.take_message}</textarea><br />`
                                        
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
                                            <label class="input-styles">What does it say?:</label>
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
                                    


                                    const updateButtonItem = document.getElementById(`update-button-${thisItem.id}`)
                                    const deleteButtonItem = document.getElementById(`delete-button-${thisItem.id}`)

                                    updateButtonItem.addEventListener('click', function(e) {
                                        
                                        e.preventDefault()
                                        function isThereContent(element) {
                                            if (element && element.value) { return element.value } else { return null}
                                        }
        
                                        let formData = {
                                            room_id: 1,
                                            name: document.getElementById(`name-${thisItem.id}`).value,
                                            description: document.getElementById(`description-${thisItem.id}`).value,
                                            looked_message: document.getElementById(`looked-${thisItem.id}`).value,
                                            take: canItBeTakenYesNo,
                                            take_message: isThereContent(document.getElementById(`take-message${thisItem.id}`)),
                                            closed: isItClosedYesNo,
                                            closed_message: isThereContent(document.getElementById(`closed-message${thisItem.id}`)),
                                            talk: canItTalkYesNo,
                                            talk_message: isThereContent(document.getElementById(`talk-message${thisItem.id}`)),
                                            locked: isItLockedYesNo,
                                            locked_message: isThereContent(document.getElementById(`locked-message${thisItem.id}`)),
                                            opened_message: isThereContent(document.getElementById(`opened-message${thisItem.id}`))
                                        }
                                        let configObj = {
                                            method: 'PATCH',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Accept': 'application/json'
                                            },
                                            body: JSON.stringify(formData)
                                        }
        
                                        fetch(`http://localhost:3000/items/${thisItem.id}/update`, configObj)
                                        .then(function(response) {
                                            return response.json()
                                        })
                                        .then(function(object) {
                                            if (object.errors) {
                                                errorsDisplay(object.errors)
                                            } else {
                                                itemFormElem.className = 'item-form saved'
                                                const savedName = document.getElementById(`name-${thisItem.id}`).value
                                                itemFormElem.innerHTML = `
                                                    <p class="items-alternate">Item updated</p>
                                                    <input type="submit" value="Delete" class="input-styles-button" id="delete-button-${thisItem.id}">`
                                            }
                                        })
                                        .catch(function(error) {
                                            console.log(error.message)
                                        })

                                    })
                                    deleteButtonItem.addEventListener('click', function(e) {
                                        e.preventDefault()
                                        if (itemsCounter === 1) {
                                            errorsDisplay(['Room must have at least one item'])
                                        } else if (itemsCounter > 1){
                                            itemsCounter = itemsCounter - 1
                                            let configObj = {
                                                method: 'GET',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Accept': 'application/json'
                                                },
                                            }
                                            fetch(`http://localhost:3000/items/${thisItem.id}/delete`, configObj)


                                            let formData = {
                                                obj_room: itemsCounter
                                            }
                                            let configObj2 = {
                                                method: 'PATCH',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Accept': 'application/json'
                                                },
                                                body: JSON.stringify(formData)
                                            }
                                            setTimeout(() => {
                                                fetch(`http://localhost:3000/rooms/${thisItem.room_id}/update`, configObj2)
                                            }, 50)
                                            itemFormElem.className = 'item-form saved'
                                            itemFormElem.innerHTML = `<p class="items-alternate">Item deleted</p>`
                                        }
                                    })
                                })
                            })
                            .catch(function(error) {
                                console.log(error.message)
                            })
                        }
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
})