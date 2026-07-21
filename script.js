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

  // TOC: グループ単位で大項目をハイライト、小項目ボタンをアクティブ化
  document.querySelectorAll(".toc-section").forEach((section) => {
    const links = Array.from(section.querySelectorAll(".toc-link"));
    const isGroupActive = links.some(
      (btn) => Number(btn.dataset.slideIndex) === activeIndex
    );

    section.open = isGroupActive;
    section.classList.toggle("is-active", isGroupActive);

    links.forEach((btn) => {
      const isActive = Number(btn.dataset.slideIndex) === activeIndex;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-current", isActive ? "step" : "false");
    });
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

function getSlideLabel(slide, index) {
  return (
    // slide.querySelector(".eyebrow")?.textContent?.trim() ||
    slide.querySelector(".title")?.textContent?.trim() ||
    // slide.dataset.title ||
    "Slide " + (index + 1)
  );
}

function buildTableOfContents() {
  tocList.innerHTML = "";

  // data-group でスライドをグループ化（順序を保持）
  const groups = [];
  const groupMap = new Map();

  slides.forEach((slide, index) => {
    const groupName =
      slide.dataset.group ||
      slide.querySelector("h1, h2")?.textContent?.trim() ||
      slide.dataset.title ||
      "Slide " + (index + 1);

    if (!groupMap.has(groupName)) {
      const group = { name: groupName, slides: [] };
      groups.push(group);
      groupMap.set(groupName, group);
    }
    groupMap.get(groupName).slides.push({ slide, index });
  });

  groups.forEach(({ name, slides: groupSlides }) => {
    const item = document.createElement("li");
    const section = document.createElement("details");
    const summary = document.createElement("summary");

    section.className = "toc-section";
    summary.className = "toc-summary";
    summary.textContent = name;

    section.append(summary);

    groupSlides.forEach(({ slide, index }) => {
      const button = document.createElement("button");
      button.className = "toc-link";
      button.type = "button";
      button.dataset.slideIndex = index;
      button.textContent = getSlideLabel(slide, index);
      button.addEventListener("click", () => goToSlide(index));
      section.append(button);
    });

    item.append(section);
    tocList.append(item);
  });
}

previousButton.addEventListener("click", () => goToSlide(activeIndex - 1));
nextButton.addEventListener("click", () => goToSlide(activeIndex + 1));
document.addEventListener("keydown", handleKeydown);

function setupPdfExport() {
  const controls = document.querySelector(".controls");
  if (!controls || controls.querySelector('[data-action="pdf"]')) return;

  const button = document.createElement("button");
  button.className = "control control-pdf";
  button.type = "button";
  button.dataset.action = "pdf";
  button.setAttribute("aria-label", "PDFとして保存");
  button.title = "印刷ダイアログから「PDFに保存」を選んでください";
  button.textContent = "PDF";
  button.addEventListener("click", () => window.print());
  controls.append(button);
}

buildTableOfContents();
setupPdfExport();
render();