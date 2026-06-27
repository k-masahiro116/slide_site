const slides = Array.from(document.querySelectorAll(".slide"));
const currentSlide = document.querySelector("#current-slide");
const totalSlides = document.querySelector("#total-slides");
const progressBar = document.querySelector(".progress-bar");
const previousButton = document.querySelector('[data-action="prev"]');
const nextButton = document.querySelector('[data-action="next"]');

let activeIndex = 0;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function render() {
  slides.forEach((slide, index) => {
    slide.classList.toggle("is-active", index === activeIndex);
    slide.setAttribute("aria-hidden", String(index !== activeIndex));
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

previousButton.addEventListener("click", () => goToSlide(activeIndex - 1));
nextButton.addEventListener("click", () => goToSlide(activeIndex + 1));
document.addEventListener("keydown", handleKeydown);

render();

