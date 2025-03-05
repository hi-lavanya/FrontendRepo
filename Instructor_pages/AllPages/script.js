document.addEventListener('DOMContentLoaded', function () {
  const firstEditor = document.querySelector('.editor');
  if (firstEditor) {
    new Quill(firstEditor, { theme: 'snow' });
  }

  const curriculumContainer = document.getElementById('curriculum-container');
  let moduleCount = document.querySelectorAll('.module').length;

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
    }
  }

  function createSubModule(moduleElement) {
    const subModuleCount = moduleElement.querySelectorAll('.sub-module').length + 1;
    const subModuleDiv = document.createElement('div');
    subModuleDiv.classList.add('sub-module');
    subModuleDiv.innerHTML = `
      <div class="sub-module-header">
        <label class="sub-module-label">Sub-Module ${subModuleCount}:</label>
        <input type="text" class="title-input" placeholder="Enter title">
        <button class="delete">❌</button>
        <div class="button-container">
          <button class="add-sub-module">+ Sub-Module</button>
          <button class="dropdown">▼</button>
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
    `;

    const editorElement = subModuleDiv.querySelector('.editor');
    new Quill(editorElement, { theme: 'snow' });

    subModuleDiv.querySelector('.add-sub-module').addEventListener('click', () => {
      createSubModule(moduleElement);
    });

    subModuleDiv.querySelector('.delete').addEventListener('click', () => {
      subModuleDiv.remove();
      updateSubModuleNumbers(moduleElement);
    });

    subModuleDiv.querySelector('.dropdown').addEventListener('click', function () {
      
      toggleDropdown(this);
    });

    moduleElement.appendChild(subModuleDiv);
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
          <button class="dropdown">▼</button>
        </div>
      </div>
    `;

    moduleDiv.querySelector('.delete').addEventListener('click', () => {
      moduleDiv.remove();
      updateModuleNumbers();
    });

    moduleDiv.querySelector('.dropdown').addEventListener('click', function () {
      moduleDiv.querySelectorAll('.sub-module').forEach(sub => sub.classList.toggle('hidden'));
    });

    curriculumContainer.insertBefore(moduleDiv, document.querySelector('.save-n-next'));
    createSubModule(moduleDiv);
    updateModuleNumbers();
  }

  // Attach event listeners to the first module and its dropdown
  const firstModule = document.querySelector('.module');
  if (firstModule) {
    const firstModuleDropdown = firstModule.querySelector('.dropdown');
    if (firstModuleDropdown) {
      firstModuleDropdown.addEventListener('click', function () {
        firstModule.querySelectorAll('.sub-module').forEach(sub => sub.classList.toggle('hidden'));
      });
    }

    // Attach event listener to first sub-module dropdown
    const firstSubModule = firstModule.querySelector('.sub-module');
    if (firstSubModule) {
      const firstSubModuleDropdown = firstSubModule.querySelector('.dropdown');
      if (firstSubModuleDropdown) {
        firstSubModuleDropdown.addEventListener('click', function () {
          toggleDropdown(this);
        });
      }
    }
  }

  document.querySelector('.add-module').addEventListener('click', createModule);
  document.querySelector('.add-sub-module').addEventListener('click', function () {
    createSubModule(document.querySelector('.module'));
  });
});
