document.addEventListener('DOMContentLoaded', function() {
    // Initialize Quill editors.  Use a class selector for easier access
    const editors = document.querySelectorAll('.editor');
    editors.forEach(editorElement => {
        new Quill(editorElement, { theme: 'snow' });
    });

    const curriculumContainer = document.getElementById('curriculum-container');
    let moduleCount = 1; //Track modules and submodules number
    // Function to create a new sub-module
    function createSubModule(moduleElement, subModuleCount) {
        const subModuleDiv = document.createElement('div');
        subModuleDiv.classList.add('sub-module');

        subModuleDiv.innerHTML = `
            <div class="sub-module-header">
                <label class="sub-module-label">Sub-Module ${subModuleCount}:</label>
                <input type="text" class="title-input" placeholder="Enter title" disabled>
                <button class="edit"><i class="fa-solid fa-pen"></i></button>
                <button class="delete">🗑</button>
                <div class="button-container">
                  <button class="add-sub-module">+ Sub-Module</button>
                  <button class="dropdown">▼</button>
                </div>
            </div>
            <div class="sub-module-content">
                <label>Add Video:</label>
                <input type="text" placeholder="Insert Video Link here..." class="video-link" disabled/>
            </div>
            <div class="sub-module-content1">
                <label>Sub-Module Description:</label>
                <div class="editor" style="height: 120px;"></div>
            </div>
        `;

        // Initialize Quill for the new submodule
        const editorElement = subModuleDiv.querySelector('.editor');
        new Quill(editorElement, { theme: 'snow' });

        // Attach event listeners to the new sub-module's buttons (important!)
        const addSubModuleButton = subModuleDiv.querySelector('.add-sub-module');
        addSubModuleButton.addEventListener('click', function() {
            console.log("clicked +submodule");
            const currentSubModuleCount = moduleElement.querySelectorAll('.sub-module').length + 1;
            createSubModule(moduleElement, currentSubModuleCount);  // Recursively add sub-modules
        });
         // Delete button functionality
         const deleteButton = subModuleDiv.querySelector('.delete');
            deleteButton.addEventListener('click', function() {
                subModuleDiv.remove();
            });
        //Dropdown
        const dropdownButton = subModuleDiv.querySelector('.dropdown');
        dropdownButton.addEventListener('click', function() {
            console.log("clicked dropdown");
            // Find the  submodule content div
            subModuleDiv.querySelector('.sub-module-content').classList.toggle('hidden');
        });

          // Edit Functionality for submodule
        const editButton = subModuleDiv.querySelector('.edit');

        editButton.addEventListener('click', function() {
        const titleInput = subModuleDiv.querySelector('.title-input');
        const videoLinkInput = subModuleDiv.querySelector('.video-link');

            if (titleInput) {
            titleInput.disabled = !titleInput.disabled;  // Toggle disabled state
            if (!titleInput.disabled) {
                titleInput.focus(); // Put focus on the input when editing
            }
            }
            if (videoLinkInput) {
                videoLinkInput.disabled = !videoLinkInput.disabled;  // Toggle disabled state
                if (!videoLinkInput.disabled) {
                    videoLinkInput.focus(); // Put focus on the input when editing
                }
            }
        });

        moduleElement.appendChild(subModuleDiv);  //Append to parent Module
    }

    // Function to create a new module
    function createModule() {
        moduleCount++;
        let subModuleCount = 1; //Reset submodule count for each new module
        const moduleDiv = document.createElement('div');
        moduleDiv.classList.add('module');

        moduleDiv.innerHTML = `
            <div class="module-header">
                <label class="module-label">Module ${moduleCount}:</label>
                <input type="text" class="title-input" placeholder="Enter title">
                <button class="edit"><i class="fa-solid fa-pen"></i></button>
                <button class="delete">🗑</button>
                <div class="button-container">  <!-- ADDED: Button Container -->
                  <button class="dropdown">▼</button>
                </div>
            </div>
            <div class="sub-module">
              <div class="sub-module-header">
                <label class="sub-module-label">Sub-Module ${subModuleCount}:</label>
                <input type="text" class="title-input" placeholder="Enter title" disabled>
                <button class="edit"><i class="fa-solid fa-pen"></i></button>
                <button class="delete">🗑</button>
                 <div class="button-container">
                  <button class="add-sub-module">+ Sub-Module</button>
                  <button class="dropdown">▼</button>
                </div>
              </div>


              <div class="sub-module-content">
                <label>Add Video:</label>
                <input type="text" placeholder="Insert Video Link here..." class="video-link" disabled/>
              </div>
              <div class="sub-module-content1">
                <label>Sub-Module Description:</label>
                <div class="editor" style="height: 120px;"></div>
              </div>
            </div>
        `;

        // Initialize Quill for the new module's initial submodule
        const editorElement = moduleDiv.querySelector('.editor');
        new Quill(editorElement, { theme: 'snow' });
        // Attach event listener to the new module's "Add Sub-Module" button
        const addSubModuleButton = moduleDiv.querySelector('.add-sub-module');
        addSubModuleButton.addEventListener('click', function() {
            const currentSubModuleCount = moduleDiv.querySelectorAll('.sub-module').length + 1;
            createSubModule(moduleDiv, currentSubModuleCount);
        });
         // Delete button functionality
         const deleteButton = moduleDiv.querySelector('.delete');
            deleteButton.addEventListener('click', function() {
                moduleDiv.remove();
            });
          //Dropdown
          const dropdownButton = moduleDiv.querySelector('.dropdown');
        
        if (!dropdownButton) {

            console.error("Dropdown button not found!");
            return;
        }
        dropdownButton.addEventListener('click', function() {
            console.log("clicked dropdown");
            // Find the  submodule content div
            moduleDiv.querySelector('.sub-module').classList.toggle('hidden');
        });
        
        const saveNextButton = document.querySelector('.save-n-next');
        alert("module saved");

        curriculumContainer.insertBefore(moduleDiv, saveNextButton); //Insert before the button
    }

    // Add Module button event listener
    const addModuleButton = document.querySelector('.add-module');
    addModuleButton.addEventListener('click', createModule);

    // Initial Sub-Module Button Event Listener (for the default module)
    const initialAddSubModuleButton = document.querySelector('.add-sub-module');
    initialAddSubModuleButton.addEventListener('click', function() {
        const initialModule = document.querySelector('.module');  // Get the default module
        const currentSubModuleCount = initialModule.querySelectorAll('.sub-module').length + 1;
        createSubModule(initialModule, currentSubModuleCount);
    });


    // Edit Functionality
    const editButtons = document.querySelectorAll('.edit');

    editButtons.forEach(button => {
      button.addEventListener('click', function() {
        const parent = this.closest('.module-header') || this.closest('.sub-module-header');
        if (!parent) return;

        const titleInput = parent.querySelector('.title-input');
        if (titleInput) {
          titleInput.disabled = !titleInput.disabled;  // Toggle disabled state
          if (!titleInput.disabled) {
            titleInput.focus(); // Put focus on the input when editing
          }
        }
      });
    });

});