document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    loginButton.addEventListener('click', () => {
        loginForm.submit();
    });

    signupButton.addEventListener('click', () => {
        registerForm.submit();
    });
});
document.addEventListener("DOMContentLoaded", () => {
   
    document.querySelector("#loginButton").addEventListener("click", async () => {
      
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;

        
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        
        const responseData = await fetch("/user/login", {
            method: "POST",
            body: formData
        }).then(res => res.json());

        
        if (responseData.success) {
           
            window.location.href = "/dashboard";
        } else {
           
            console.error("Login failed:", responseData.message);
        }
    });

   
    document.querySelector("#signupButton").addEventListener("click", async () => {
        
        const name = document.querySelector("#name").value;
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const confirmPassword = document.querySelector("#confirmPassword").value;

       
        if (password !== confirmPassword) {
            console.error("Passwords do not match");
            return; 
        }

       
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);

        
        const responseData = await fetch("/user/register", {
            method: "POST",
            body: formData
        }).then(res => res.json());

        
        if (responseData.success) {
            
            window.location.href = "/dashboard";
        } else {
            
            console.error("Registration failed:", responseData.message);
        }
    });
});
