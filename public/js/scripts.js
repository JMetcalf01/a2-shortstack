const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const
        input_task = document.getElementById('task'),
        input_date = document.getElementById('due-date'),
        current_date = new Date(),
        json = {task: input_task.value, creation_date: current_date, due_date: input_date.value},
        body = JSON.stringify(json)


    fetch('/submit', {
        method: 'POST',
        body
    }).then(response => {
        // After getting a response, ask for HTML for notes to add
        fetch('/list', {
            method: 'GET'
        }).then(async response => {
            document.getElementById('todolist').innerHTML = await response.text()
            updateButtons()
        })
    })

    return false
}

const deleteNote = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    fetch('/' + e.target.id.substring(6), {
        method: 'DELETE'
    }).then(async response => {
        document.getElementById('todolist').innerHTML = await response.text()
        updateButtons()
    })
}

const updateButtons = function () {
    const notesButtons = document.getElementsByClassName('deleteNote')
    let idx = 0
    for (let button of notesButtons) {
        button.onclick = deleteNote
        button.id = 'delete' + idx
        idx++
    }
}

window.onload = function () {
    const todoSubmit = document.getElementById('todoSubmit')
    todoSubmit.onclick = submit

    const addNote = document.getElementById('addNote')
    addNote.oninput = () => {
        addNote[2].disabled = addNote[0].value.trim() === '' || addNote[1].value.trim() === '';
        console.log(addNote[1])
    }
}