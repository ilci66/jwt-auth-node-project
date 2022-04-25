console.log("registry module valid")

const regForm = document.querySelector('.registery-form');
const password = document.querySelector('#fpassword');
const password2 = document.querySelector('#fpassword2');
const email = document.querySelector('#femail');


regForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    console.log("want to register", password.value, password2.value, email.value)

    try {
        const response = await fetch('/register', {
            method: 'POST', 
            body: JSON.stringify({
                email: email.value, 
                password: password.value, 
                password2: password2.value
            }),
            headers: {
              'Content-Type': 'application/json'
            },
        });
    
        const data = await response.json();

        const { expiresIn } = await data;
        const { token } = await data
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        const expiresAt = new Date.now() + Number.parseInt(expiresIn) * 86400 * 1000; // day
        localStorage.setItem('id_token', token);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
        if(data){ window.location = '/'}



    } catch (error) {
        console.log("error in registry ==>",error)
    }
})

