let userForm = document.getElementById("user-form");
const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};

const displayEntries = () => {
  const entries = retrieveEntries();

  const tableEntries = entries
    .map((entry) => {
      const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
      const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
      const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
      const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
      const acceptedTermsAndConditionsCell = `<td class='border px-4 py-2'>${entry.acceptedTermsAndConditions}</td>`;
      const row = `<tr>${nameCell}${emailCell}${passwordCell}${dobCell}${acceptedTermsAndConditionsCell}</tr>`;
      return row;
    })
    .join("\n");

  const table = `<table class="table-auto w-full"><tr>
    <th class="px-4 py-2">Name</th>
    <th class="px-4 py-2">Email</th>
    <th class="px-4 py-2">Password</th>
    <th class="px-4 py-2">Date of Birth</th>
    <th class="px-4 py-2">Accepted Terms and Conditions ?</th>
  </tr>${tableEntries}</table>`;
  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};

const saveUserForm = (event) => {
  event.preventDefault();

  const dobValue = document.getElementById("dob").value;
  const dobDate = new Date(dobValue);

  // Check age between 18 and 55
  const today = new Date();
  const age = today.getFullYear() - dobDate.getFullYear();
  const m = today.getMonth() - dobDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
    age--;
  }

  if (age < 18 || age > 55) {
    alert("Age must be between 18 and 55 years.");
    return; // Stop form submission
  }

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTermsAndConditions =
    document.getElementById("acceptTerms").checked;
  let userEntries = retrieveEntries();
  const entry = {
    name,
    email,
    password,
    dob,
    acceptedTermsAndConditions,
  };
  userEntries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntries();
  userForm.reset();
};
userForm.addEventListener("submit", saveUserForm);
displayEntries();

const dobInput = document.getElementById("dob");

const today = new Date();
const year = today.getFullYear();

// Calculate max and min DOB allowed:
const maxDOB = new Date(year - 18, today.getMonth(), today.getDate()); // At least 18 years old
const minDOB = new Date(year - 55, today.getMonth(), today.getDate()); // At most 55 years old

// Format date to yyyy-mm-dd for input value
const formatDate = (date) => date.toISOString().split("T")[0];

dobInput.setAttribute("max", formatDate(maxDOB));
dobInput.setAttribute("min", formatDate(minDOB));
