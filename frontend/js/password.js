import * as commonStrings from "./common_strings.js";

const endPointRoot = commonStrings.SERVER_URL;
const endPoint = commonStrings.ENDPOINT_FORGET_PASSWORD;

function submitForm() {
  const email = document.getElementById("email").value;
  const successMessage = document.getElementById("successMessage");
  const back = document.getElementById("back_button");
  const xhttp = new XMLHttpRequest();

  xhttp.open(commonStrings.GET, endPointRoot + endPoint + email, true);
  xhttp.setRequestHeader(commonStrings.CONTENT_TYPE, commonStrings.APPLICATION_JSON);
  xhttp.withCredentials = true;
  xhttp.send();

  xhttp.onreadystatechange = function () {

    try {
      if (this.readyState === 4) {

        if (this.status === 200) {
          successMessage.innerHTML = commonStrings.PASSWORD_SUCCESS;
          const submit = (document.getElementById("submit_button").style.display =
            "none");
          back.style.display = "inline-block";
  
        } else {
          successMessage.innerHTML = commonStrings.PASSWORD_FAIL;
          back.style.display = "inline-block";
        }
      }
    } catch (error) {
      console.log(error)
    }


  };
}


document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.getElementById("submit_button");
    submitButton.addEventListener("click", submitForm);
  });
