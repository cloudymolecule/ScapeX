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