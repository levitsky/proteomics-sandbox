window.addEventListener("load", function() {
	var questions = document.getElementsByClassName("question");
	console.log(questions);
	for (const [index, element] of Array.from(questions).entries()) {
  		// <textarea id="question27" placeholder="Type your answer here..." class="input-box"></textarea>
		const ansElem = document.createElement("textarea");
		ansElem.setAttribute("id", "question" + (index + 1));
		ansElem.setAttribute("placeholder", "Type your answer here...");
		ansElem.classList.add("input-box");
  		element.insertAdjacentElement("afterend", ansElem);
  		// Automatically resize textareas based on input
  		ansElem.addEventListener('input', function() {
		    this.style.height = 'auto';
		    this.style.height = (this.scrollHeight) + 'px';
		    saveAnswers();
		  });
  	};
});

// Function to save answers to localStorage
function saveTableAnswers() {
  const inputs = document.querySelectorAll('table input[type="text"]');
  inputs.forEach(input => {
    const value = input.value || ''; // Get the input value or an empty string
    localStorage.setItem(input.id, value); // Save value in localStorage using the input's ID
  });
  console.log("Answers saved to local storage.");
}

// Load answers from localStorage
function loadTableAnswers() {
  const inputs = document.querySelectorAll('table input[type="text"]');
  inputs.forEach(input => {
    const savedValue = localStorage.getItem(input.id) || ''; // Load the saved value or an empty string
    input.value = savedValue; // Set the value to the input field
  });
  console.log("Answers loaded from local storage.");
}

// Attach event listeners to table inputs for auto-save
function attachTableInputListeners() {
  const inputs = document.querySelectorAll('table input[type="text"]');
  inputs.forEach(input => {
    input.addEventListener('input', saveTableAnswers); // Save table answers on input change
  });
}

// Load all answers when the page loads
window.addEventListener("load", function() {
  // Load existing answers for textareas and table inputs
  loadAnswers(); // Load textareas
  loadTableAnswers(); // Load table inputs

  // Attach input listeners
  attachTableInputListeners();

  // Attach other event listeners (e.g., for textareas)
  const questions = document.getElementsByClassName("question");
  for (const [index, element] of Array.from(questions).entries()) {
    const ansElem = document.createElement("textarea");
    ansElem.setAttribute("id", "question" + (index + 1));
    ansElem.setAttribute("placeholder", "Type your answer here...");
    ansElem.classList.add("input-box");
    element.insertAdjacentElement("afterend", ansElem);

    ansElem.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
      saveAnswers(); // Save textarea answers on input
    });
  }
});


// Function to download the answers as a PDF with a more professional layout
document.getElementById('downloadBtn').addEventListener('click', function() {
  const questions = document.querySelectorAll('.question');
  let answersHTML = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h1 style="text-align: center; font-size: 24px;">Assignment Submission</h1>
      <h2 style="font-size: 18px;">Submitter</h2>
      <table>`;

  const table = document.querySelector('table.personal-details');
  for (var i = 0, row; row = table.rows[i]; i++) {
     answersHTML += `<tr><td style="font-weight: bold;">${row.cells[0].textContent}</td><td>${row.cells[1].children[0].value}</td></tr>`;
  }
  answersHTML += `</table>`;

  questions.forEach((question, index) => {
    const questionNumber = index + 1; // Incrementing index for question number
    const questionText = question.innerHTML; // Get the question text
    const answerText = document.getElementById(`question${questionNumber}`).value; // Get the corresponding answer

    answersHTML += `
      <h2 style="font-size: 18px; margin-bottom: 5px;">${questionText}</h2>
      <p style="font-size: 14px;">${answerText || 'No answer provided'}</p>
    `;
  });

  answersHTML += `</div>`; // Closing the div

  const opt = {
    margin: 1,
    filename: 'assignment_answers.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().from(answersHTML).set(opt).save();
});

// Load answers when the page loads
window.addEventListener("load", loadAnswers);
