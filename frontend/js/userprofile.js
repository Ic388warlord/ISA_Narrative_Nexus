import * as commonStrings from "./common_strings.js";

const endPointRoot = commonStrings.SERVER_URL;
let currentStoryObject;
let currentUser;

checkUserInfo()
  .then(async (info) => {
    currentUser = info;
    if (info.statusCode == 401) {
      window.location.href = commonStrings.INDEX_HTML;
    }

    const userCount = await getUserCount(info);
    const stories = await getUserStories(info);
    showInfo(info, stories.stories, userCount);
  })
  .catch((error) => console.error(commonStrings.ERROR_ROLE, error));

// Add this function to fetch user stories
async function getUserStories(info) {
  const endPoint = `${commonStrings.ENDPOINT_GET_STORIES_USERNAME}${info.username}`;

  try {
    const response = await fetch(endPointRoot + endPoint, {
      method: commonStrings.GET,
      headers: {
        [commonStrings.CONTENT_TYPE]: [commonStrings.APPLICATION_JSON],
      },
      credentials: commonStrings.INCLUDE,
    });

    if (!response.ok) {
      throw new Error(
        `${commonStrings.ERROR_USER_STORIES} Status: ${response.status}`
      );
    }

    const jsonData = await response.json();
    return jsonData || []; // Return an empty array if stories is undefined
  } catch (error) {
    console.error(commonStrings.ERROR_USER_STORIES, error);
    return []; // Return an empty array on error
  }
}

