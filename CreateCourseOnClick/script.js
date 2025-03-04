const URL = "https://<>/instructor/course/createCourse";
const publishBtn = document.querySelector(".publish-btn");
const title = document.querySelector("#title").value.trim();
const category = document.querySelector("#category").value;
const description = document.querySelector("#description").value.trim();
const thumbnail = document.querySelector("#thumbnail").files[0];

publishBtn.addEventListener("click", () => {
    alert("Please fill mandatory fields first!");
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".inputs");
    const saveButton = document.querySelector(".desc-save-btn");

    saveButton.addEventListener("click", async function (event) {
        event.preventDefault();

        console.log("Collected Data:");
        console.log("Title:", title);
        console.log("Category:", category);
        console.log("Description:", description);
        console.log("Thumbnail:", thumbnail ? thumbnail.name : "No file selected");

        if (!title || !category || !description || !thumbnail) {
            alert("Please fill out all fields before submitting.");
            return;
        }

        const courseData = {
            title: title,
            category: category,
            description: description,
            thumbnail: thumbnail.name,
        };

        console.log("Stored Object:", courseData);

        const formData = new FormData();
        for (let key in courseData) {
            formData.append(key, courseData[key]);
        }
        formData.append("thumbnail", thumbnail);

        console.log("FormData Entries:");
        for (let pair of formData.entries()) {
            console.log(pair[0], ":", pair[1]);
        }

        localStorage.setItem("courseData", JSON.stringify(courseData));

        alert("Course data stored successfully and appended to FormData!");

        // OPTIONAL: Send to API (if needed)
        /*
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
        } catch (error) {
            console.error("Error:", error);
            alert("Error submitting course.");
        }
        */
    });
});
