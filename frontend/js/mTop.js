document.addEventListener("DOMContentLoaded", () => {
    const roomsDiv = document.createElement('div')
    mTop.addEventListener('click', () => {
        clearElems('interface')
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
                    r.attributes.items
                )
                const roo = elementBuilder('div', null, null)
                roo.innerHTML = `
                    <p>Room Name: ${thisRoom.name} - Setting: ${thisRoom.setting}</p>
                    <p>Time limit: ${thisRoom.time_limit} - Attempts allowed: ${thisRoom.attempts_allowed}</p>
                    <input type="submit" value="Play" class="input-styles-button" id="play-button-${thisRoom.id}">`
                roomsDiv.appendChild(roo)
                const playButton = document.getElementById('play-button-${thisRoom.id')
                playButton.addEventListener("click", (e) => {
                    e.preventDefault()
                    
                })
            })
            interface.appendChild(roomsDiv)
        })
        .catch(function(error) {
            console.log(error.message)
        })
    })
})