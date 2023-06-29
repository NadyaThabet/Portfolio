new TypeIt("#simplesUsage", {
  speed: 100,
  waitUntilVisible: true,
  loop: true,
}).go();

// form validation

emailjs.init("qH8gKGYSwWZ6fzXkb");

// Function to validate full name field
function validateName() {
  const name = document.getElementById("name");
  const nameError = document.querySelector(
    "[data-sb-feedback='name:required']"
  );

  if (name.value.trim() === "") {
    name.classList.add("is-invalid");
    nameError.classList.remove("d-none");
    return false;
  } else {
    name.classList.remove("is-invalid");
    nameError.classList.add("d-none");
    return true;
  }
}

// Function to validate email field
function validateEmail() {
  const email = document.getElementById("email");
  const emailErrorRequired = document.querySelector(
    "[data-sb-feedback='email:required']"
  );
  const emailErrorInvalid = document.querySelector(
    "[data-sb-feedback='email:email']"
  );

  if (email.value.trim() === "") {
    email.classList.add("is-invalid");
    emailErrorRequired.classList.remove("d-none");
    emailErrorInvalid.classList.add("d-none");
    return false;
  } else if (!isValidEmail(email.value.trim())) {
    email.classList.add("is-invalid");
    emailErrorRequired.classList.add("d-none");
    emailErrorInvalid.classList.remove("d-none");
    return false;
  } else {
    email.classList.remove("is-invalid");
    emailErrorRequired.classList.add("d-none");
    emailErrorInvalid.classList.add("d-none");
    return true;
  }
}

// Helper function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to validate message field
function validateMessage() {
  const message = document.getElementById("message");
  const messageError = document.querySelector(
    "[data-sb-feedback='message:required']"
  );

  if (message.value.trim() === "") {
    message.classList.add("is-invalid");
    messageError.classList.remove("d-none");
    return false;
  } else {
    message.classList.remove("is-invalid");
    messageError.classList.add("d-none");
    return true;
  }
}

// Listen for the form submission
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Validate form fields
    const isNameValid = validateName();
    // const isPhoneValid = validatePhone();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isMessageValid) {
      emailjs.sendForm("service_a9q4ozw", "template_tnonsbs", this).then(
        function () {
          const successMessage = document.createElement("div");
          successMessage.classList.add(
            "text-center",
            "mb-3",
            "fw-bolder",
            "title",
            "text"
          );
          successMessage.textContent = "Form submission successful!";
          document
            .getElementById("submitSuccessMessage")
            .appendChild(successMessage);
          document
            .getElementById("submitSuccessMessage")
            .classList.remove("d-none", "text-center", "mb-3", "title", "text");
        },
        function (error) {
          const errorMessage = document.createElement("div");
          errorMessage.classList.add("text-center", "mb-3", "title", "text");
          errorMessage.textContent = "Error sending message!";
          document
            .getElementById("submitErrorMessage")
            .appendChild(errorMessage);
          document
            .getElementById("submitErrorMessage")
            .classList.remove("d-none");
        }
      );

      // Reset the form fields after submission
      this.reset();
    }
  });
