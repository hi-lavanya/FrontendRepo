import fetch from "node-fetch";
console.log("Fetching courses...");
document.addEventListener("DOMContentLoaded", async function () {
    const courseContainer = document.getElementById("courseContainer");

    const API_URL = "https://8bc0-2401-4900-1f2e-40c3-c8e6-64dc-ff61-4b1e.ngrok-free.app/instructor/course/getInstructorCourses/2"; 

    try {
        const url = "https://8bc0-2401-4900-1f2e-40c3-c8e6-64dc-ff61-4b1e.ngrok-free.app/instructor/course/getInstructorCourses/2";
            const responseObject = await fetch(url, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
            }});
            console.log({responseObject})
            const response = await responseObject.json();
            console.log({response});
        console.log("API Response:", response); 
        const courses = data.courses; 

        if (!Array.isArray(courses) || courses.length === 0) {
            console.warn("No courses found.");
            return;
        }

        courseContainer.innerHTML = ""; 
        courses.forEach(course => {
            const courseCard = document.createElement("div");
            courseCard.classList.add("container");

            courseCard.innerHTML = `
                <img src="${course.thumbnail}" alt="${course.course_title}">
                <div class="description">
                    <h2 class="containerheading">${course.course_title}</h2>
                    <p class="duration">⌛ ${course.duration}</p>
                </div>
                <div class="buttons">
                    <button class="editbutton">✎ Edit</button>
                    <button class="viewquizbutton">View Quiz</button>
                    <button class="unpublishbutton">Unpublish</button>
                </div>
            `;

            courseContainer.appendChild(courseCard);
        });

    } catch (error) {
        console.error("Error fetching courses:", error);
    }
});
