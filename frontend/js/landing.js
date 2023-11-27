import * as commonStrings from "./common_strings.js";

const endPointRoot = commonStrings.SERVER_URL;

let userData = "";

document.addEventListener("DOMContentLoaded", function () {
  getUsersInfo()
    .then(async (data) => {
      if (data.statusCode == 401) {
        window.location.href = commonStrings.INDEX_HTML;
      }

      userData = data;

      if (data.role === commonStrings.ADMIN) {
        document.getElementById("main-content-admin").style.display = commonStrings.INLINE_BLOCK;
        const usersCount = await getUsersCount();
        showUserData(usersCount);
        showEndpointData();
      } else {
        document.getElementById("main-content-user").style.display = commonStrings.INLINE_BLOCK;
      }
    })
    .catch((error) => console.error(commonStrings.ERROR_ROLE, error));

  // Add event listeners
  document.getElementById("logoutButton").addEventListener("click", logout);
  document.getElementById("button_generate_story").addEventListener("click", generateStory);
  document.getElementById("button_save_story").addEventListener("click", saveStory);
  document.getElementById("button_info").addEventListener("click", toggleAdminInfo);
});


function logout() {
  const xhttp = new XMLHttpRequest();
  const endPoint = commonStrings.ENDPOINT_LOGOUT;

  xhttp.open(commonStrings.GET, endPointRoot + endPoint, true);
  xhttp.setRequestHeader(commonStrings.CONTENT_TYPE, commonStrings.APPLICATION_JSON);
  xhttp.withCredentials = true;
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        const jsonData = JSON.parse(this.response);
        console.log(jsonData);

        // Redirect to landing.html after successful logout
        window.location.href = commonStrings.INDEX_HTML;
      }
    }
  };
}

async function generateStory() {
  const feedback = document.getElementById("feedback");
  const overusage = await checkOverusage();
  const endPoint = commonStrings.ENDPOINT_GENERATE_STORIES;

  if (overusage == true) {
    feedback.innerHTML =
      commonStrings.MESSAGE_MAX_OUT;
  }

  const TEXTAREA_STORY = document.getElementById("textarea_story");
  const SELECT_GENRE = document.getElementById("select_genre");
  const BUTTON_GENERATE_STORY = document.getElementById(
    "button_generate_story"
  );
  const BUTTON_SAVE_STORY = document.getElementById("button_save_story");
  const generatedTextElement = document.getElementById("generatedText");
  const SELECT_GENRE_TEXT = document.getElementById("select_genre_text");
  const INPUT_TITLE = document.getElementById("input_title");
  const INPUT_TITLE_TEXT = document.getElementById("input_title_text");

  const xhttp = new XMLHttpRequest();

  const DIV_RADIO_BUTTONS = document.getElementById("radio_button_scenarios");
  const DIV_GENERATING = document.getElementById("div_generating");

  const scenariosElement = document.getElementById("scenarios");

  // Get values
  const current_story = TEXTAREA_STORY.value;
  const current_genre = SELECT_GENRE.value;

  // Disable button to prevent spamming
  BUTTON_GENERATE_STORY.disabled = true;
  // Show api call indicator;
  DIV_GENERATING.style.display = commonStrings.BLOCK;

  // User has not given any input
  if (current_story.length < 1) {
    alert(commonStrings.MESSAGE_ENTER_INPUT);
    BUTTON_GENERATE_STORY.disabled = false;
    DIV_GENERATING.style.display = commonStrings.NONE;
  } else {
    // Set the data for the post request
    const data = {
      sentence: current_story,
      genre: current_genre,
    };

    xhttp.open(commonStrings.POST, endPointRoot + endPoint, true);
    xhttp.setRequestHeader(commonStrings.CONTENT_TYPE, commonStrings.APPLICATION_JSON);
    xhttp.withCredentials = true;

    xhttp.send(JSON.stringify(data));

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 201) {
          const jsonData = JSON.parse(this.response);
          console.log(commonStrings.MESSAGE_RETURN_DATA, jsonData);

          const updated_story = jsonData[0].generated_text;
          const scenarios = jsonData[1];

          // Set text area with updated story
          TEXTAREA_STORY.value = updated_story;

          // Clear the generated scenarios.
          scenariosElement.innerHTML = commonStrings.EMPTY_STRING;
          DIV_RADIO_BUTTONS.innerHTML = commonStrings.EMPTY_STRING;
          // Display all scenarios
          Object.keys(scenarios).forEach((scenarioKey) => {
            scenariosElement.innerText += `${scenarioKey}: ${scenarios[scenarioKey]}\n`;
          });

          createScenarioRadioButtons(scenarios, updated_story, TEXTAREA_STORY);

          BUTTON_GENERATE_STORY.disabled = false;
          DIV_GENERATING.style.display = commonStrings.NONE;
        } else {
          BUTTON_GENERATE_STORY.disabled = false;
          DIV_GENERATING.style.display = commonStrings.NONE;
        }
      }
    };
  }
}

