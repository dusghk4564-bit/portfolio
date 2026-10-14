<<<<<<< HEAD
const projectModal = document.getElementById("project-modal");
const projectModalTitle = document.getElementById("project-modal-title");
const projectModalImage = document.getElementById("project-modal-image");
const projectModalClose = projectModal.querySelector(".project-modal-close");
let previousBodyOverflow = "";

document.querySelectorAll("[data-project-image]").forEach((project) => {
    project.addEventListener("click", () => {
        const thumbnail = project.querySelector("img");
        projectModalTitle.textContent = project.dataset.projectTitle;
        projectModalImage.src = project.dataset.projectImage;
        projectModalImage.alt = thumbnail.alt;
        previousBodyOverflow = document.body.style.overflow;
        projectModal.showModal();
        document.body.style.overflow = "hidden";
        projectModalClose.focus();
    });
});

projectModalClose.addEventListener("click", () => {
    projectModal.close();
});

projectModal.addEventListener("click", (event) => {
    if (event.target === projectModal) {
        projectModal.close();
    }
});

projectModal.addEventListener("close", () => {
    document.body.style.overflow = previousBodyOverflow;
});
=======
const projectModal = document.getElementById("project-modal");
const projectModalTitle = document.getElementById("project-modal-title");
const projectModalImage = document.getElementById("project-modal-image");
const projectModalClose = projectModal.querySelector(".project-modal-close");
let previousBodyOverflow = "";

document.querySelectorAll("[data-project-image]").forEach((project) => {
    project.addEventListener("click", () => {
        const thumbnail = project.querySelector("img");
        projectModalTitle.textContent = project.dataset.projectTitle;
        projectModalImage.src = project.dataset.projectImage;
        projectModalImage.alt = thumbnail.alt;
        previousBodyOverflow = document.body.style.overflow;
        projectModal.showModal();
        document.body.style.overflow = "hidden";
        projectModalClose.focus();
    });
});

projectModalClose.addEventListener("click", () => {
    projectModal.close();
});

projectModal.addEventListener("click", (event) => {
    if (event.target === projectModal) {
        projectModal.close();
    }
});

projectModal.addEventListener("close", () => {
    document.body.style.overflow = previousBodyOverflow;
});
>>>>>>> 31ddcf7e9368338d87f6ec6b71cb3a8ba117e500
