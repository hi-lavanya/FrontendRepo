function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("active");
  }

//for expanding question input box
document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("question-input");

    textarea.addEventListener("input", function () {
        this.style.height = "auto"; 
        this.style.height = this.scrollHeight + "px"; 
    });
});

// // //fetching and posting data to backend 
// document.addEventListener("DOMContentLoaded", function () {
//     const questionsContainer = document.querySelector(".right-container");
//     let questionCount = document.querySelectorAll(".outer-box-with-save-btn").length;
//     const saveButton = document.querySelector(".save-btn");

//     function getCourseId() {
//         const urlParams = new URLSearchParams(window.location.search);
//         return urlParams.get("course_id") || 1; 
//     }

//     function addQuestionHandler(event) {
//         event.preventDefault();
//         questionCount++;

//         const currentQuestionBox = event.target.closest(".outer-box-with-save-btn");
//         if (!currentQuestionBox) {
//             console.error("No question box found!");
//             return;
//         }

//         const newQuestionBox = currentQuestionBox.cloneNode(true);
//         newQuestionBox.querySelector("label[for='question-input']").textContent = `Question ${questionCount}:`;
//         newQuestionBox.querySelector("[name='question-input']").value = "";
//         newQuestionBox.querySelectorAll("textarea[name='option-input']").forEach(option => option.value = "");
//         newQuestionBox.querySelectorAll("input[type='radio'], input[type='checkbox']").forEach(input => input.checked = false);
//         newQuestionBox.style.opacity = "0";
//         newQuestionBox.style.transform = "translateY(10px)";
//         questionsContainer.appendChild(newQuestionBox);

//         setTimeout(() => {
//             newQuestionBox.style.opacity = "1";
//             newQuestionBox.style.transform = "translateY(0)";
//             newQuestionBox.style.transition = "opacity 0.3s ease-in-out, transform 0.3s ease-in-out";
//         }, 100);

//         newQuestionBox.querySelector("[name='question-input']").focus();
//         updateQuestionNumbers();
//     }

//     function deleteQuestionHandler(event) {
//         const questionBoxes = document.querySelectorAll(".outer-box-with-save-btn");

//         if (questionBoxes.length <= 1) {
//             alert("You must have at least one question.");
//             return;
//         }

//         const questionBox = event.target.closest(".outer-box-with-save-btn");

//         if (questionBox) {
//             questionBox.style.opacity = "0";
//             questionBox.style.transform = "translateY(-10px)";

//             setTimeout(() => {
//                 questionBox.remove();
//                 updateQuestionNumbers();
//             }, 300);
//         }
//     }

//     function updateQuestionNumbers() {
//         document.querySelectorAll(".outer-box-with-save-btn").forEach((box, index) => {
//             box.querySelector("label[for='question-input']").textContent = `Question ${index + 1}:`;
//         });
//     }

//     function getSelectedAnswers() {
//         const questions = document.querySelectorAll(".outer-box-with-save-btn");
//         let quizData = [];
//         let isValid = true;

//         questions.forEach((questionBox, index) => {
//             let questionText = questionBox.querySelector("[name='question-input']").value.trim();
//             let options = [...questionBox.querySelectorAll("textarea[name='option-input']")].map(option => option.value.trim());
//             let correctAnswers = [];

//             if (questionText === "") {
//                 alert(`Please enter the question for Question ${index + 1}`);
//                 isValid = false;
//                 return;
//             }
//             if (options.some(option => option === "")) {
//                 alert(`Please fill in all options for Question ${index + 1}`);
//                 isValid = false;
//                 return;
//             }

//             let inputs = questionBox.querySelectorAll("input[type='radio']:checked, input[type='checkbox']:checked");
//             inputs.forEach(input => {
//                 let answerIndex = [...questionBox.querySelectorAll("input[type='radio'], input[type='checkbox']")].indexOf(input);
//                 correctAnswers.push(options[answerIndex]);
//             });

//             if (correctAnswers.length === 0) {
//                 alert(`Please select at least one correct answer for Question ${index + 1}`);
//                 isValid = false;
//                 return;
//             }

//             quizData.push({
//                 question: questionText,
//                 options: options,
//                 correctAnswers: correctAnswers
//             });
//         });

//         return isValid ? quizData : null;
//     }

//     saveButton.addEventListener("click", function (event) {
//         event.preventDefault();
    
