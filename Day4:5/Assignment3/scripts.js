function maritalStatusChange(value) {
    if (value == "married") {
        document.getElementById("spouseName").readOnly = false;
    } else document.getElementById("spouseName").readOnly = true;
}
function validateForm() {
    let firstName = document.getElementById("FirstName");
    let lastName = document.getElementById("LastName");
    let gender = document.getElementsByName("gender");
    let maritalStatus = document.getElementById("maritialStatus");
    let spouseName = document.getElementById("spouseName");
    let tncChecked = document.getElementById("tncCheckbox");
    let isFormOK = true;
    if (!firstName.value) {
        isFormOK = false;
        alert("Enter first name");
        firstName.focus();
        return false;
    } else if (!lastName.value) {
        isFormOK = false;
        alert("Enter last name");
        lastName.focus();
        return false;
    } else {
        let genderSelected = false;
        gender.forEach((val) =>
            val.checked == true ? (genderSelected = true) : null
        );
        
        if (!genderSelected){
            alert("Select gender");
            gender.focus();
            return false
        };
    }
    if (firstName.value.trim().indexOf(' ') >= 0) {
        isFormOK = false;
        alert("Enter firstname without adding any space");
        firstName.focus();
    } else if (lastName.value.indexOf(" ") >= 0) {
        isFormOK = false;
        alert("Enter lastname without adding any space");
        lastName.focus();
    } else if (maritalStatus.value == "married") {
        if (!spouseName.value) {
            isFormOK = false;
            alert("Enter spouse name");
            spouseName.focus();
            return false;
        } else {
            if (spouseName.value.trim().indexOf(" ") >= 0) {
                isFormOK = false;
                alert("Enter spouse name without adding any space");
                spouseName.focus();
                return false;
            }
        }
    }
    if (!tncChecked.checked) {
        alert("Plese accept terms and conditions");
        return false;
    }
    if (isFormOK) {
        alert("Thank You!");

        return true;
    }
    return false;
}