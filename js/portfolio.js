const projectModal = document.getElementById("project-modal");
const projectModalTitle = document.getElementById("project-modal-title");
const projectModalImage = document.getElementById("project-modal-image");
const projectModalGallery = document.getElementById("project-modal-gallery");
const projectModalSlideControls = [...projectModalGallery.querySelectorAll("[data-slide-direction]")];
const projectModalClose = projectModal.querySelector(".project-modal-close");
const projectDetailModal = document.getElementById("project-detail-modal");
const projectDetailModalTitle = document.getElementById("project-detail-modal-title");
const projectDetailModalImage = document.getElementById("project-detail-modal-image");
const projectDetailModalClose = projectDetailModal.querySelector(".project-detail-modal-close");

let previousBodyOverflow = "";
let currentSlides = [];
let currentSlideIndex = -1;

const showProjectSlide = (index, direction) => {
    currentSlideIndex = (index + currentSlides.length) % currentSlides.length;
    projectModalImage.src = currentSlides[currentSlideIndex];
    projectModalGallery.classList.remove("is-sliding-next", "is-sliding-previous");
    projectModalGallery.getBoundingClientRect();
    projectModalGallery.classList.add(direction > 0 ? "is-sliding-next" : "is-sliding-previous");
};

document.querySelectorAll("[data-project-image]").forEach((project) => {
    project.addEventListener("click", () => {
        const thumbnail = project.querySelector("img");
        const title = project.dataset.projectTitle;
        currentSlides = project.dataset.projectSlides
            ? project.dataset.projectSlides.split("|").filter(Boolean)
            : [];
        currentSlideIndex = currentSlides.length ? currentSlides.indexOf(project.dataset.projectImage) : -1;
        projectModalTitle.textContent = title;
        projectModalImage.src = project.dataset.projectImage;
        projectModalImage.alt = thumbnail ? thumbnail.alt : title;
        if (currentSlideIndex >= 0) {
            projectModalImage.src = currentSlides[currentSlideIndex];
        }
        projectModalSlideControls.forEach((control) => {
            control.hidden = currentSlides.length < 2;
        });

        previousBodyOverflow = document.body.style.overflow;
        projectModal.showModal();
        document.body.style.overflow = "auto";
        projectModalClose.focus();
    });
});


document.querySelectorAll("[data-web-process]").forEach((button) => {
    button.addEventListener("click", () => {
        const { webImage, webTitle } = button.dataset;

        // 모달 제목과 이미지 설정
        projectDetailModalTitle.textContent = webTitle;
        projectDetailModalImage.src = webImage;
        projectDetailModalImage.alt = `${webTitle} 상세페이지`;

        // 모달을 열기 전 현재 스크롤 위치 저장
        scrollPosition = window.scrollY;

        // 상세페이지 모달 열기
        projectDetailModal.showModal();
        projectDetailModalClose.focus();
    });
});

projectDetailModal.addEventListener("close", () => {
    // 모달을 닫으면 원래 페이지 위치로 복귀
    window.scrollTo(0, scrollPosition);
});


projectDetailModalClose.addEventListener("click", () => {
    projectDetailModal.close();
});

projectModalSlideControls.forEach((control) => {
    control.addEventListener("click", () => {
        showProjectSlide(currentSlideIndex + Number(control.dataset.slideDirection), Number(control.dataset.slideDirection));
    });
});

projectModal.addEventListener("keydown", (event) => {
    if (!projectModal.open || currentSlides.length < 2) {
        return;
    }
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        showProjectSlide(currentSlideIndex + direction, direction);
    }
});

let slidePointerStartX = null;

projectModalGallery.addEventListener("pointerdown", (event) => {
    if (currentSlides.length > 1 && event.pointerType !== "mouse") {
        slidePointerStartX = event.clientX;
    }
});

projectModalGallery.addEventListener("pointerup", (event) => {
    if (slidePointerStartX === null) {
        return;
    }
    const swipeDistance = event.clientX - slidePointerStartX;
    slidePointerStartX = null;
    if (Math.abs(swipeDistance) < 40) {
        return;
    }
    const direction = swipeDistance < 0 ? 1 : -1;
    showProjectSlide(currentSlideIndex + direction, direction);
});

projectModalGallery.addEventListener("pointercancel", () => {
    slidePointerStartX = null;
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
    currentSlides = [];
    currentSlideIndex = -1;
});

const carousel = document.querySelector("[data-carousel]");

if (carousel) {
    const track = carousel.querySelector(".sns-track");
    const slides = [...track.children];
    const slideCount = slides.length;
    const firstSlide = slides[0];
    const lastSlide = slides[slideCount - 1];
    const firstClone = firstSlide.cloneNode(true);
    const lastClone = lastSlide.cloneNode(true);
    const viewport = carousel.querySelector(".sns-viewport");
    const controls = document.querySelectorAll(".sns-control");
    const playToggle = document.querySelector(".sns-play-toggle");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let position = 1;
    let direction = 1;
    let intervalId;

    [firstClone, lastClone].forEach((slide) => {
        slide.setAttribute("aria-hidden", "true");
        slide.setAttribute("inert", "");
    });
    track.prepend(lastClone);
    track.append(firstClone);

    const moveCarousel = (nextPosition) => {
        position = nextPosition;
        const slide = track.firstElementChild;
        const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
        const offset = (slide.getBoundingClientRect().width + gap) * position;
        track.style.transform = `translateX(-${offset}px)`;
    };

    const advanceCarousel = () => {
        if (position <= 1) {
            direction = 1;
        } else if (position >= slideCount) {
            direction = -1;
        }
        moveCarousel(position + direction);
    };

    const stopCarousel = () => {
        window.clearInterval(intervalId);
        intervalId = undefined;
    };

    const startCarousel = () => {
        stopCarousel();
        if (reducedMotion.matches || playToggle.getAttribute("aria-pressed") === "true") {
            return;
        }
        intervalId = window.setInterval(advanceCarousel, 3500);
    };

    controls.forEach((control) => {
        control.addEventListener("click", () => {
            if (control === playToggle) {
                const isPaused = playToggle.getAttribute("aria-pressed") === "true";
                playToggle.setAttribute("aria-pressed", String(!isPaused));
                playToggle.setAttribute("aria-label", isPaused ? "자동 이동 일시정지" : "자동 이동 재생");
                playToggle.textContent = isPaused ? "Ⅱ" : "▶";
            } else {
                direction = Number(control.dataset.carouselDirection);
                moveCarousel(position + direction);
            }
            startCarousel();
        });
    });

    track.addEventListener("transitionend", (event) => {
        if (event.propertyName !== "transform" || (position !== 0 && position !== slideCount + 1)) {
            return;
        }
        position = position === 0 ? slideCount : 1;
        track.style.transition = "none";
        moveCarousel(position);
        track.getBoundingClientRect();
        track.style.transition = "";
    });

    viewport.addEventListener("pointerenter", stopCarousel);
    viewport.addEventListener("pointerleave", startCarousel);
    viewport.addEventListener("focusin", stopCarousel);
    viewport.addEventListener("focusout", (event) => {
        if (!viewport.contains(event.relatedTarget)) {
            startCarousel();
        }
    });
    window.addEventListener("resize", () => moveCarousel(position));
    reducedMotion.addEventListener("change", startCarousel);

    moveCarousel(position);
    startCarousel();
}

let scrollPosition = 0;

