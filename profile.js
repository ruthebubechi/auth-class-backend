const api_url = "http://localhost:6060";
const profileRoute = "/user";

const fullName = document.querySelector(".fullName"),
  firstName = document.querySelector(".firstName"),
  email = document.querySelector(".email"),
  gender = document.querySelector(".gender"),
  mobile = document.querySelector(".mobile");

const logout = document.querySelector("#logout");

async function getProfile() {
  if (localStorage.getItem("token") == null)
    window.location.href = "/login.html";
  try {
    // fetches the student data from the server
    const res = await fetch(api_url + profileRoute, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    const jsonData = await res.json();
    fullName.textContent = jsonData.data.firstName;
    firstName.textContent = jsonData.data.firstName;
    email.textContent = jsonData.data.email;
    gender.textContent = jsonData.data.gender;
    mobile.textContent = jsonData.data.mobile;
  } catch (error) {
    console.error(error);
  }
}
getProfile();
function logoutUser() {
  window.localStorage.removeItem("token");
  window.location.href = "login.html";
}
logout?.addEventListener("click", logoutUser);

//  INSTRUCTIONS FOR LOGOUT

//   LINE 10,13, 33 - 37

// "/" = takes you to index.html
