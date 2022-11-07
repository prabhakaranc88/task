var form = document.getElementById('form');
form.addEventListener('submit', e => {
e.preventDefault();
Inputvalidatation();
});
Inputvalidatation = () => {
var usernameInput = document.getElementById("uname").value;
var passwordInput = document.getElementById("password").value;
var array = JSON.parse(localStorage.getItem("data"));
nameentry=0;

if (usernameInput === ""){ SetError(uname, "Enter Username or Email");}
if (passwordInput === ""){ SetError(password, "Enter password");}
else {
SetError(uname,"");
array.forEach(element => {
if (usernameInput === element.email || usernameInput === element.username) {
nameentry++;
if (passwordInput === element.password) {
SetError(password,"");

window.location.href="dashboard.html";

}else SetError(password,"Invalid password");
}
});
console.log("nameentry: ",nameentry);
if (nameentry === 0) {SetError(uname, "Invalid email or username");}
else{
SetError(uname,"");
}
}
}

SetError = (input, message) => {
const field = input.parentElement;
const paragraph = field.querySelector("p");
paragraph.innerHTML = message;
}