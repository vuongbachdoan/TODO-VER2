export const validateEmail = (input) => {
    if(input.length === 0) return true;
    const regexString = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    return input.match(regexString);
}