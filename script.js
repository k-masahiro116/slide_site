const slides = Array.from(document.querySelectorAll(".slide"));
const currentSlide = document.querySelector("#current-slide");
const totalSlides = document.querySelector("#total-slides");
const progressBar = document.querySelector(".progress-bar");
const previousButton = document.querySelector('[data-action="prev"]');
const nextButton = document.querySelector('[data-action="next"]');
const tocList = document.querySelector(".toc-list");

let activeIndex = 0;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function render() {
  slides.forEach((slide, index) => {
    slide.classList.toggle("is-active", index === activeIndex);
    slide.setAttribute("aria-hidden", String(index !== activeIndex));
  });

  document.querySelectorAll(".toc-section").forEach((section, index) => {
    const isActive = index === activeIndex;
    const link = section.querySelector(".toc-link");

    section.open = isActive;
    section.classList.toggle("is-active", isActive);
    link.classList.toggle("is-active", isActive);
    link.setAttribute("aria-current", isActive ? "step" : "false");
  });

  currentSlide.textContent = String(activeIndex + 1);
  totalSlides.textContent = String(slides.length);
  progressBar.style.width = `${((activeIndex + 1) / slides.length) * 100}%`;
  previousButton.disabled = activeIndex === 0;
  nextButton.disabled = activeIndex === slides.length - 1;

  const title = slides[activeIndex]?.dataset.title;
  document.title = title ? `${title} | Slide Site` : "Slide Site";
}

function goToSlide(index) {
  activeIndex = clamp(index, 0, slides.length - 1);
  render();
}

function handleKeydown(event) {
  const keyActions = {
    ArrowRight: () => goToSlide(activeIndex + 1),
    ArrowDown: () => goToSlide(activeIndex + 1),
    " ": () => goToSlide(activeIndex + 1),
    ArrowLeft: () => goToSlide(activeIndex - 1),
    ArrowUp: () => goToSlide(activeIndex - 1),
    Home: () => goToSlide(0),
    End: () => goToSlide(slides.length - 1),
  };

  const action = keyActions[event.key];
  if (!action) return;

  event.preventDefault();
  action();
}

function getSlideTitle(slide, index) {
  return (
    slide.querySelector("h1, h2")?.textContent?.trim() ||
    slide.dataset.title ||
    "Slide " + (index + 1)
  );
}

function getSlideSubtitle(slide, index) {
  return (
    slide.querySelector(".eyebrow")?.textContent?.trim() ||
    slide.dataset.title ||
    "Slide " + (index + 1)
  );
}

function buildTableOfContents() {
  tocList.innerHTML = "";

  slides.forEach((slide, index) => {
    const item = document.createElement("li");
    const section = document.createElement("details");
    const summary = document.createElement("summary");
    const button = document.createElement("button");

    section.className = "toc-section";
    summary.className = "toc-summary";
    summary.textContent = getSlideTitle(slide, index);

    button.className = "toc-link";
    button.type = "button";
    button.textContent = getSlideSubtitle(slide, index);
    button.addEventListener("click", () => goToSlide(index));

    section.append(summary, button);
    item.append(section);
    tocList.append(item);
  });
}

previousButton.addEventListener("click", () => goToSlide(activeIndex - 1));
nextButton.addEventListener("click", () => goToSlide(activeIndex + 1));
document.addEventListener("keydown", handleKeydown);

buildTableOfContents();
render();

