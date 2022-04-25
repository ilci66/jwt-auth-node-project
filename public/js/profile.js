console.log("profile js")

const profileEmail = document.querySelector("#user-email");


const idToken = localStorage.getItem("id_token");
const expiresAt = localStorage.getItem("expires_at");

console.log(expiresAt, Date.now());

if(idToken && expiresAt >= Date.now()){
    const text = "The token exists and still valid, feel free to use it with the public key!"
    const h1 = document.createElement("h1")
    h1.innerText = text
    profileEmail.appendChild(h1)
}