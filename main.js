
const openModal = () => document.getElementById('modal')
.classList.add('active')

const closeModal = () => {
    document.getElementById('modal').classList.remove('active')  
    clearFields()
}

// Validation

const isValidFields = () => {
   return document.getElementById('register').reportValidity()
}

const saveClient = () => {
    if(isValidFields()){
       const clientReveal = {
        nome: document.getElementById('name').value,
        email: document.getElementById('email-client').value,
        senha: document.getElementById('password-client').value,
       }
       const index = document.getElementById('name').dataset.index
       if(index=='new'){
        updateClient(index,clientReveal)
        updateTable()
        closeModal()
       }
       createClient(clientReveal) 
       updateTable()  
       clearFields()
       closeModal() 
    }
}

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value ="")
}

const fillFields = (client) => {
    document.getElementById('name').value = client.nome
    document.getElementById('email-client').value = client.email
    document.getElementById('password-client').value = client.senha
    document.getElementById('name').dataset.index = client.index
}

const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    openModal()
    clearFields()
}

const editDelete = (event) => {
    if(event.target.type == 'button'){

        const [action,index] = event.target.dataset.action.split('-')

        if(action == 'edit'){
            editClient(index)
        }else{
            deleteClient(index)
            updateTable()
        }

    }
}


// Events

document.getElementById('register-client')
.addEventListener('click', openModal)

document.getElementById('modalClose')
.addEventListener('click', closeModal)

document.getElementById('save')
.addEventListener('click', saveClient)

document.querySelector('#tableClient>tbody')
.addEventListener('click',editDelete)

// Create

const tempClient = {
    nome:"fgfgf",
    email:"fgfgfgf@gmail.com",
    senha:"*********", 
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('table_clients')) ?? []

const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push(client)
    localStorage.setItem("table_clients",JSON.stringify(dbClient))
}

// Read

const readClient= () => getLocalStorage()

// Update

const updateClient = (index,client)=> {
    const dbClient = readClient()
    dbClient[index] = client
    localStorage.setItem("table_clients",JSON.stringify(dbClient))
}

// Update registers

const createRow = (client,index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${client.nome}</td>
    <td>${client.email}</td>
    <td>${client.password}</td>
    <td>
        <button type="button" class="button green" data-action="edit-${index}">editar</button>
        <button type="button" class="button red" data-action="delete-${index}">excluir</button>
    </td>`
        
    document.querySelector('#tableClient>tbody').appendChild(newRow)
   
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row=>row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(createRow)
}

updateTable()

// Delete
const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index,1)
    localStorage.setItem("table_clients",JSON.stringify(dbClient))
}    


