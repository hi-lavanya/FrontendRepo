//for expanding question input box
document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("question-input");

    textarea.addEventListener("input", function () {
        this.style.height = "auto"; 
        this.style.height = this.scrollHeight + "px"; 
    });
});

//fetching and posting data to backend

document.addEventListener("DOMContentLoaded", function () {
    const questionsContainer = document.querySelector(".right-container"); 
    let questionCount = document.querySelectorAll(".outer-qestion-box").length;

    function addQuestionHandler(event) {
        event.preventDefault(); 
        questionCount++;

        const currentQuestionBox = event.target.closest(".outer-qestion-box");
        if (!currentQuestionBox) {
            console.error("No question box found!");
            return;
        }
        const newQuestionBox = currentQuestionBox.cloneNode(true);
        newQuestionBox.querySelector("label[for='question-input']").textContent = `Question ${questionCount}:`;
        newQuestionBox.querySelector("[name='question-input']").value = "";
        newQuestionBox.querySelectorAll("textarea[name='option-input']").forEach(option => option.value = "");
        newQuestionBox.querySelectorAll("input[type='radio'], input[type='checkbox']").forEach(input => input.checked = false);
        newQuestionBox.style.opacity = "0";
        newQuestionBox.style.transform = "translateY(10px)";
        questionsContainer.appendChild(newQuestionBox);

        setTimeout(() => {
            newQuestionBox.style.opacity = "1";
            newQuestionBox.style.transform = "translateY(0)";
            newQuestionBox.style.transition = "opacity 0.3s ease-in-out, transform 0.3s ease-in-out";
        }, 100);

        newQuestionBox.querySelector("[name='question-input']").focus();

        updateQuestionNumbers(); 
    }

    function deleteQuestionHandler(event) {
        const questionBoxes = document.querySelectorAll(".outer-qestion-box");

        if (questionBoxes.length <= 1) {
            alert("You must have at least one question.");
            return;
        }

        const questionBox = event.target.closest(".outer-qestion-box");

        if (questionBox) {
            questionBox.style.opacity = "0";
            questionBox.style.transform = "translateY(-10px)";

            setTimeout(() => {
                questionBox.remove();
                updateQuestionNumbers(); 
            }, 300);
        }
    }

    function updateQuestionNumbers() {
        document.querySelectorAll(".outer-qestion-box").forEach((box, index) => {
            box.querySelector("label[for='question-input']").textContent = `Question ${index + 1}:`;
        });
    }

    function getSelectedAnswers() {
        const questions = document.querySelectorAll(".outer-qestion-box");
        let quizData = [];
        let isValid = true;

        questions.forEach((questionBox, index) => {
            let questionText = questionBox.querySelector("[name='question-input']").value.trim();
            let options = [...questionBox.querySelectorAll("textarea[name='option-input']")].map(option => option.value.trim());
            let correctAnswers = [];
            if (questionText === "") {
                alert(`Please enter the question for Question ${index + 1}`);
                isValid = false;
                return;
            }
            if (options.some(option => option === "")) {
                alert(`Please fill in all options for Question ${index + 1}`);
                isValid = false;
                return;
            }

            let inputs = questionBox.querySelectorAll("input[type='radio']:checked, input[type='checkbox']:checked");
            inputs.forEach(input => {
                let answerIndex = [...questionBox.querySelectorAll("input[type='radio'], input[type='checkbox']")].indexOf(input);
                correctAnswers.push(options[answerIndex]); 
            });

            
            if (correctAnswers.length === 0) {
                alert(`Please select at least one correct answer for Question ${index + 1}`);
                isValid = false;
                return;
            }

            quizData.push({
                question: questionText,
                options: options,
                correctAnswers: correctAnswers
            });
        });

        if (!isValid) {
            return null;
        }

        return quizData;
    }
    questionsContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-question-btn")) {
            deleteQuestionHandler(event);
        } else if (event.target.id === "add-question-btn") {
            addQuestionHandler(event);
        }
    });
    
    document.querySelector(".save-btn").addEventListener("click", function () {
        const quizData = getSelectedAnswers();
        
        if (quizData) {
            console.log("Final Quiz Data:", quizData);
            alert("Quiz saved successfully!");
        }
    });
});
