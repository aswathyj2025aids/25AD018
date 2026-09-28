const API = "http://localhost:8080";


// =====================================================
// DASHBOARD - READ USERS
// =====================================================

if (document.getElementById("userCount")) {

    loadUsers();

}


function loadUsers() {

    fetch(API + "/user/getall")

        .then(response => response.json())

        .then(users => {

            document.getElementById("userCount").innerText =
                users.length;

            let userList =
                document.getElementById("userList");

            userList.innerHTML = "";


            users.forEach(user => {

                userList.innerHTML += `

                    <div class="user-card">

                        <h3>${user.name}</h3>

                        <p>${user.email}</p>

                        <button
                            onclick="viewUser(${user.id}, '${user.name}')">
                            View Tasks
                        </button>

                        <button
                            class="edit-button"
                            onclick="editUser(
                                ${user.id},
                                '${user.name}',
                                '${user.email}',
                                '${user.password}'
                            )">
                            Edit
                        </button>

                        <button
                            class="delete-button"
                            onclick="deleteUser(${user.id})">
                            Delete
                        </button>

                    </div>

                `;

            });

        })

        .catch(error => {

            console.log(error);

        });

}


// =====================================================
// CREATE USER
// =====================================================

function createUser() {

    let name =
        document.getElementById("newUserName").value;

    let email =
        document.getElementById("newUserEmail").value;

    let password =
        document.getElementById("newUserPassword").value;


    if (name === "" ||
        email === "" ||
        password === "") {

        alert("Please fill all fields");

        return;

    }


    let user = {

        name: name,

        email: email,

        password: password

    };


    fetch(API + "/user/create", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(user)

    })

        .then(response => response.json())

        .then(data => {

            alert("User created successfully");

            document.getElementById("newUserName").value = "";

            document.getElementById("newUserEmail").value = "";

            document.getElementById("newUserPassword").value = "";

            loadUsers();

        })

        .catch(error => {

            console.log(error);

            alert("Unable to create user");

        });

}


// =====================================================
// UPDATE USER
// =====================================================

function editUser(id, oldName, oldEmail, oldPassword) {

    let name =
        prompt("Enter new name:", oldName);

    if (name === null) return;


    let email =
        prompt("Enter new email:", oldEmail);

    if (email === null) return;


    let password =
        prompt("Enter new password:", oldPassword);

    if (password === null) return;


    let user = {

        id: id,

        name: name,

        email: email,

        password: password

    };


    fetch(API + "/user/update", {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(user)

    })

        .then(response => response.json())

        .then(data => {

            alert("User updated successfully");

            loadUsers();

        })

        .catch(error => {

            console.log(error);

            alert("Unable to update user");

        });

}


// =====================================================
// DELETE USER
// =====================================================

function deleteUser(id) {

    let confirmDelete =
        confirm("Are you sure you want to delete this user?");


    if (!confirmDelete) return;


    fetch(API + "/user/delete/" + id, {

        method: "DELETE"

    })

        .then(response => response.text())

        .then(data => {

            alert(data);

            loadUsers();

        })

        .catch(error => {

            console.log(error);

            alert("Unable to delete user");

        });

}


// =====================================================
// OPEN USER PAGE
// =====================================================

function viewUser(id, name) {

    localStorage.setItem("userId", id);

    localStorage.setItem("userName", name);

    window.location.href = "user.html";

}


// =====================================================
// USER PAGE
// =====================================================

if (document.getElementById("taskListContainer")) {

    loadUserPage();

}


function loadUserPage() {

    let userId =
        localStorage.getItem("userId");

    let userName =
        localStorage.getItem("userName");


    document.getElementById("userName").innerText =
        userName + "'s Task Lists";


    loadTaskLists(userId);

}


// =====================================================
// READ TASK LISTS + TASKS
// =====================================================

function loadTaskLists(userId) {

    fetch(API + "/tasklists/getall")

        .then(response => response.json())

        .then(taskLists => {

            let container =
                document.getElementById("taskListContainer");

            let select =
                document.getElementById("taskList");


            container.innerHTML = "";

            select.innerHTML =
                '<option value="">Select Task List</option>';


            fetch(API + "/tasks/getall")

                .then(response => response.json())

                .then(tasks => {


                    taskLists.forEach(list => {


                        if (list.user &&
                            String(list.user.id) === String(userId)) {


                            // ADD LIST TO DROPDOWN

                            select.innerHTML += `

                                <option value="${list.id}">
                                    ${list.name}
                                </option>

                            `;


                            let listHTML = `

                                <div class="task-list">

                                    <h3>${list.name}</h3>

                                    <button
                                        class="edit-button"
                                        onclick="editList(
                                            ${list.id},
                                            '${list.name}'
                                        )">
                                        Edit List
                                    </button>

                                    <button
                                        class="delete-button"
                                        onclick="deleteList(${list.id})">
                                        Delete List
                                    </button>

                            `;


                            // SHOW TASKS

                            tasks.forEach(task => {


                                if (task.taskList &&
                                    String(task.taskList.id)
                                    === String(list.id)) {


                                    listHTML += `

                                        <div class="task">

                                            <h4>
                                                ${task.title}
                                            </h4>

                                            <p>
                                                Due Date:
                                                ${task.dueDate}
                                            </p>

                                            <p>
                                                Priority:
                                                ${task.priority}
                                            </p>

                                            <p>
                                                Status:
                                                ${task.completed
                                        ? "Completed"
                                        : "Pending"}
                                            </p>


                                            <button
                                                class="edit-button"
                                                onclick="editTask(
                                                    ${task.id},
                                                    '${task.title}',
                                                    '${task.dueDate}',
                                                    '${task.priority}',
                                                    ${task.completed},
                                                    ${list.id}
                                                )">
                                                Edit
                                            </button>


                                            <button
                                                class="delete-button"
                                                onclick="deleteTask(${task.id})">
                                                Delete
                                            </button>

                                        </div>

                                    `;

                                }

                            });


                            listHTML += `</div>`;


                            container.innerHTML += listHTML;

                        }

                    });

                });

        })

        .catch(error => {

            console.log(error);

        });

}


