const catalogGrid = document.querySelector("#catalog-grid");

function createDeckCard(deck) {
  const item = document.createElement("li");
  const link = document.createElement("a");

  item.className = "catalog-item";
  link.className = "deck-card";
  link.href = deck.href;

  link.innerHTML = `
    <div class="deck-card-cover">
      <div class="deck-card-frame">
        <section class="title-slide deck-card-slide" aria-hidden="true">
          <p class="eyebrow"></p>
          <h1></h1>
          <p class="lead"></p>
        </section>
      </div>
    </div>
    <span class="deck-card-label"></span>
  `;

  link.querySelector(".eyebrow").textContent = deck.eyebrow;
  link.querySelector("h1").textContent = deck.title;
  link.querySelector(".lead").textContent = deck.description;
  link.querySelector(".deck-card-label").textContent = deck.title;

  item.append(link);
  return item;
}

async function loadCatalog() {
  try {
    const response = await fetch("slides/manifest.json");
    if (!response.ok) throw new Error("manifest not found");

    const { decks } = await response.json();
    catalogGrid.replaceChildren(...decks.map(createDeckCard));
  } catch {
    catalogGrid.innerHTML =
      '<li class="catalog-error">スライド一覧を読み込めませんでした。</li>';
  }
}

loadCatalog();
