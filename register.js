var form = document.getElementById('form');
form.addEventListener('submit', e => {
    e.preventDefault();
    Inputvalidatation();
});
Inputvalidatation = () => {
    var role = document.getElementById("role").value;

    var usernameInput = document.getElementById("uname").value.trim();
    var emailInput = document.getElementById("email").value.trim();
    var mobileNO = document.getElementById('phoneNo').value;
    var passwordInput = document.getElementById("password").value.trim();
    var cpasswordInput = document.getElementById("cpassword").value.trim();
    var emailvalid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var passvalid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    var uservalid = /^[A-Za-z][A-Za-z]{7,29}$/;
    key = 0; a = 0; b = 0; c = 0;

    // Inputvalidation

    if (usernameInput === "") {
        SetError(uname, "Enter Username");
    } else if (!uservalid.test(usernameInput)) {
        console.log("nirmal");
        SetError(uname, "Enter Valid Username");
    } else {
        SetError(uname, "")
        key++;
    }

    if (emailInput === "") {
        SetError(email, "Enter Email Id");
    } else if (!emailvalid.test(emailInput)) {
        SetError(email, "Enter Valid Email Id");
    } else {
        SetError(email, "");
        key++;
    }

    if (mobileNO === "") {
        SetError(phoneNo, "Enter Mobile Number");
    } else if (isNaN(mobileNO) || mobileNO.length != 10) {
        SetError(phoneNo, "Enter valid Mobile Number")
    } else {
        SetError(phoneNo, "");
        key++;
    }

    if (passwordInput === "") {
        SetError(password, "Enter Password");
    } else if (!passvalid.test(passwordInput)) {
        SetError(password, "Enter Valid Password");
    } else {
        SetError(password, "");
        key++;
    }

    if (cpasswordInput === "") {
        SetError(cpassword, "Enter Confirm Password");
    } else if (cpasswordInput != passwordInput) {
        SetError(cpassword, "Password must be match");
    } else {
        SetError(cpassword, "");
        key++;
        console.log(role);
        store(role, usernameInput, emailInput, mobileNO, passwordInput, cpasswordInput);
    }

}
SetError = (input, message) => {
    const field = input.parentElement;
    const paragraph = field.querySelector("p");
    paragraph.innerHTML = message;
}

store = (role, usernameInput, emailInput, mobileNO, passwordInput, cpasswordInput) => {
    var array = JSON.parse(localStorage.getItem("data"));
    console.log(role);

    if (key === 5) {

        if (array === null) {
            console.log(role)

            var array = [];
            var object = {
                id: 1,
                Roll: role,
                username: usernameInput,
                email: emailInput,
                mobile: mobileNO,
                password: passwordInput,
                cpassword: cpasswordInput
            };
            array.push(object);
            localStorage.setItem("data", JSON.stringify(array));
            alert("Successfully Registered");
        } else {
            array.forEach(element => {
                if (emailInput === element.email) { a++; }
                if (usernameInput === element.username) { b++; }
            });
            if (a != 0) {
                SetError(email, "Email already exist")
            } else {
                SetError(email, "");
                c++;
            }
            if (b != 0) {
                SetError(uname, "Username already exist");
            } else {
                SetError(uname, "");
                c++;
            } if (c == 2) {
                var object = {
                    id:array.length+1,
                    Roll: role,
                    username: usernameInput,
                    email: emailInput,
                    mobile: mobileNO,
                    password: passwordInput,
                    cpassword: cpasswordInput
                };
                array.push(object);
                localStorage.setItem("data", JSON.stringify(array));
                alert("Successfully Registered")
                window.location.href = "login.html"
                console.log("inserted");

            }

        }
    }
}