//         const courseId = getCourseId(); 
//         const quizTitle = document.querySelector("#title").value.trim();
//         const quizDuration = parseInt(document.querySelector("#duration").value, 10);
//         const questionBoxes = document.querySelectorAll(".outer-box-with-save-btn");
    
//         if (!quizTitle || isNaN(quizDuration) || quizDuration <= 0) {
//             alert("Please enter a valid quiz title and duration.");
//             return;
//         }
    
//         const questions = [];
    
//         questionBoxes.forEach((box, index) => {
//             const questionTitle = box.querySelector("#question-input").value.trim();
//             if (!questionTitle) {
//                 alert(`Please enter a valid question for Question ${index + 1}.`);
//                 return;
//             }
    
//             const options = [];
//             const correctAnswers = [];
//             const optionInputs = box.querySelectorAll("textarea[name='option-input']");
//             const selectedOptions = box.querySelectorAll("input:checked");
    
//             optionInputs.forEach(option => {
//                 const value = option.value.trim();
//                 if (value) options.push(value);
//             });
    
//             selectedOptions.forEach(selected => {
//                 const optionText = selected.nextElementSibling.value.trim();
//                 if (optionText) correctAnswers.push(optionText);
//             });
    
//             if (options.length < 4) {
//                 alert(`Each question must have four options (Question ${index + 1}).`);
//                 return;
//             }
    
//             if (correctAnswers.length === 0) {
//                 alert(`Please select at least one correct answer for Question ${index + 1}.`);
//                 return;
//             }
    
//             questions.push({
//                 question_title: questionTitle,
//                 options: options,
//                 correct_ans: correctAnswers
//             });
//         });
    
//         if (questions.length !== questionBoxes.length) {
//             return;
//         }
    
//         const quizData = {
//             course_id: courseId,
//             quiz_title: quizTitle,
//             quiz_duration: quizDuration,
//             questions: questions
//         };
    
//         console.log("Sending Quiz Data:", quizData);
//         saveButton.textContent = "Saving...";
//         saveButton.disabled = true;
//         saveButton.style.backgroundColor = "#003858"; 
    
//         fetch("https://192.168.1.14:5000/instructor/quiz/createQuiz", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(quizData)
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log("Success:", data);
//             alert("Quiz saved successfully!");
//             setTimeout(() => {
//                 saveButton.textContent = "Save Quiz";
//                 saveButton.disabled = false;
//                 saveButton.style.backgroundColor = "#4fb4ed"; 
//                 requestAnimationFrame(() => {
//                     saveButton.classList.add("button-reset-animation");
//                 });
    
//                 setTimeout(() => {
//                     saveButton.classList.remove("button-reset-animation");
//                 }, 50); 
//             }, 1000);
//         })
//         .catch(error => {
//             console.error("Error:", error);
//             alert("Failed to save quiz. Please try again.");
//             saveButton.textContent = "Save Quiz";
//             saveButton.disabled = false;
//             saveButton.style.backgroundColor = "#4fb4ed"; 
//         });
//     });
    

//     questionsContainer.addEventListener("click", function (event) {
//         if (event.target.classList.contains("delete-question-btn")) {
//             deleteQuestionHandler(event);
//         } else if (event.target.id === "add-question-btn") {
//             addQuestionHandler(event);
//         }
//     });
// });

//FOR UPDATE DELETE QUESTION AND DELETE QUIZ 2

