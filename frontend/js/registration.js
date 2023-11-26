import * as commonStrings from "./common_strings.js";

const endPointRoot = commonStrings.SERVER_URL;
const endPoint = commonStrings.ENDPOINT_REGISTER;

function register() {
  const username = document.getElementById("regUsername").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const firstName = document.getElementById("regFirstName").value;

  const xhttp = new XMLHttpRequest();

  const data = {
    username: username,
    email: email,
    password: password,
    firstname: firstName,
  };

  xhttp.open(commonStrings.POST, endPointRoot + endPoint, true);
  xhttp.setRequestHeader(commonStrings.CONTENT_TYPE, commonStrings.APPLICATION_JSON);
  xhttp.withCredentials = true;
  xhttp.send(JSON.stringify(data));

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 201) {
        const jsonData = JSON.parse(this.response);
        console.log(jsonData);

        // Display success message
        document.getElementById("successMessage").innerText = commonStrings.REGISTRATION_SUCCESS;

        // Redirect to login page after 3 seconds
        setTimeout(function () {
          window.location.href = commonStrings.INDEX_HTML;
        }, 3000);
      } else {
        const jsonData = JSON.parse(this.response);
        document.getElementById("successMessage").innerText = jsonData.message;

      }
    }
  };
}

// Add event listener after the DOM has fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const registerButton = document.getElementById("registerButton");
    registerButton.addEventListener("click", register);
  });