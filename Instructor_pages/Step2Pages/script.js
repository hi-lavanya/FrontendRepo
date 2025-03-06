document.addEventListener('DOMContentLoaded', function () {
  const curriculumContainer = document.getElementById('curriculum-container');
  let moduleCount = document.querySelectorAll('.module').length;

  // Retrieve existing courseData or create a new one
  let courseData = JSON.parse(localStorage.getItem("courseData")) || {
    title: "",
    category: "",
    description: "",
    thumbnail: "",
    curriculum: [],
    quiz: []
  };

  function updateModuleNumbers() {
    document.querySelectorAll('.module').forEach((module, index) => {
      module.querySelector('.module-label').textContent = `Module ${index + 1}:`;
    });
  }

  function updateSubModuleNumbers(moduleElement) {
    moduleElement.querySelectorAll('.sub-module').forEach((subModule, index) => {
      subModule.querySelector('.sub-module-label').textContent = `Sub-Module ${index + 1}:`;
    });
  }

  function toggleDropdown(button) {
    const subModule = button.closest('.sub-module');
    if (subModule) {
      subModule.querySelector('.sub-module-content').classList.toggle('hidden');
      subModule.querySelector('.sub-module-content1').classList.toggle('hidden');
      button.classList.toggle("active");
    }
  }

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

    subModuleDiv.querySelector('.add-sub-module').addEventListener('click', function () {
      createSubModule(moduleElement, subModuleDiv);
    });

    subModuleDiv.querySelector('.delete').addEventListener('click', () => {
      subModuleDiv.remove();
      updateSubModuleNumbers(moduleElement);
    });

    subModuleDiv.querySelector('.dropdown').addEventListener('click', function () {
      toggleDropdown(this);
    });

    if (referenceSubModule) {
      moduleElement.insertBefore(subModuleDiv, referenceSubModule.nextSibling);
    } else {
      moduleElement.appendChild(subModuleDiv);
    }

    updateSubModuleNumbers(moduleElement);

    const allSubModules = moduleElement.querySelectorAll('.sub-module');
    if (allSubModules.length === 1) {
      allSubModules[0].querySelector('.delete').remove();
    }
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
      moduleDiv.querySelectorAll('.sub-module').forEach(sub => sub.classList.toggle('hidden'));
      this.classList.toggle("active");
    });

    curriculumContainer.insertBefore(moduleDiv, document.querySelector('.save-n-next'));
    createSubModule(moduleDiv);
    updateModuleNumbers();
  }

  function attachInitialListeners() {
    const firstModule = document.querySelector('.module');
    if (firstModule) {
      const firstModuleDropdown = firstModule.querySelector('.dropdown');
      if (firstModuleDropdown) {
        firstModuleDropdown.addEventListener('click', function () {
          firstModule.querySelectorAll('.sub-module').forEach(sub => sub.classList.toggle('hidden'));
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
        if (editorElement) {
          new Quill(editorElement, { theme: 'snow' });
        }

        firstSubModule.querySelector('.sub-module-content').classList.remove('hidden');
        firstSubModule.querySelector('.sub-module-content1').classList.remove('hidden');
      }

      const firstModuleDeleteBtn = firstModule.querySelector('.delete');
      if (firstModuleDeleteBtn) {
        firstModuleDeleteBtn.remove();
      }

      if (firstSubModule) {
        const firstSubModuleDeleteBtn = firstSubModule.querySelector('.delete');
        if (firstSubModuleDeleteBtn) {
          firstSubModuleDeleteBtn.remove();
        }
      }
    }
  }

  attachInitialListeners();

  document.querySelector('.add-module').addEventListener('click', createModule);

  const addSubModuleBtn = document.querySelector('.add-sub-module');
  if (addSubModuleBtn) {
    addSubModuleBtn.addEventListener('click', function () {
      const firstModule = document.querySelector('.module');
      if (firstModule) {
        createSubModule(firstModule);
      }
    });
  }

  // Save Curriculum Data
  document.querySelector('.save-n-next').addEventListener('click', function () {
    let modules = [];

    document.querySelectorAll('.module').forEach(moduleElement => {
      let moduleTitle = moduleElement.querySelector('.title-input').value.trim();
      let subModules = [];

      moduleElement.querySelectorAll('.sub-module').forEach(subModuleElement => {
        let subModuleTitle = subModuleElement.querySelector('.title-input').value.trim();
        let videoLink = subModuleElement.querySelector('.video-link').value.trim();
        let description = subModuleElement.querySelector('.editor .ql-editor').innerHTML.trim();

        subModules.push({
          title: subModuleTitle,
          video: videoLink,
          description: description
        });
      });

      modules.push({
        title: moduleTitle,
        subModules: subModules
      });
    });

    courseData.curriculum = modules;
    localStorage.setItem("courseData", JSON.stringify(courseData));

    // Change button color to green
    document.querySelector(".save-n-next").style.backgroundColor = "green";

    console.log("Step 2 Saved:", courseData);

    // Redirect to Step 3 (Quiz Page)
    //  window.location.href = "../Step3Pages/quiz.html"; // Adjust the path if needed
  });
});