// Step 1: Save Course Description
document.querySelector(".desc-save-btn")?.addEventListener("click", function (event) {
    event.preventDefault();
  
    const title = document.querySelector("#title").value.trim();
    const category = document.querySelector("#category").value;
    const description = document.querySelector("#description").value.trim();
    const thumbnail = document.querySelector("#thumbnail").files[0];
  
    if (!title || !category || !description || !thumbnail) {
      alert("Please fill out all fields before proceeding.");
      return;
    }
  
    // Convert thumbnail to Base64 for localStorage
    const reader = new FileReader();
    reader.onload = function (e) {
      const thumbnailBase64 = e.target.result;
  
      // Retrieve existing courseData or create a new one
      let courseData = JSON.parse(localStorage.getItem("courseData")) || {
        title: "",
        category: "",
        description: "",
        thumbnail: "",
        curriculum: []
      };
  
      // Update courseData
      courseData.title = title;
      courseData.category = category;
      courseData.description = description;
      courseData.thumbnail = thumbnailBase64;
  
      // Store updated courseData in localStorage
      localStorage.setItem("courseData", JSON.stringify(courseData));
  
      // Change button color to green
      document.querySelector(".desc-save-btn").style.backgroundColor = "green";
  
      console.log("Step 1 Saved:", courseData);
  
      // Redirect to Step 2 (Curriculum Page)
      window.location.href = "../Step2Pages/curriculum.html";
    };
    reader.readAsDataURL(thumbnail);
  });