// Update the showInfo function to include user stories
async function showInfo(info, stories, userCount) {
  const userInfoDiv = document.getElementById("userInfoDiv");

  // Create a div to hold user information
  const userDiv = document.createElement("div");

  // Populate user information
  userDiv.innerHTML = `
            <h2>User Information</h2>
            <p><strong>Email:</strong> ${info.email}</p>
            <p><strong>Username:</strong> ${info.username}</p>
            <p><strong>API Count:</strong> ${userCount.count}</p>
        `;

  // Append the userDiv to userInfoDiv
  userInfoDiv.appendChild(userDiv);

  const userStoriesSlider = document.getElementById("userStoriesSlider");
  const storiesDiv = document.createElement("div");

  // // Populate user stories
  stories.forEach((story) => {
    const storyElement = document.createElement("p");
    storyElement.innerHTML = `<span class="story" data-id="${story.id}">${story.title}</span>`;
    storiesDiv.appendChild(storyElement);

    // Add click event listener to each story element
    storyElement.addEventListener("click", async () => {
      const storyId = story.id;
      const storyObject = await getStoriesID(storyId);
      populateUserStoriesDetail(storyObject.storyinfo);
    });
  });

  // // // Append the storiesDiv to userStoriesSlider
  userStoriesSlider.appendChild(storiesDiv);

  // // // Initialize Slick slider
  $("#userStoriesSlider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  });
}

function getStoriesID(id) {
  const endPoint = commonStrings.ENDPOINT_GET_STORIES_ID;

  return fetch(endPointRoot + `${endPoint}${id}`, {
    method: commonStrings.GET,
    headers: {
      [commonStrings.CONTENT_TYPE]: [commonStrings.APPLICATION_JSON],
    },
    credentials: commonStrings.INCLUDE,
  })
    .then((response) => response.json())
    .then((jsonData) => jsonData)
    .catch((error) => {
      return response.json();
    });
}

function populateUserStoriesDetail(storyObject) {
  const userStoriesDetailDiv = document.getElementById("userStoriesDetail");

  // Create a div to hold story details
  const storyDetailDiv = document.createElement("div");
  storyDetailDiv.innerHTML = "";

  currentStoryObject = storyObject;

  // Populate story details
  storyDetailDiv.innerHTML = `
          <h2>${storyObject.title}</h2>
          <p><strong>Time:</strong> ${storyObject.updatedat}</p>
          <p><strong>Genre:</strong> ${storyObject.genre}</p>
          <p class="story-text">${storyObject.story}</p>
          <button id="edit-button" >Edit</button>
          <button id="delete-button" >Delete</button>
          <button id="cancel-button" style="display: none">Cancel</button>
        `;

  // Clear the userStoriesDetailDiv before appending the new details
  userStoriesDetailDiv.innerHTML = "";

  // Append the storyDetailDiv to userStoriesDetailDiv
  userStoriesDetailDiv.appendChild(storyDetailDiv);

  // Add this after creating the buttons in the showInfo function
  const editButton = document.getElementById("edit-button");
  const deleteButton = document.getElementById("delete-button");
  const cancelButton = document.getElementById("cancel-button");

  editButton.addEventListener("click", editStory);
  deleteButton.addEventListener("click", deleteStory);


  function deleteStory() {
    const endPoint = commonStrings.ENDPOINT_DELETE_STORIES;
    const deleteData = {
      storyid: currentStoryObject.id,
    };

    return fetch(endPointRoot + endPoint, {
      method: commonStrings.DELETE,
      headers: {
        [commonStrings.CONTENT_TYPE]: [commonStrings.APPLICATION_JSON],
      },
      credentials: commonStrings.INCLUDE,
      body: JSON.stringify(deleteData),
    })
      .then((response) => response.json())
      .then((jsonData) => {
        const userStoriesDetail = document.getElementById("userStoriesDetail");
        userStoriesDetail.innerHTML = jsonData.message;
      });
  }

  function editStory() {
    const storyTextElement = document.querySelector(".story-text");

    if (storyTextElement) {
      const storyText = storyTextElement.textContent;
  
      const cancelButton = document.getElementById("cancel-button");
      const editButton = document.getElementById("edit-button");
      const deleteButton = document.getElementById("delete-button");
  
      editButton.textContent = "Save";
      cancelButton.style.display = "inline-block";
      deleteButton.style.display = "none";
  
      // Create a textarea element
      const textareaElement = document.createElement("textarea");
      textareaElement.value = storyText;
      textareaElement.classList.add("edited-story");
  
      // Replace the existing story text with the textarea
      storyTextElement.replaceWith(textareaElement);
  
      cancelButton.onclick = function () {
        // Replace the textarea with the original story text
        textareaElement.replaceWith(storyTextElement);
  
        // Reset the button texts and display
        editButton.textContent = "Edit";
        cancelButton.style.display = "none";
        deleteButton.style.display = "inline-block";
  
        // Set the onclick event for the edit button back to editStory
        editButton.onclick = editStory;
      };
  
      editButton.onclick = saveStory;

    }

  }
}

function saveStory() {
  const editedStoryTextarea = document.querySelector(".edited-story");
  const editedStoryText = editedStoryTextarea.value;
  const endPoint = commonStrings.ENDPOINT_EDIT_STORIES;

  const postStoryData = {
    storyid: currentStoryObject.id,
    story: editedStoryText,
  };

  return fetch(endPointRoot + endPoint, {
    method: commonStrings.PATCH,
    headers: {
      [commonStrings.CONTENT_TYPE]: [commonStrings.APPLICATION_JSON],
    },
    credentials: commonStrings.INCLUDE,
    body: JSON.stringify(postStoryData),
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(
          `${commonStrings.ERROR_UPDATE_STORIES} Status: ${response.status}`
        );
      } else {
        const updatedStoryPromise = await getStoriesID(currentStoryObject.id);
        const updatedStory = updatedStoryPromise.storyinfo;
        populateUserStoriesDetail(updatedStory);
      }
    })
    .catch((error) => {
      console.error(commonStrings.ERROR_UPDATE_STORIES, error);
    });
}

function checkUserInfo() {
  const endPoint = commonStrings.ENDPOINT_AUTH;
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

function getUserCount(info) {
  const endPoint = commonStrings.ENDPOINT_TOTAL_USER_REQUEST;
  return fetch(endPointRoot + `${endPoint}${info.username}`, {
    method: commonStrings.GET,
    headers: {
      [commonStrings.CONTENT_TYPE]: [commonStrings.APPLICATION_JSON],
    },
    credentials: commonStrings.INCLUDE,
  })
    .then((response) => response.json())
    .then((jsonData) => {
      return jsonData;
    });
}
