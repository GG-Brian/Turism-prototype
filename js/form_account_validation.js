window.onload = initializer;

function initializer() {
    var accountForm = document.getElementById("registry");
    accountForm.addEventListener("submit", accountFormValidation, false);
}

function accountFormValidation(event) {
    event.preventDefault();
    var userMail = event.target["account-email"].value;
    var passwd = event.target["account-password"].value;

    // if the value writen in both fields are correct for a certain firebase account..
    firebase.auth().signInWithEmailAndPassword(userMail, passwd)
        .then((user) => {
            // it the valid account ISN'T the next one (admin account), user will be redirected to
            // it's page (where only the "U" letter of the CRUD maintenance (Update) is allowed),
            // else the user will be redirected to another page where the CRUD is full (both CRUD
            // maintenances will be related to the other as they modify the same firebase database)
            if (userMail == "mrbrainsaysgg@gmail.com") {
                firebase.auth().signOut().then(() => {});
                window.location.href = "formulary_admin.html";
                

            } else if (userMail == "anonymous@user.com") {
                firebase.auth().signOut().then(() => {});         
                window.location.href = "formulary_client.html";
                
            } else {
                errorIndicator = document.getElementById("err-credentials").style.display = "block";
            }
        })
        // if an error ocurred validating the credentials..
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            errorIndicator = document.getElementById("err-credentials").style.display = "block";
        });
}