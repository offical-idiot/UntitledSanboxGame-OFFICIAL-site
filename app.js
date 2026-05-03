let users = JSON.parse(localStorage.getItem("users") || "[]");
let posts = JSON.parse(localStorage.getItem("posts") || "[]");

let currentUser = localStorage.getItem("currentUser");
let currentRole = localStorage.getItem("role") || "guest";

// ---------- PAGE SWITCH ----------
function show(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(page).classList.remove("hidden");

  if (page === "forums") renderPosts();

  if (page === "admin" && currentRole !== "admin") {
    alert("Access denied");
    show("home");
  }
}

// ---------- SIGN UP ----------
function signup() {
  let u = document.getElementById("suUser").value;
  let p = document.getElementById("suPass").value;

  users.push({ u, p, role: "user" });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Account created!");
}

// ---------- LOGIN ----------
function login() {
  let u = document.getElementById("loginUser").value;
  let p = document.getElementById("loginPass").value;

  // 👑 HARD ADMIN ACCOUNT
  if (u === "GravityBox" && p === "admin") {
    currentUser = u;
    currentRole = "admin";

    localStorage.setItem("currentUser", u);
    localStorage.setItem("role", "admin");

    alert("Logged in as Admin");
    show("admin");
    return;
  }

  let found = users.find(x => x.u === u && x.p === p);

  if (found) {
    currentUser = found.u;
    currentRole = found.role;

    localStorage.setItem("currentUser", found.u);
    localStorage.setItem("role", found.role);

    alert("Logged in as " + found.role);
    show("home");
  } else {
    alert("Invalid login");
  }
}

// ---------- LOGOUT ----------
function logout() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("role");
  currentUser = null;
  currentRole = "guest";

  alert("Logged out");
  show("home");
}

// ---------- FORUM ----------
function postMessage() {
  let text = document.getElementById("postText").value;

  posts.push({
    user: currentUser || "Guest",
    role: currentRole,
    text
  });

  localStorage.setItem("posts", JSON.stringify(posts));
  renderPosts();
}

function renderPosts() {
  let div = document.getElementById("posts");
  div.innerHTML = "";

  posts.forEach(p => {
    div.innerHTML += `
      <p>
        <b>[${p.role}] ${p.user}:</b> ${p.text}
      </p>
    `;
  });
}

// ---------- ADMIN ----------
function clearPosts() {
  posts = [];
  localStorage.setItem("posts", JSON.stringify(posts));
  renderPosts();
  alert("All posts cleared");
}
