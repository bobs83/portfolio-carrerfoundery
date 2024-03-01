let contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Select form elements here to ensure you get their current values
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let subject = document.getElementById("subject").value;
  let message = document.getElementById("message").value;

  // Create the formData object inside the submit handler to capture the latest values
  let formData = {
    name: name,
    email: email,
    subject: subject,
    message: message,
  };

  console.log("Form submitted");
  console.log(formData);

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log(xhr.responseText);
      try {
        const response = JSON.parse(xhr.responseText);
        if (response.status === "success") {
          alert("Email sent");
          document.getElementById("name").value = "";
          document.getElementById("email").value = "";
          document.getElementById("subject").value = "";
          document.getElementById("message").value = "";
        } else {
          alert("Something went wrong");
        }
      } catch (e) {
        console.error("Error parsing the response", e);
        alert("Something went wrong");
      }
    } else {
      alert("Something went wrong with the request");
    }
  };

  xhr.onerror = function () {
    alert("Network error occurred");
  };

  xhr.send(JSON.stringify(formData));
});
