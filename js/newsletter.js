/* =======================================
   Luzombra Studio - Newsletter Script
   Handles newsletter signup flow
   Integration: Mailchimp / ConvertKit ready
   ======================================= */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newsletter-form");
  if (!form) return;

  const emailInput = form.querySelector("input[name='email']");
  const submitBtn = form.querySelector("button[type='submit']");

  // Create feedback message container
  const feedback = document.createElement("div");
  feedback.classList.add("newsletter-feedback");
  form.appendChild(feedback);

  /* ---------- Helper Functions ---------- */
  const showMessage = (message, type = "info") => {
    feedback.textContent = message;
    feedback.className = `newsletter-feedback ${type}`;
    feedback.style.opacity = 1;
  };

  const clearMessage = () => {
    feedback.textContent = "";
    feedback.style.opacity = 0;
  };

  const validateEmail = (email) => {
    const regex = /^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,}$/;
    return regex.test(email);
  };

  /* ---------- Submission Handler ---------- */
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearMessage();

    const email = emailInput.value.trim();
    if (!validateEmail(email)) {
      showMessage("Please enter a valid email address.", "error");
      return;
    }

    // Disable UI while submitting
    submitBtn.disabled = true;
    emailInput.disabled = true;
    showMessage("Submitting...", "loading");

    try {
      /* -----------------------------
         Mock Integration Example:
         Replace this block with your real endpoint URL and API key.
         ----------------------------- */

      const response = await fetch("https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: "YOUR_CONVERTKIT_API_KEY",
          email: email,
        }),
      });

      if (response.ok) {
        showMessage("✨ Thank you for subscribing to Luzombra Studio updates!", "success");
        form.reset();
      } else {
        showMessage("Something went wrong. Please try again later.", "error");
      }
    } catch (error) {
      console.error("Newsletter Error:", error);
      showMessage("Network error — please check your connection.", "error");
    } finally {
      submitBtn.disabled = false;
      emailInput.disabled = false;
      setTimeout(clearMessage, 6000);
    }
  });
});
