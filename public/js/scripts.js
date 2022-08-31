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
    }).then(() => {
        showTable()
    })

    return false
}

const deleteNote = function (e) {
    fetch('/' + e.target.id.substring(6), {
        method: 'DELETE'
    }).then(async response => {
        document.getElementById('todolist').innerHTML = await response.text()
        showButtons()
    })
}

const showTable = function () {
    // After getting a response, ask for HTML of notes to add
    fetch('/list', {
        method: 'GET'
    }).then(async response => {
        document.getElementById('todolist').innerHTML = await response.text()
        showButtons()
    })
}

const showButtons = function () {
    const notesButtons = document.getElementsByClassName('deleteNote')
    let idx = 0
    for (let button of notesButtons) {
        button.onclick = deleteNote
        button.id = 'delete' + idx
        idx++
    }
}

window.onload = function () {
    // Show table immediately
    showTable()

    // Add submit functionality
    const todoSubmit = document.getElementById('todoSubmit')
    todoSubmit.onclick = submit

    // Only enable submit button if fields are filled out
    const addNote = document.getElementById('addNote')[0]
    addNote.oninput = () => {
        document.getElementById('todoSubmit').disabled = document.getElementById('task').value.trim() === '' || document.getElementById('due-date').value.trim() === ''
    }
}