// =====================================================
// TODAY TASKS
// =====================================================

function loadTodayTasks() {

    fetch(API + "/tasks/today")

        .then(response => response.json())

        .then(tasks => {

            let container =
                document.getElementById("todayTasks");

            container.innerHTML = "";


            if (tasks.length === 0) {

                container.innerHTML =
                    "<p>No tasks due today.</p>";

                return;

            }


            tasks.forEach(task => {

                container.innerHTML += `

                    <div class="task">

                        <h4>
                            ${task.title}
                        </h4>

                        <p>
                            Due Date:
                            ${task.dueDate}
                        </p>

                        <p>
                            Priority:
                            ${task.priority}
                        </p>

                        <p>
                            Status:
                            ${task.completed
                    ? "Completed"
                    : "Pending"}
                        </p>

                    </div>

                `;

            });

        })

        .catch(error => {

            console.log(error);

            document.getElementById("todayTasks").innerHTML =
                "<p>Unable to load today's tasks.</p>";

        });

}


// =====================================================
// CREATE TASK LIST
// =====================================================

function createList() {

    let name =
        document.getElementById("newListName").value;

    let userId =
        localStorage.getItem("userId");


    if (name === "") {

        alert("Enter list name");

        return;

    }


    let list = {

        name: name

    };


    fetch(API + "/tasklists/create/" + userId, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(list)

    })

        .then(response => response.json())

        .then(data => {

            alert("List created successfully");

            document.getElementById("newListName").value = "";

            loadTaskLists(userId);

        })

        .catch(error => {

            console.log(error);

            alert("Unable to create list");

        });

}


// =====================================================
// UPDATE TASK LIST
// =====================================================

function editList(id, oldName) {

    let name =
        prompt("Enter new list name:", oldName);


    if (name === null || name === "") return;


    let list = {

        id: id,

        name: name

    };


    fetch(API + "/tasklists/update", {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(list)

    })

        .then(response => response.json())

        .then(data => {

            alert("List updated successfully");

            loadTaskLists(
                localStorage.getItem("userId")
            );

        })

        .catch(error => {

            console.log(error);

            alert("Unable to update list");

        });

}


// =====================================================
// DELETE TASK LIST
// =====================================================

function deleteList(id) {

    if (!confirm("Delete this list?")) return;


    fetch(API + "/tasklists/delete/" + id, {

        method: "DELETE"

    })

        .then(response => response.text())

        .then(data => {

            alert(data);

            loadTaskLists(
                localStorage.getItem("userId")
            );

        })

        .catch(error => {

            console.log(error);

            alert("Unable to delete list");

        });

}


// =====================================================
// CREATE TASK
// =====================================================

function addTask() {

    let title =
        document.getElementById("taskTitle").value;

    let dueDate =
        document.getElementById("taskDueDate").value;

    let priority =
        document.getElementById("taskPriority").value;

    let taskListId =
        document.getElementById("taskList").value;


    if (title === "" ||
        dueDate === "" ||
        taskListId === "") {

        alert("Please fill all fields");

        return;

    }


    let task = {

        title: title,

        dueDate: dueDate,

        priority: priority,

        completed: false,

        taskList: {

            id: Number(taskListId)

        }

    };


    fetch(API + "/tasks/create", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(task)

    })

        .then(response => {

            if (!response.ok) {

                throw new Error("Failed");

            }

            return response.json();

        })

        .then(data => {

            alert("Task added successfully");

            document.getElementById("taskTitle").value = "";

            document.getElementById("taskDueDate").value = "";

            document.getElementById("taskPriority").value = "LOW";

            document.getElementById("taskList").value = "";


            loadTaskLists(
                localStorage.getItem("userId")
            );

        })

        .catch(error => {

            console.log(error);

            alert("Unable to add task");

        });

}


// =====================================================
// UPDATE TASK
// =====================================================

function editTask(
    id,
    oldTitle,
    oldDate,
    oldPriority,
    oldCompleted,
    oldListId
) {

    let title =
        prompt("Enter new title:", oldTitle);

    if (title === null) return;


    let date =
        prompt("Enter due date:", oldDate);

    if (date === null) return;


    let priority =
        prompt(
            "Enter priority LOW / MEDIUM / HIGH:",
            oldPriority
        );

    if (priority === null) return;


    let completed =
        confirm(
            "Click OK if task is completed.\nClick Cancel if pending."
        );


    let task = {

        id: id,

        title: title,

        dueDate: date,

        priority: priority,

        completed: completed,

        taskList: {

            id: oldListId

        }

    };


    fetch(API + "/tasks/update", {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(task)

    })

        .then(response => response.json())

        .then(data => {

            alert("Task updated successfully");

            loadTaskLists(
                localStorage.getItem("userId")
            );

        })

        .catch(error => {

            console.log(error);

            alert("Unable to update task");

        });

}


// =====================================================
// DELETE TASK
// =====================================================

function deleteTask(id) {

    if (!confirm("Delete this task?")) return;


    fetch(API + "/tasks/delete/" + id, {

        method: "DELETE"

    })

        .then(response => response.text())

        .then(data => {

            alert(data);

            loadTaskLists(
                localStorage.getItem("userId")
            );

        })

        .catch(error => {

            console.log(error);

            alert("Unable to delete task");

        });

}