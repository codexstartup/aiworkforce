const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "login.html";

}
const API = "http://localhost:3000/employees";

let editingId = null;

const submitBtn = document.querySelector("#employeeForm button");

async function loadEmployees() {

    const res = await fetch(API);
    const employees = await res.json();

    const container = document.getElementById("employees");

    container.innerHTML = "";

    employees.forEach(employee => {

        container.innerHTML += `

        <div class="employee">

            <div>

                <h3>${employee.name}</h3>

                <p>
                    ${employee.category} |
                    ${employee.status} |
                    ${employee.price ? "$" + employee.price : "Coming Soon"}
                </p>

            </div>

            <div class="actions">

                <button onclick='editEmployee(${JSON.stringify(employee)})'>
                    Edit
                </button>

                <button class="delete" onclick="deleteEmployee(${employee.id})">
                    Delete
                </button>

            </div>

        </div>

        `;

    });

}

document.getElementById("employeeForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const employee = {

        name: document.getElementById("name").value,
        price: document.getElementById("price").value || null,
        currency: document.getElementById("currency").value || null,
        status: document.getElementById("status").value,
        category: document.getElementById("category").value

    };

    if (editingId == null) {

        await fetch(API, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(employee)

        });

    } else {

        await fetch(API + "/" + editingId, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(employee)

        });

        editingId = null;

    }

    document.getElementById("employeeForm").reset();

    submitBtn.innerText = "Add Employee";

    loadEmployees();

});

function editEmployee(employee) {

    editingId = employee.id;

    document.getElementById("name").value = employee.name;
    document.getElementById("price").value = employee.price ?? "";
    document.getElementById("currency").value = employee.currency ?? "";
    document.getElementById("status").value = employee.status;
    document.getElementById("category").value = employee.category;

    submitBtn.innerText = "Update Employee";

}

async function deleteEmployee(id) {

    await fetch(API + "/" + id, {
        method: "DELETE"
    });

    if (editingId === id) {
        editingId = null;
        document.getElementById("employeeForm").reset();
        submitBtn.innerText = "Add Employee";
    }

    loadEmployees();

}

loadEmployees();