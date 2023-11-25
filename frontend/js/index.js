import {
    SERVER_URL,
    ENDPOINT_LOGIN,
    POST,
    CONTENT_TYPE,
    APPLICATION_JSON,
    EMPTY_STRING,
    ID_INDEX_USERNAME,
    ID_INDEX_PASSWORD,
    ID_INDEX_FEEDBACK,
    ID_INDEX_FORMLOGIN,
    INVALID_LOGIN_ATTEMPT,
    INVALID_LOGIN_INPUT,
    ID_INDEX_FORGOTPASSWORD,
    ID_INDEX_LOGINBUTTON
} from "./common_strings.js";

// HTML ELEMENTS
const ELE_FORM_LOGIN = document.getElementById(ID_INDEX_FORMLOGIN);
const ELE_INPUT_USERNAME = document.getElementById(ID_INDEX_USERNAME);
const ELE_INPUT_PASSWORD = document.getElementById(ID_INDEX_PASSWORD);
const ELE_DIV_FEEDBACK = document.getElementById(ID_INDEX_FEEDBACK);
const BUTTON_FORGOTPASSWORD = document.getElementById(ID_INDEX_FORGOTPASSWORD);
const BUTTON_LOGIN = document.getElementById(ID_INDEX_LOGINBUTTON);

function login() {
    const username = ELE_INPUT_USERNAME.value.trim();
    const password = ELE_INPUT_PASSWORD.value;
    const xhttp = new XMLHttpRequest();
    ELE_DIV_FEEDBACK.innerText = EMPTY_STRING;

    const data = {
        username: username,
        password: password
    };

    if (data.username == EMPTY_STRING || data.password == EMPTY_STRING) {
        ELE_DIV_FEEDBACK.innerText = INVALID_LOGIN_INPUT;
    } else {
        xhttp.open(POST, SERVER_URL + ENDPOINT_LOGIN, true);
        xhttp.setRequestHeader(CONTENT_TYPE, APPLICATION_JSON);
        xhttp.withCredentials = true;

        xhttp.send(JSON.stringify(data));

        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    const jsonData = JSON.parse(this.response);
                    window.location.replace("./landing.html");
                } else {
                    ELE_DIV_FEEDBACK.innerText = INVALID_LOGIN_ATTEMPT;
                }
            }
        };
    }
}

document.addEventListener("DOMContentLoaded", function() {
    BUTTON_LOGIN.addEventListener('click', function() {
        login();
    });

    ELE_FORM_LOGIN.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            login();
        }
    });

    BUTTON_FORGOTPASSWORD.addEventListener('click', function() {
        window.location.href = './password.html';
    });
});