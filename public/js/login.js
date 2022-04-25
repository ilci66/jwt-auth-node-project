console.log("login module valid")

const loginForm = document.querySelector('.login-form');
const email = document.querySelector('#l-email');
const password = document.querySelector('#l-password');


loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log("wanna log in", email.value, password.value);

    try {
        const response = await fetch('/login', {
            method: 'POST', 
            body: JSON.stringify({
                email: email.value, 
                password: password.value
            }),
            headers: {
              'Content-Type': 'application/json'
            },
        })
        
        const data = await response.json();

        const { expiresIn } = await data;
        const { token } = await data
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        const expiresAt = Date.now() + Number.parseInt(expiresIn) * 86400 * 1000; // day
        localStorage.setItem('id_token', token);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
        if(data){ window.location = '/'}

    } catch (error) {
        console.log("error in login", error)
    }
})
