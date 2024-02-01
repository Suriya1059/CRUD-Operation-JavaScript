const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const addBtn = document.getElementById("add-btn");
const tableBody = document.getElementById("table-body");
const updatebtn = document.getElementById("update-btn");
const cencalbtn = document.getElementById("cencal-btn");
const updateNameInput = document.getElementById("update-name-input");
const updateEmailInput = document.getElementById("update-email-input");
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUserId = null
function addUser() {
    debugger
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    if (name && email) {
        const id = users.lenght > 0 ? users[users.lenght - 1].id + 1 : 1;
        const user = { id, name, email };
        users.push(user);
        updateLocalStorageAndRender();
        clearInput();
    } else {
        alert("please provide a valid Name and Email");
    }
}
function updateLocalStorageAndRender() {
    renderTable();
}
function renderTable() {
    debugger
    tableBody.innerHTML ="";
    users.forEach((user) => {
        const { id, name, email } = user;
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${id}</td>
        <td>${name}</td>
        <td>${email}</td>
        <button class="btn btn-info"  id="edit-btn" onclick="editUser(${id})">Edit</button>
        <button class="btn btn-danger"  id="delete-btn" onclick="deleteUser(${id})">Cancel</button>
        </tr>`;
        tableBody.appendChild(tr);
    })
}   
function editUser(userId) {
    const user = users.find((user) => user.id === userId);
    if (user) {
        currentUserId = userId;
        updateNameInput.value = user.name;
        updateEmailInput.value = user.email;
        showUpdateForm();
    }
}
function deleteUser(userId) {
    users = users.filter((user) => user.id !== userId);
    updateLocalStorageAndRender();
    hideUpdateForm();
}
function updateUser() {
    const name = updateNameInput.value.trim();
    const email = updateEmailInput.value.trim();
    if (name && email) {
        const index = users.findIndex((user) => user.id === currentUserId);
        if (index !== -1) {
            users[index].name = name;
            users[index].email = email;
            updateLocalStorageAndRender();
            hideUpdateForm();
        } else {
            alert("please provide a valid name and email")
        }
    }
}
function showUpdateForm() {
    updatebtn.addEventListener("click", updateUser);
    cencalbtn.addEventListener("click", hideUpdateForm);
    updatebtn.style.display="inline-block";
    cencalbtn.style.display="inline-block";
    updateEmailInput.style.display="inline-block";
    updateNameInput.style.display="inline-block";
    document.getElementById("update-container").style.display="block";
}
function hideUpdateForm() {
    updatebtn.removeEventListener("click", updateUser);
    cencalbtn.removeEventListener("click", hideUpdateForm);
    updatebtn.style.display="none";
    cencalbtn.style.display="none";
    updateEmailInput.style.display="none";
    updateNameInput.style.display="none";
    document.getElementById("update-container").style.display="none"
    updateLocalStorageAndRender();
}
function clearInput(){
    nameInput.value="";
    emailInput.value="";
}
addBtn.addEventListener("click", addUser);
renderTable();