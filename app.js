const api_url = "http://localhost:6060";

const signupRoute = "/auth/signup";
const signinRoute = "/auth/login";

const signupForm = document.querySelector(".signupForm");
const signinForm = document.querySelector(".loginForm");

// refrence the message tag
const info = document.getElementById("msg");

const handleSignup = async (e) => {
  //prevents the browser from reloading upon submission
  e.preventDefault();

  // set info message
  info.innerText = "Submitting data...";

  // gets user"s input from the form
  const userData = {
    firstName: e.target.firstName.value,
    email: e.target.email.value,
    gender: e.target.gender.value,
    mobile: e.target.mobile.value,
    password: e.target.password.value,
  };
  console.log(userData);

  // sends data to the server to process
  try {
    //resolves fetch promise
    const res = await fetch(api_url + signupRoute, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "content-type": "application/json",
      },
    });
    //resolves res.json()'s promise
    const jsonResponse = await res.json();

    info.innerText = jsonResponse.message;
    if (jsonResponse.success) {
      //change text color
      info.className = "success";
      // redirect to login page after successful response
      window.setTimeout(() => {
        window.location.pathname = "/login.html";
      }, 3000);
    } else {
      //change text color
      info.className = "error";
    }
    // previews response in the console
    console.log(jsonResponse);
  } catch (error) {
    console.error(error);

    info.innerText = error.message;
    //change text color
    info.className = "error";
  }
};
// -------------------------------------------------------------

const handleSignin = async (e) => {
  // prevents the browser from reloading upon submission
  e.preventDefault();

  info.innerText = "Submitting data...";

  // gets the users input from the form
  const logInfo = {
    email: e.target.email.value,
    password: e.target.password.value,
  };
  console.log(logInfo);

  // sends data to the server to process
  try {
    // resolves fetch promise
    const res = await fetch(api_url + signinRoute, {
      method: "POST",
      body: JSON.stringify(logInfo),
      headers: {
        "content-type": "application/json",
      },
    });
    // resolves res.json()'s promise
    const jsonResponse = await res.json();

    info.innerText = jsonResponse.message;
    if (jsonResponse.success) {
      // change text color
      info.className = "success";

      // save auth token in local storage
      localStorage.setItem("token", jsonResponse.token);

      //redirect to profile page after successful response
      window.setTimeout(() => {
        window.location.pathname = "/profile.html";
      }, 3000);
    } else {
      // change text color
      info.className = "error";
    }
    //previews response in the console
    console.log(jsonResponse);
  } catch (error) {
    console.error(error);

    info.innerText = error.message;
    // change text color
    info.className = "error";
  }
};
// -------------------------------------------------------------

// adds event listener to the signup form
signupForm?.addEventListener("submit", handleSignup);

// adds event listener to the signin form
signinForm?.addEventListener("submit", handleSignin);

// signupForm.addEventListener("submit", handleSignup);

// -------------------------------------------------------------
