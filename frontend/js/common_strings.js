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
export const ENDPOINT_LOGOUT = "/api/v1/auth/logout";
export const ENDPOINT_GENERATE_STORIES = "/api/v1/story/generateStory";
export const ENDPOINT_SAVE_STORIES = "/api/v1/story/savestory";
export const ENDPOINT_ALL_USER_TOTAL_REQUEST = "/api/v1/user/allusertotalrequest";
export const ENDPOINT_INFO = "/api/v1/endpoint/info";
export const ENDPOINT_CHANGE_ROLE = "/api/v1/user/changerole";
export const ENDPOINT_OVERUSAGE = "/api/v1/user/overusage";
export const ENDPOINT_GET_USERS_DATA = "/api/v1/user/getallusers";

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
export const ADMIN = "ADMIN";
export const USER = "USER";
export const INLINE_BLOCK = "inline-block";
export const BLOCK = "block";
export const NONE = "none";

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

// OVERUSAGE
export const MESSAGE_MAX_OUT = "You have maxed out your usage. Please be caution with your usage.";
export const MESSAGE_ENTER_INPUT = "Enter some input.";
export const MESSAGE_RETURN_DATA = "Return data: ";
export const EP_INFO = "Endpoint's Information";
export const USER_INFO = "User's Information";
export const ERROR_ENDPOINT = "Error fetching endpoint data: ";
export const ERROR_USER_DATA = "Error fetching user data:";
export const MESSAGE_UPDATE = "Updated!";