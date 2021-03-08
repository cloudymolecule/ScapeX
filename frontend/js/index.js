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
        p.innerText = "Create a ScapeX account"

        const labName = document.createElement('label')
        labName.setAttribute('type', 'label')
        labName.setAttribute('class', 'input-styles')
        labName.setAttribute('for', 'input-name')
        labName.innerText = "Please enter your name:"

        const inputName = document.createElement('input')
        inputName.setAttribute('type', 'text')
        inputName.setAttribute('name', 'username')
        inputName.setAttribute('class', 'input-styles')
        inputName.setAttribute('id', 'input-name')

        const labEmail = document.createElement('label')
        labEmail.setAttribute('type', 'label')
        labEmail.setAttribute('class', 'input-styles')
        labEmail.setAttribute('for', 'input-email')
        labEmail.innerText = "Please enter your email:"

        const inputEmail = document.createElement('input')
        inputEmail.setAttribute('type', 'text')
        inputEmail.setAttribute('name', 'username')
        inputEmail.setAttribute('class', 'input-styles')
        inputEmail.setAttribute('id', 'input-email')

        const s = document.createElement('input')
        s.setAttribute('type', 'submit')
        s.setAttribute('value', 'Register')
        s.setAttribute('class', 'input-styles')

        interface.appendChild(p)
        f.appendChild(labName)
        f.appendChild(inputName)
        f.appendChild(labEmail)
        f.appendChild(inputEmail)
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

