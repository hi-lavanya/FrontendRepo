const URL = "https://<>/instructor/course/createCourse";
let publishBtn = document.querySelector(".publish-btn")

publishBtn.addEventListener("click", () =>{
    alert("Please fill mandatory fields first!");
})

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".inputs");
    const saveButton = document.querySelector(".save-btn");

    saveButton.addEventListener("click", async function (event) {
        event.preventDefault();

        const title = document.querySelector("#title").value.trim();
        const category = document.querySelector("#category").value;
        const description = document.querySelector("#description").value.trim();
        const thumbnail = document.querySelector("#thumbnail").files[0]; 

        console.log("Collected Data:");
        console.log("Title:", title);
        console.log("Category:", category);
        console.log("Description:", description);
        console.log("Thumbnail:", thumbnail ? thumbnail.name : "No file selected");

        if (!title || !category || !description || !thumbnail) {
            alert("Please fill out all fields before submitting.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", category);
        formData.append("description", description);
        formData.append("thumbnail", thumbnail);

        try {
            let response = await fetch(URL, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }

            let data = await response.json();
            console.log("Success:", data);
            alert("Course submitted successfully!");

            form.reset();
        } catch (error) {
            console.error("Error:", error);
            alert("Error submitting course.");
        }
    });
});
