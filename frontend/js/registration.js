const endPointRoot = "https://jdefazmxvy.us18.qoddiapp.com";

function register() {
  const username = document.getElementById("regUsername").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const firstName = document.getElementById("regFirstName").value;

  const xhttp = new XMLHttpRequest();
  const endPoint = "/api/v1/user/register";

  const data = {
    username: username,
    email: email,
    password: password,
    firstname: firstName,
  };

  xhttp.open("POST", endPointRoot + endPoint, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.withCredentials = true;
  xhttp.send(JSON.stringify(data));

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 201) {
        const jsonData = JSON.parse(this.response);
        console.log(jsonData);

        // Display success message
        document.getElementById("successMessage").innerText = "Registration successful.";

        // Redirect to login page after 3 seconds
        setTimeout(function () {
          window.location.href = "index.html";
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