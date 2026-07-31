async function loadEmployees() {

    const response = await fetch("http://localhost:3000/employees");
    const employees = await response.json();

    const grid = document.getElementById("employee-grid");

    grid.innerHTML = "";

    employees.forEach(employee => {

        let buttonText =
            employee.status === "Coming Soon"
                ? "Coming Soon"
                : "Open Dashboard";

        let price =
            employee.price
                ? `$${employee.price}/${employee.currency}`
                : "";

        grid.innerHTML += `
            <div class="employee-card">

                <div class="employee-top">

                    <div>
                        <h3>🤖 ${employee.name}</h3>
                        <span class="status">${employee.status}</span>
                    </div>

                </div>

                <p>${employee.category}</p>

                <h4>${price}</h4>

                <button
                    class="open-btn"
                    ${employee.status === "Coming Soon" ? "disabled" : ""}>

                    ${buttonText}

                </button>

            </div>
        `;

    });

    grid.innerHTML += `
        <div class="add-card">

            <div class="plus">🚀</div>

            <h3>Deploy a New AI Employee</h3>

            <p>Expand your workforce with another AI employee built for your business.</p>

            <button>Browse AI Marketplace</button>

        </div>
    `;

}

loadEmployees();