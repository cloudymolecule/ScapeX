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

        const f = document.createElement('form')
        f.setAttribute('method', 'post')
        f.setAttribute('action', 'submit')
        f.setAttribute('class', 'interface')
        
        const p = document.createElement('p')
        p.innerText = "Register"

        const lab = document.createElement('label')
        lab.setAttribute('type', 'label')
        lab.setAttribute('class', 'input-color')
        lab.setAttribute('for', 'input-name')
        lab.innerText = "Please enter your name"

        const i = document.createElement('input')
        i.setAttribute('type', 'text')
        i.setAttribute('name', 'username')
        i.setAttribute('class', 'input-color')
        i.setAttribute('id', 'input-name')

        const s = document.createElement('input')
        s.setAttribute('type', 'submit')
        s.setAttribute('value', 'submit')
        s.setAttribute('class', 'input-color')

        interface.appendChild(p)
        f.appendChild(lab)
        f.appendChild(i)
        f.appendChild(s)


        interface.appendChild(f)

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

