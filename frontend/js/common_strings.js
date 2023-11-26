// ENDPOINTS
export const SERVER_URL = "https://jdefazmxvy.us18.qoddiapp.com";
export const ENDPOINT_LOGIN = "/api/v1/auth/login";
export const ENDPOINT_REGISTER = "/api/v1/user/register";
export const ENDPOINT_FORGET_PASSWORD = "/api/v1/auth/forgotpassword/";
export const ENDPOINT_GET_STORIES_USERNAME = "/api/v1/story/getUserStories/" ;
export const ENDPOINT_GET_STORIES_ID = "/api/v1/story/getUserStory/";
export const ENDPOINT_DELETE_STORIES = "/api/v1/story/deletestory";
export const ENDPOINT_EDIT_STORIES = "/api/v1/story/editstory";
export const ENDPOINT_AUTH = "/api/v1/auth/me";
export const ENDPOINT_TOTAL_USER_REQUEST = "/api/v1/user/usertotalrequest/";

// METHODS
export const POST = "POST";
export const GET = "GET";
export const DELETE = "DELETE";
export const PATCH = "PATCH";

// HEADER STRINGS
export const CONTENT_TYPE = "Content-Type";
export const APPLICATION_JSON = "application/json";

// CREDENTIAL
export const INCLUDE = "include";

//HTML Pages
export const INDEX_HTML = "index.html";

// COMMON STRINGS
export const EMPTY_STRING = '';

// ELEMENT ID's
// index.html
export const ID_INDEX_USERNAME = "loginUsername";
export const ID_INDEX_PASSWORD = "loginPassword";
export const ID_INDEX_FEEDBACK = "feedback";
export const ID_INDEX_FORMLOGIN = "loginForm";
export const ID_INDEX_FORGOTPASSWORD = "forgotPasswordButton";
export const ID_INDEX_LOGINBUTTON = "loginButton";

// FEEDBACK
// index.html
export const INVALID_LOGIN_ATTEMPT = "Invalid entry, either invalid password or nonexistent username.";
export const INVALID_LOGIN_INPUT = "Please enter a username and password."

// REGISTRATION
export const REGISTRATION_SUCCESS = "Registration successful.";

// PASSWORD
export const PASSWORD_SUCCESS = "Email to reset password have been sent!";
export const PASSWORD_FAIL = "Email address is not found!";

// USER PROFILE
export const ERROR_ROLE = "Error checking user role: ";
export const ERROR_USER_STORIES = "Error fetching user stories.";
export const ERROR_UPDATE_STORIES = "Error updating stories."
