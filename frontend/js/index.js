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
        f.setAttribute('action', 'http://localhost:3000')
        f.setAttribute('class', 'form')
        
        const p = document.createElement('p')
        p.innerText = "Create a ScapeX account"

        const labName = document.createElement('label')
        labName.setAttribute('type', 'label')
        labName.setAttribute('class', 'input-styles')
        labName.setAttribute('for', 'input-name')
        labName.innerText = "Username:"

        const inputName = document.createElement('input')
        inputName.setAttribute('type', 'text')
        inputName.setAttribute('name', 'username')
        inputName.setAttribute('class', 'input-styles-inp')
        inputName.setAttribute('id', 'input-name')

        const labEmail = document.createElement('label')
        labEmail.setAttribute('type', 'label')
        labEmail.setAttribute('class', 'input-styles')
        labEmail.setAttribute('for', 'input-email')
        labEmail.innerText = "Email:"

        const inputEmail = document.createElement('input')
        inputEmail.setAttribute('type', 'text')
        inputEmail.setAttribute('name', 'username')
        inputEmail.setAttribute('class', 'input-styles-inp')
        inputEmail.setAttribute('id', 'input-email')

        const labPass = document.createElement('label')
        labPass.setAttribute('type', 'label')
        labPass.setAttribute('class', 'input-styles')
        labPass.setAttribute('for', 'input-password')
        labPass.innerText = "Password:"

        const inputPass = document.createElement('input')
        inputPass.setAttribute('type', 'password')
        inputPass.setAttribute('password', 'password')
        inputPass.setAttribute('class', 'input-styles-inp')
        inputPass.setAttribute('id', 'input-password')

        const labPassCon = document.createElement('label')
        labPassCon.setAttribute('type', 'label')
        labPassCon.setAttribute('class', 'input-styles')
        labPassCon.setAttribute('for', 'input-password-con')
        labPassCon.innerText = "Confirm password:"

        const inputPassCon = document.createElement('input')
        inputPassCon.setAttribute('type', 'password')
        inputPassCon.setAttribute('password-con', 'password-con')
        inputPassCon.setAttribute('class', 'input-styles-inp')
        inputPassCon.setAttribute('id', 'input-password-con')

        const br = document.createElement('br')

        const s = document.createElement('input')
        s.setAttribute('type', 'submit')
        s.setAttribute('value', 'Register')
        s.setAttribute('class', 'input-styles-button')

        interface.appendChild(p)
        f.appendChild(labName)
        f.appendChild(inputName)
        f.appendChild(labEmail)
        f.appendChild(inputEmail)
        f.appendChild(labPass)
        f.appendChild(inputPass)
        f.appendChild(labPassCon)
        f.appendChild(inputPassCon)
        f.appendChild(br)
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

