document.addEventListener("DOMContentLoaded", () => {
    mPlay.addEventListener('click', () => {
        if (!loggedUser) {
            console.log(loggedUSer)
        } else {
            interface.innerHTML = 'Please log in first'
        }
    })
})