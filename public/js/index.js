console.log("js module valid")

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
        console.log("data response from server ==>",data);

    } catch (error) {
        console.log("error is ==>",error)
    }
})