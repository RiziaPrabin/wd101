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
      return `<tr>${nameCell}${emailCell}${passwordCell}${dobCell}${acceptedTermsAndConditionsCell}</tr>`;
    })
    .join("\n");

  const tbody = document.getElementById("user-entries");
  tbody.innerHTML = tableEntries;
};

const calculateAge = (dob) => {
  const dobDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - dobDate.getFullYear();
  const m = today.getMonth() - dobDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
    age--;
  }
  return age;
};

const saveUserForm = (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTermsAndConditions =
    document.getElementById("acceptTerms").checked;

  const age = calculateAge(dob);

  if (age < 18 || age > 55) {
    document.getElementById("dob").style.border = "1px solid red";
    alert("Age must be between 18 and 55");
    return;
  } else {
    document.getElementById("dob").style.border = "1px solid green";
  }

  const entry = {
    name,
    email,
    password,
    dob,
    acceptedTermsAndConditions,
  };

  const userEntries = retrieveEntries();
  userEntries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntries();
  userForm.reset();
};

const setDateLimits = () => {
  const dobInput = document.getElementById("dob");
  const today = new Date();
  const year = today.getFullYear();

  const maxDateObj = new Date(year - 18, today.getMonth(), today.getDate());
  const maxDate = `${maxDateObj.getFullYear()}-${String(
    maxDateObj.getMonth() + 1
  ).padStart(2, "0")}-${String(maxDateObj.getDate()).padStart(2, "0")}`;

  const minDateObj = new Date(today);
  minDateObj.setFullYear(minDateObj.getFullYear() - 55);
  const minDate = minDateObj.toISOString().split("T")[0];
  dobInput.setAttribute("min", minDate);
  dobInput.setAttribute("max", maxDate);
};

setDateLimits();
userForm.addEventListener("submit", saveUserForm);
displayEntries();
