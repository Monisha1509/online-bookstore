const form = document.getElementById("loginForm");
const errorText = document.getElementById("error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = form.elements[0].value;
  const password = form.elements[1].value;

  try {
    const res = await fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.status === 200) {
      localStorage.setItem("adminLoggedIn", "true");
      window.location.href = "admin-orders.html";
    } else {
      errorText.innerText = data.message || "Login failed";
    }
  } catch (err) {
    errorText.innerText = "Server error";
  }
});
