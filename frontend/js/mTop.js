document.addEventListener("DOMContentLoaded", () => {
    mTop.addEventListener('click', () => {
        clearElems('interface')
        let roomsSortedByAttempts = []
        let configObj = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }
        fetch(`http://localhost:3000/rooms/index`, configObj)
        .then(function(response) {
            return response.json()
        })
        .then(function(object) {
            object.data.forEach(r => {
                let thisRoom = new Room(
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
                    r.attributes.items
                )
                roomsSortedByAttempts.push(thisRoom)
                
            })
            roomsSortedByAttempts.sort(function(a, b) {
                return b.attempts - a.attempts
            })
            roomsSortedByAttempts.forEach(room => {
                const roo = elementBuilder('div', null, null)
                roo.innerHTML = `
                    <p>Room Name: ${room.name} - Setting: ${room.setting}</p>
                    <p>Time limit: ${room.time_limit} - Attempts allowed: ${room.attempts_allowed}</p>
                    <input type="submit" value="Play" class="input-styles-button" id="play-button-${room.id}">`
                interface.appendChild(roo)
                const playButton = document.getElementById(`play-button-${room.id}`)
                playButton.addEventListener("click", (e) => {
                    e.preventDefault()
                    letsPlay()
                })
            })
        })
    })
})