document.addEventListener("DOMContentLoaded", function () {
    const questionsContainer = document.querySelector(".right-container");
    let questionCount = document.querySelectorAll(".outer-box-with-save-btn").length;
    const saveButton = document.querySelector(".save-btn");

    function getCourseId() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("course_id") || 1;
    }

    function addQuestion() {
        questionCount++;

        const questionBoxes = document.querySelectorAll(".outer-box-with-save-btn");
        const lastQuestionBox = questionBoxes[questionBoxes.length - 1];

        if (!lastQuestionBox) {
            console.error("No question box found!");
            return;
        }

        const newQuestionBox = lastQuestionBox.cloneNode(true);
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

    function deleteQuestion(event) {
        const questionBox = event.target.closest(".outer-box-with-save-btn");
        // questionBox.style.opacity = "0";
        // questionBox.style.transform = "translateY(10px)";

        if (!questionBox) return;

        const questionId = questionBox.dataset.questionId; // Assuming each question has an ID
        if (!questionId) {
            console.error("Question ID not found!");
            console.log("outer if",questionCount);
            if(questionCount>1){
            questionsContainer.removeChild(questionBox);
            updateQuestionNumbers();
            console.log("inner if", questionCount);
            }
            questionCount--;
            return;
        }

        fetch(`https://192.168.1.14:5000/instructor/quiz/deleteQuestion/${questionId}`, {
            method: "DELETE",
        })
        .then(response => response.json())
        .then(data => {
            console.log("Question Deleted:", data);
            questionBox.remove();
            updateQuestionNumbers();
        })
        .catch(error => console.error("Error deleting question:", error));
    }

    function deleteQuiz() {
        const courseId = getCourseId();

        fetch(`https://192.168.1.14:5000/instructor/quiz/deleteQuiz/${courseId}`, {
            method: "DELETE",
        })
        .then(response => response.json())
        .then(data => {
            console.log("Quiz Deleted:", data);
            alert("Quiz deleted successfully!");
            window.location.href = "/dashboard"; // Redirect after deletion
        })
        .catch(error => console.error("Error deleting quiz:", error));
    }

    function updateQuestionNumbers() {
        document.querySelectorAll(".outer-box-with-save-btn").forEach((box, index) => {
            box.querySelector("label[for='question-input']").textContent = `Question ${index + 1}:`;
        });
    }

    function saveQuiz() {
        const courseId = getCourseId();
        const quizTitle = document.querySelector("#title").value.trim();
        const quizDuration = parseInt(document.querySelector("#duration").value, 10);
        const questionBoxes = document.querySelectorAll(".outer-box-with-save-btn");

        if (!quizTitle || isNaN(quizDuration) || quizDuration <= 0) {
            alert("Please enter a valid quiz title and duration.");
            return;
        }

        const questions = [];

        questionBoxes.forEach((box, index) => {
            const questionTitle = box.querySelector("#question-input").value.trim();
            if (!questionTitle) {
                alert(`Please enter a valid question for Question ${index + 1}.`);
                return;
            }

            const options = [];
            const correctAnswers = [];
            const optionInputs = box.querySelectorAll("textarea[name='option-input']");
            const selectedOptions = box.querySelectorAll("input:checked");

            optionInputs.forEach(option => {
                const value = option.value.trim();
                if (value) options.push(value);
            });

            selectedOptions.forEach(selected => {
                const optionText = selected.nextElementSibling.value.trim();
                if (optionText) correctAnswers.push(optionText);
            });

            if (options.length < 4) {
                alert(`Each question must have four options (Question ${index + 1}).`);
                return;
            }

            if (correctAnswers.length === 0) {
                alert(`Please select at least one correct answer for Question ${index + 1}.`);
                return;
            }

            questions.push({
                question_title: questionTitle,
                options: options,
                correct_ans: correctAnswers
            });
        });

        if (questions.length !== questionBoxes.length) {
            return;
        }

        const quizData = {
            course_id: courseId,
            quiz_title: quizTitle,
            quiz_duration: quizDuration,
            questions: questions
        };

        console.log("Updating Quiz Data:", quizData);
        saveButton.textContent = "Saving...";
        saveButton.disabled = true;
        saveButton.style.backgroundColor = "#003858";

        fetch("https://192.168.1.14:5000/instructor/quiz/updateQuiz", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(quizData)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Quiz Updated Successfully:", data);
            alert("Quiz updated successfully!");
            setTimeout(() => {
                saveButton.textContent = "Save Quiz";
                saveButton.disabled = false;
                saveButton.style.backgroundColor = "#4fb4ed";
            }, 1000);
        })
        .catch(error => {
            console.error("Error updating quiz:", error);
            alert("Failed to update quiz. Please try again.");
            saveButton.textContent = "Save Quiz";
            saveButton.disabled = false;
            saveButton.style.backgroundColor = "#4fb4ed";
        });
    }

    saveButton.addEventListener("click", function (event) {
        event.preventDefault();
        saveQuiz();
    });

    document.querySelector(".delete-quiz-btn").addEventListener("click", function () {
        if (confirm("Are you sure you want to delete this quiz?")) {
            deleteQuiz();
        }
    });

    questionsContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-question-btn")) {
            deleteQuestion(event);
        } else if (event.target.id === "add-question-btn") {
            addQuestion();
        }
    });
});