function createScenarioRadioButtons(
  scenarios,
  current_story,
  textarea_element
) {
  const DIV_RADIO_BUTTONS = document.getElementById("radio_button_scenarios");

  Object.keys(scenarios).forEach(function (scenarioKey) {
    const radioBtn = document.createElement("input");
    radioBtn.type = "radio";
    radioBtn.name = "scenario";
    radioBtn.value = scenarioKey;
    radioBtn.id = scenarioKey;

    radioBtn.addEventListener("change", function () {
      appendScenario(scenarioKey, current_story);
    });

    const label = document.createElement("label");
    label.htmlFor = scenarioKey;
    label.textContent = "Scenario " + scenarioKey.slice(-1);

    DIV_RADIO_BUTTONS.appendChild(radioBtn);
    DIV_RADIO_BUTTONS.appendChild(label);
    DIV_RADIO_BUTTONS.appendChild(document.createElement("br"));
  });

  function appendScenario(selectedScenarioKey, current_story) {
    const selectedScenario = scenarios[selectedScenarioKey];
    textarea_element.value = current_story + ". " + selectedScenario;
  }
}

function getUsersInfo() {

  const endPoint = commonStrings.ENDPOINT_AUTH
  return fetch(endPointRoot + endPoint, {
    method: commonStrings.GET,
    headers: {
      [commonStrings.CONTENT_TYPE]: [commonStrings.APPLICATION_JSON],
    },
    credentials: commonStrings.INCLUDE,
  })
    .then((response) => response.json())
    .then((jsonData) => jsonData)
    .catch((error) => {
      console.error(commonStrings.ERROR_ROLE, error);
      return jsonData;
    });
}

function saveStory() {

  const TEXTAREA_STORY = document.getElementById("textarea_story");
  const SELECT_GENRE = document.getElementById("select_genre");
  const INPUT_TITLE = document.getElementById("input_title");

  const savedStory = TEXTAREA_STORY.value;
  const savedGenre = SELECT_GENRE.value;
  const savedTitle = INPUT_TITLE.value;

  const xhttp = new XMLHttpRequest();
  const endPoint = commonStrings.ENDPOINT_SAVE_STORIES;
  xhttp.open(commonStrings.POST, endPointRoot + endPoint, true);
  xhttp.setRequestHeader(commonStrings.CONTENT_TYPE, commonStrings.APPLICATION_JSON);
  xhttp.withCredentials = true;

  const savedData = {
    title: savedTitle,
    story: savedStory,
    genre: savedGenre,
    username: userData.username,
  };
  console.log(savedData);

  xhttp.send(JSON.stringify(savedData));

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 201) {
        const jsonData = JSON.parse(this.response);
        feedback.innerText = `Saved!\n
      Saved at: ${jsonData.updatetime}`;
      }
    }
  };
}

function getUsersCount() {

  const endPoint = commonStrings.ENDPOINT_ALL_USER_TOTAL_REQUEST;

  return fetch(endPointRoot + endPoint, {
    method: commonStrings.GET,
    headers: {
      [commonStrings.CONTENT_TYPE]: [commonStrings.APPLICATION_JSON],
    },
    credentials: commonStrings.INCLUDE,
  })
    .then((response) => response.json())
    .then((jsonData) => {
      // console.log(jsonData)

      return jsonData;
    });
}

function toggleAdminInfo() {
  const userTable = document.getElementById("userTable");
  const endpointTable = document.getElementById("endpointTable");
  const button = document.getElementById("button_info");

  if (endpointTable.style.display == commonStrings.NONE) {
    userTable.style.display = commonStrings.NONE;
    endpointTable.style.display = commonStrings.INLINE_BLOCK;
    button.textContent = commonStrings.EP_INFO;
  } else {
    userTable.style.display = commonStrings.INLINE_BLOCK;
    endpointTable.style.display = commonStrings.NONE;
    button.textContent = commonStrings.USER_INFO;
  }
}

