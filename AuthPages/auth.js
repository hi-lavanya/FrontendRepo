document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.querySelector("#login-btn");
    const signUpButton = document.querySelector("#signup-btn");

    if (loginButton) {
        loginButton.addEventListener("click", loginUser);
    }

    if (signUpButton) {
        console.log("Adding event listener to signup button");
        
        signUpButton.addEventListener("click", signUpUser);
    }
});

async function loginUser() {
    const email = document.querySelector("input[name='email']").value;
    const password = document.querySelector("input[name='password']").value;

    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    console.log("Sending login request to backend...");

    try {
        const response = await fetch("http://localhost:3000/auth/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log("Response:", data);

        if (response.ok) {
            alert("Login Successful");
            localStorage.setItem("token", data.token);
            window.location.href = "dashboard.html"; // Redirect user
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to connect to server.");
    }
}

async function signUpUser() {
    const nameInput = document.querySelector("input[name='name']");
    const emailInput = document.querySelector("input[name='email']");
    const passwordInput = document.querySelector("input[name='password']");
    const confirmPasswordInput = document.querySelector("input[name='cPassword']");


    if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
        console.error("Signup input fields not found!");
        return;
    }

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (!name || !email || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    console.log("Sending signup request...");

    try {
        const response = await fetch("http://localhost:3000/auth/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, confirmPassword }),
        });

        const data = await response.json();
        console.log("Response:", data);

        if (response.ok) {
            alert("Signup Successful");
            window.location.href = "login.html"; // Redirect to login page
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to connect to server.");
    }
}

