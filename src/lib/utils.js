function uuid() {
    return (
        Math.random()
            .toString(36)
            .substring(2) +
        Math.random()
            .toString(36)
            .substring(2) +
        Math.random()
            .toString(36)
            .substring(2)
    );
}


function isValidEmail(email) {
    const emailPattern = /^.+@.+\..+$/;
    return emailPattern.test(email)
}

function isValidUsername(user) {
    const usernamePattern = /^[a-zA-Z0-9_]+$/;
    return usernamePattern.test(user)
}

export { uuid, isValidEmail, isValidUsername }