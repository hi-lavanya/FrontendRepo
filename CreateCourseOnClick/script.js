console.log("Success:")
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".inputs");
    const saveButton = document.querySelector(".save-btn");

    saveButton.addEventListener("click", function (event) {
        event.preventDefault();

        const title = document.querySelector("#title").value.trim();
        const category = document.querySelector("#category").value;
        const description = document.querySelector("#description").value.trim();
        const thumbnail = document.querySelector("#thumbnail").files[0];

        if (!title || !category || !description || !thumbnail) {
            alert("Please fill out all fields before submitting.");
            return;
        }

        const formData = new FormData(form);
        formData.append("title", title);
        formData.append("category", category);
        formData.append("description", description);
        formData.append("thumbnail", thumbnail);

        console.log(formData);
    });
});
