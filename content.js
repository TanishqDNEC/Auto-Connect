function handleLoginFlow() {
  // Check if user is on logout screen
  const logoutMsg = Array.from(document.querySelectorAll("p")).find(p =>
    p.textContent.includes("You have logged out from the network")
  );

  if (logoutMsg) {
    const regainBtn = document.querySelector("span.portal_link[onclick*='Reset']");
    if (regainBtn) {
      console.log("Detected logout screen. Clicking 'Regain access to the network'...");
      regainBtn.click();
    }
    return; // Stop here, don’t proceed to login
  }

  // Proceed with normal login
  chrome.storage.local.get(["username", "password"], ({ username, password }) => {
    if (!username || !password) return;

    const tryFill = () => {
      const usernameInput = document.getElementById("LoginUserPassword_auth_username");
      const passwordInput = document.getElementById("LoginUserPassword_auth_password");
      const loginButton = document.getElementById("UserCheck_Login_Button");

      if (usernameInput && passwordInput && loginButton) {
        usernameInput.focus();
        usernameInput.value = username;
        usernameInput.dispatchEvent(new Event("input", { bubbles: true }));

        passwordInput.focus();
        passwordInput.value = password;
        passwordInput.dispatchEvent(new Event("input", { bubbles: true }));

        loginButton.click();
      } else {
        setTimeout(tryFill, 500); // Keep retrying
      }
    };

    tryFill();
  });
}

// Run after DOM is loaded
window.addEventListener("load", () => {
  setTimeout(handleLoginFlow, 1000); // Slight delay to ensure full DOM load
});
