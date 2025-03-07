document.addEventListener('DOMContentLoaded', function () {
  const curriculumContainer = document.getElementById('curriculum-container');
  let moduleCount = document.querySelectorAll('.module').length;

  // Modal functionality
  const modal = document.getElementById("confirmation-modal");
  const modalMessage = document.getElementById("modal-message");
  const yesBtn = document.getElementById("yes-btn");
  const noBtn = document.getElementById("no-btn");
  const publishBtn = document.querySelector(".publish-btn");
  const quizBtn = document.querySelector(".quiz-btn");

  let actionType = "";

  let courseData = JSON.parse(localStorage.getItem("courseData")) || {
    title: "",
    category: "",
    description: "",
    thumbnail: "",
    curriculum: [],
    quiz: [],
    published: false // Track whether the course is published
  };

  if (courseData.published) {
    publishBtn.disabled = true;
    publishBtn.style.backgroundColor = "#70ff70";
    quizBtn.disabled = false;
    quizBtn.style.opacity = "1";
} else {
    quizBtn.disabled = true;
    quizBtn.style.opacity = "0.5";
}


  function showModal(message, action) {
      modalMessage.textContent = message;
      modal.style.display = "flex";
      actionType = action;
  }

  function hideModal() {
      modal.style.display = "none";
  }

  // Retrieve existing courseData or create a new one
  
  yesBtn.addEventListener("click", function () {
      hideModal();
      if (actionType === "save") {
          saveCurriculum();
      } else if (actionType === "publish") {
          publishCourse();
      }
  });
  // Attach event listeners to buttons using a single event listener for efficiency
  curriculumContainer.addEventListener('click', function (event) {
      if (event.target.classList.contains('add-sub-module')) {
          const moduleElement = event.target.closest('.module');
          const subModuleElement = event.target.closest('.sub-module');
          createSubModule(moduleElement, subModuleElement);
      }
  });

  // Update module numbers
  function updateModuleNumbers() {
      document.querySelectorAll('.module').forEach((module, index) => {
          module.querySelector('.module-label').textContent = `Module ${index + 1}:`;
      });
  }

  // Update sub-module numbers
  function updateSubModuleNumbers(moduleElement) {
      moduleElement.querySelectorAll('.sub-module').forEach((subModule, index) => {
          subModule.querySelector('.sub-module-label').textContent = `Sub-Module ${index + 1}:`;
      });
  }

  // Toggle dropdown for sub-modules
  function toggleDropdown(button) {
      const subModule = button.closest('.sub-module');
      if (subModule) {
          subModule.querySelector('.sub-module-content').classList.toggle('hidden');
          subModule.querySelector('.sub-module-content1').classList.toggle('hidden');
          button.classList.toggle("active");
      }
  }

  // Create a new sub-module
  function createSubModule(moduleElement, referenceSubModule = null) {
    const subModuleDiv = document.createElement('div');
    subModuleDiv.classList.add('sub-module');
    subModuleDiv.innerHTML = `
        <div class="sub-module-header">
            <label class="sub-module-label">Sub-Module:</label>
            <input type="text" class="title-input" placeholder="Enter title">
            <button class="delete">❌</button>
            <div class="button-container">
                <button class="dropdown"><i class="fa-solid fa-caret-down"></i></button>
            </div>
        </div>
        <div class="sub-module-content">
            <label>Add Video:</label>
            <input type="text" placeholder="Insert Video Link here..." class="video-link" />
        </div>
        <div class="sub-module-content1">
            <label>Sub-Module Description:</label>
            <div class="editor" style="height: 120px;"></div>
        </div>
        <button class="add-sub-module">+ Sub-Module</button>
    `;

    const editorElement = subModuleDiv.querySelector('.editor');
    new Quill(editorElement, { theme: 'snow' });

    if (moduleElement.querySelectorAll('.sub-module').length === 0) { 
        // If it's the first sub-module, remove the delete button
        subModuleDiv.querySelector('.delete').remove();
    } else {
        // Event listener for deleting the sub-module
        subModuleDiv.querySelector('.delete').addEventListener('click', () => {
            subModuleDiv.remove();
            updateSubModuleNumbers(moduleElement);
        });
    }

    // Event listener for toggling the dropdown
    subModuleDiv.querySelector('.dropdown').addEventListener('click', function () {
        toggleDropdown(this);
    });

    if (referenceSubModule) {
        moduleElement.insertBefore(subModuleDiv, referenceSubModule.nextSibling);
    } else {
        moduleElement.appendChild(subModuleDiv);
    }

    updateSubModuleNumbers(moduleElement);
}


  function createModule() {
      moduleCount++;
      const moduleDiv = document.createElement('div');
      moduleDiv.classList.add('module');
      moduleDiv.innerHTML = `
          <div class="module-header">
              <label class="module-label">Module ${moduleCount}:</label>
              <input type="text" class="title-input" placeholder="Enter title">
              <button class="delete">❌</button>
              <div class="button-container">
                  <button class="dropdown"><i class="fa-solid fa-caret-down"></i></button>
              </div>
          </div>
      `;

      moduleDiv.querySelector('.delete').addEventListener('click', () => {
          moduleDiv.remove();
          updateModuleNumbers();
      });

      moduleDiv.querySelector('.dropdown').addEventListener('click', function () {
          moduleDiv.querySelectorAll('.sub-module').forEach(sub => {
            sub.querySelector('.sub-module-content').classList.toggle('hidden');
            sub.querySelector('.sub-module-content1').classList.toggle('hidden');
          });
          this.classList.toggle("active");
      });

      curriculumContainer.insertBefore(moduleDiv, document.querySelector('.save-n-next'));
      createSubModule(moduleDiv);
      updateModuleNumbers();
  }


  // Attach initial listeners
  function attachInitialListeners() {
      const firstModule = document.querySelector('.module');
      if (firstModule) {
          const firstModuleDropdown = firstModule.querySelector('.dropdown');
          if (firstModuleDropdown) {
              firstModuleDropdown.addEventListener('click', function () {
                  // Toggle visibility of sub-modules
                  firstModule.querySelectorAll('.sub-module').forEach(sub => {
                      sub.querySelector('.sub-module-content').classList.toggle('hidden');
                      sub.querySelector('.sub-module-content1').classList.toggle('hidden');
                  });
                  this.classList.toggle("active");
              });
          }

          const firstSubModule = firstModule.querySelector('.sub-module');
          if (firstSubModule) {
              const firstSubModuleDropdown = firstSubModule.querySelector('.dropdown');
              if (firstSubModuleDropdown) {
                  firstSubModuleDropdown.addEventListener('click', function () {
                      toggleDropdown(this);
                  });
              }
              const editorElement = firstSubModule.querySelector('.editor');
              new Quill(editorElement, { theme: 'snow' });

          }
          // Remove the delete button if the first module or sub-module is present
          const firstModuleDeleteBtn = firstModule.querySelector('.delete');
          if (firstModuleDeleteBtn) {
              firstModuleDeleteBtn.remove();
          }

          const firstSubModuleDeleteBtn = firstSubModule.querySelector('.delete');
          if (firstSubModuleDeleteBtn) {
              firstSubModuleDeleteBtn.remove();
          }
      }
  }


  // Attach initial listeners
  attachInitialListeners();

  // Add module button
  document.querySelector('.add-module').addEventListener('click', createModule);
  // Save button click
  document.querySelector(".save-btn").addEventListener("click", function () {
      showModal("Do you want to save the changes?", "save");
  });

  // Publish button click
  document.querySelector(".publish-btn").addEventListener("click", function () {
      showModal("Are you sure you want to publish this course?", "publish");
  });

  
  // Yes button in modal
  

  // No button in modal
  // noBtn.addEventListener("click", hideModal);
  // Save curriculum data
  function saveCurriculum() {
    let modules = [];

    document.querySelectorAll(".module").forEach((moduleElement) => {
      let moduleTitle = moduleElement.querySelector(".title-input").value.trim();
      let subModules = [];

      moduleElement.querySelectorAll(".sub-module").forEach((subModuleElement) => {
        let subModuleTitle = subModuleElement.querySelector(".title-input").value.trim();
        let videoLink = subModuleElement.querySelector(".video-link").value.trim();
        let description = subModuleElement.querySelector(".editor .ql-editor").innerHTML.trim();

        subModules.push({
          title: subModuleTitle,
          video: videoLink,
          description: description,
        });
      });

      modules.push({
        title: moduleTitle,
        subModules: subModules,
      });
    });

    courseData.curriculum = modules;
    localStorage.setItem("courseData", JSON.stringify(courseData));

    document.querySelector(".curriculum-btn").style.backgroundColor = "#70ff70";
    console.log("Step 2 Saved:", courseData);
  }


  // Enable the Quiz button after publishing
// const quizButton = document.querySelector(".quiz-btn"); 
// if (quizButton) {
//     quizButton.disabled = false; // Enable quiz button
//     quizButton.style.opacity = "1"; // Make it look active
// }

function publishCourse() {
  fetch("https://your-backend-api.com/publish-course", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(courseData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Published:", data);
      courseData.published = true;
      localStorage.setItem("courseData", JSON.stringify(courseData));

      publishBtn.disabled = true;
      publishBtn.style.backgroundColor = "#70ff70";
      quizBtn.disabled = false;
      quizBtn.style.opacity = "1";
    })
    .catch((error) => console.error("Error:", error));
}

publishBtn.addEventListener("click", function () {
  if (courseData.published) {
    alert("Course already published!");
  } else {
    showModal("Are you sure you want to publish this course?", "publish");
  }
});
});