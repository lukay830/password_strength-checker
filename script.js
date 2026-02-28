const passwordInput = document.getElementById("password");
const strengthBar = document.getElementById("strength-bar");
const strengthText = document.getElementById("strength-text");
const suggestionsList = document.getElementById("suggestions");
const toggleBtn = document.getElementById("toggleBtn");
const commonPasswords = [
    "123456",
    "password",
    "qwerty",
    "admin",
    "letmein",
    "welcome",
    "abc123"
];

passwordInput.addEventListener("input", checkStrength);

toggleBtn.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleBtn.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        toggleBtn.textContent = "Show";
    }
});

function containsCommonPattern(password) {
    const lowerPass = password.toLowerCase();

    for (let common of commonPasswords) {
        if (lowerPass.includes(common)) {

            let portion = common.length / password.length;

            if (portion >= 0.5) {
                return true;
            }
        }
    }
    return false;
}

function checkStrength() {
    const password = passwordInput.value;
    let score = 0;
    let suggestions = [];

    // Length check
    if (password.length >= 8) {
        score++;
    } else {
        suggestions.push("Use at least 8 characters.");
    }
    

    // Uppercase check
    if (/[A-Z]/.test(password)) {
        score++;
    } else {
        suggestions.push("Add at least one uppercase letter.");
    }

    // Number check
    if (/[0-9]/.test(password)) {
        score++;
    } else {
        suggestions.push("Include at least one number.");
    }

    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) {
        score++;
    } else {
        suggestions.push("Add at least one special character.");
    }
    if (commonPasswords.includes(password.toLowerCase())) {
        suggestions.push("This is a very common password!");
        score = 0;
    }
    if (containsCommonPattern(password)) {
        suggestions.push("This is a common password!");
        score = Math.min(score, 1);  // Force weak level
    }

    updateUI(score, suggestions);
}

function updateUI(score, suggestions) {
    const colors = ["red", "orange", "yellow", "green"];
    const texts = ["Weak", "Medium", "Strong", "Very Strong"];

    if (score === 0) {
        strengthBar.style.width = "0%";
        strengthText.textContent = "";
    } else {
        strengthBar.style.width = (score * 25) + "%";
        strengthBar.style.backgroundColor = colors[score - 1];
        strengthText.textContent = texts[score - 1];
    }

    suggestionsList.innerHTML = "";

    suggestions.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;

        if (item.includes("common pattern")) {
            li.style.color = "red";
            li.style.fontWeight = "bold";
        }

        suggestionsList.appendChild(li);
    });
}

