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

//error handling
function errorsDisplay(errors){
    clearElems('corner-top-right')
    errors.forEach(err => {
        const error = elementBuilder('p', err, null, {'class':'warning'})
        switchAttr(cTopRight, 'class', 'corner-active')
        cTopRight.appendChild(error)
    })
    setTimeout(() => {
        clearElems('corner-top-right')
        switchAttr(cTopRight, 'class', 'corner-inactive')
    }, 8000)
}

//classes


class Room {
    constructor(
        id,
        user_id, 
        name, 
        setting, 
        time_limit, 
        completed_message, 
        attempts, 
        attempts_allowed, 
        times_completed, 
        obj_room, 
        obj_exit, 
        lock, 
        items
    ) {
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