function showEndpointData() {

  const endPoint = commonStrings.ENDPOINT_INFO

  const table = document.getElementById("endpointTable");

  fetch(endPointRoot + endPoint, {
    method: commonStrings.GET,
    headers: {
      [commonStrings.CONTENT_TYPE]: [commonStrings.APPLICATION_JSON],
    },
    credentials: commonStrings.INCLUDE,
  })
    .then((response) => response.json())
    .then((jsonData) => {
      table.innerHTML =
        "<tr><th>ID</th><th>Method</th><th>Name</th><th>Count</th></tr>";

      jsonData.forEach((info) => {
        const row = table.insertRow();
        row.insertCell(0).innerText = info.id;
        row.insertCell(1).innerText = info.method;
        row.insertCell(2).innerText = info.name;
        row.insertCell(3).innerText = info.count;
      });
    })
    .catch((error) => console.error(commonStrings.ERROR_ENDPOINT, error));
}

// Function to handle role selection
function handleRoleSelection(userName, currentRole) {
  const xhttp = new XMLHttpRequest();

  const dataRole = {
    username: userName,
    role: currentRole,
  };

  console.log(dataRole);

  const endPoint = commonStrings.ENDPOINT_CHANGE_ROLE;

  xhttp.open(commonStrings.PATCH, endPointRoot + endPoint, true);
  xhttp.setRequestHeader(commonStrings.CONTENT_TYPE, commonStrings.APPLICATION_JSON);
  xhttp.withCredentials = true;

  xhttp.send(JSON.stringify(dataRole));

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        
      }
    }
  };
}

// Function to update the role in the table
function updateRoleInTable(userId, newRole) {
  const roleCell = document.getElementById(`role-${userId}`);
  if (roleCell) {
    roleCell.innerText = newRole;
  }
}

function checkOverusage() {
  const endPoint = commonStrings.ENDPOINT_OVERUSAGE;

  return fetch(endPointRoot + endPoint, {
    method: commonStrings.GET,
    headers: {
      [commonStrings.CONTENT_TYPE]: [commonStrings.APPLICATION_JSON],
    },
    credentials: commonStrings.INCLUDE,
  })
    .then((response) => response.json())
    .then((jsonData) => {
      return jsonData.overUsage;
    });
}

function showUserData(usersCount) {
  const table = document.getElementById("userTable");

  const endPoint = commonStrings.ENDPOINT_GET_USERS_DATA;

  fetch(endPointRoot + endPoint, {
    method: commonStrings.GET,
    headers: {
      [commonStrings.CONTENT_TYPE]: [commonStrings.APPLICATION_JSON],
    },
    credentials: commonStrings.INCLUDE,
  })
    .then((response) => response.json())
    .then((jsonData) => {
      table.innerHTML =
        "<tr><th>ID</th><th>Email</th><th>Firstname</th><th>Username</th><th>Role</th><th>API Count</th></tr>";

      jsonData.data.forEach((user) => {
        const row = table.insertRow();
        row.insertCell(0).innerText = user.id;
        row.insertCell(1).innerText = user.email;
        row.insertCell(2).innerText = user.firstname;
        row.insertCell(3).innerText = user.username;

        // Create a dropdown list for the "Role" column
        const roleCell = row.insertCell(4);
        const roleSelect = document.createElement("select");
        roleSelect.id = `role-${user.username}`;

        const options = [commonStrings.USER, commonStrings.ADMIN];
        options.forEach((option) => {
          const optionElement = document.createElement("option");
          optionElement.value = option;
          optionElement.text = option;
          roleSelect.add(optionElement);
        });

        // Set the initial selected value
        roleSelect.value = user.role;

        // Add change event to handle role selection
        roleSelect.addEventListener("change", function () {
          const previousRole = user.role;
          const newRole = roleSelect.value;

          const isConfirmed = confirm(
            `Change role of ${user.username} to ${newRole}?`
          );

          if (isConfirmed) {
            handleRoleSelection(user.username, newRole);
          } else {
            roleSelect.value = previousRole;
          }
        });

        // Append the dropdown list to the cell
        roleCell.appendChild(roleSelect);

        const matchingUserCount = usersCount.find(
          (countData) => countData.username === user.username
        );
        row.insertCell(5).innerText = matchingUserCount
          ? matchingUserCount.count
          : 0;
      });
    })
    .catch((error) => console.error(commonStrings.ERROR_USER_DATA, error));
}
