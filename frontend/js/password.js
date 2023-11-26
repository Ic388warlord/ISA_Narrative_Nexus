const endPointRoot = "https://jdefazmxvy.us18.qoddiapp.com";

function submitForm() {
  // You can add your logic for handling the form submission here
  // For this example, we'll just display a success message
  const email = document.getElementById("email").value;
  const successMessage = document.getElementById("successMessage");
  const xhttp = new XMLHttpRequest();
  const endPoint = "/api/v1/auth/forgotpassword/";

  xhttp.open("GET", endPointRoot + endPoint + email, true);
  xhttp.setRequestHeader("Content-Type", "text/plain");
  xhttp.withCredentials = true;
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {

        console.log(JSON.stringify(this.responseText))

      if (this.status === 200) {
        successMessage.innerHTML = "Email to reset password have been sent!";
        const submit = (document.getElementById("submit_button").style.display =
          "none");
        const back = (document.getElementById("back_button").style.display =
          "inline-block");
      } else {
        console.error("Request failed");
      }
    }
  };
}


document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.getElementById("submit_button");
    submitButton.addEventListener("click", submitForm);
  });
