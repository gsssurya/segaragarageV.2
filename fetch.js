export function sendOTP(telepon, otp){
    fetch("../php/otp.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "telepon=" + encodeURIComponent(telepon) + "&otp=" + encodeURIComponent(otp)
    })
    .then(response => response.text())
}

export function exportNewUser(data) {
    fetch("../php/insert-user.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
}