const formbox = document.querySelector(".form-box")
const formmail = document.querySelector(".form-mail")
const body = document.querySelector("body")
const nextbtn = document.querySelector(".box.signin")
const mailform = document.getElementById("mailform")


var validEmails = [];
var invalidEmails = [];


function addActive() {
  mailform.addEventListener("submit", (e) => {
    e.preventDefault();
    if(mailform.checkValidity()) {
      formbox.classList.add("active");
      formmail.classList.add("active");
      body.classList.add("active");
      nextbtn.classList.add("active");
    } else {
      mailform.reportValidity();
    }
  });
}

function removeActive() {
  formbox.classList.remove("active");
  formmail.classList.remove("active");
  body.classList.remove("active");
  nextbtn.classList.remove("active");
}

function reset() {
  document.querySelector('button[type="reset"]').addEventListener('click', (event) => {
    mailform.setAttribute("novalidate", true);
    mailform.reset(); // Reset the form fields
    document.getElementById("email").value = "";
    document.getElementById("file").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("message").value = "";   
    setTimeout(() => mailform.removeAttribute("novalidate"), 0);
  });
}

function processFile() {
  const fileInput = document.getElementById('upload-box');
  const file = fileInput.files[0];
  
  if (!file) {
      alert("Please select a file.");
      return;
  }
  
  const reader = new FileReader();
  reader.onload = function(e) {
      const contents = e.target.result;
      validateEmails(contents);
  };
  reader.readAsText(file);
}

function isValidEmail(email) {
  const dotPosition = email.length - 3; // Position of dot from the end
  return email[dotPosition] === '.' || email[dotPosition - 1] === '.';
}

function validateEmails(csvData) {
  // Reset the arrays for each validation
  validEmails = [];
  invalidEmails = [];

  const emails = csvData.split(/[\n,]+/).map(email => email.trim());

  emails.forEach(email => {
    if (isValidEmail(email)) {
      validEmails.push(email);
    } else {
      invalidEmails.push(email);
    }
  });

  document.getElementById('validEmails').value = validEmails.join('\n');
  document.getElementById('invalidEmails').value = invalidEmails.join('\n');
  document.getElementById('validCount').innerText = validEmails.length;
  document.getElementById('invalidCount').innerText = invalidEmails.length;
}


function sendEmail() {
  processFile();
  var params = {
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value
  }
  const serviceID = "service_gu3f41g"; 
  const templateID = "template_p71znvh"; 

  emailjs.send(serviceID, templateID, params)
  .then(res => {
    alert(`${document.getElementById("validCount").innerText} mails sent`);
  }).catch(e => console.error(e));
}



