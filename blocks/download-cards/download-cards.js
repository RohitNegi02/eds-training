export default function decorate(block) {
  const cardsData = Array.from(block.children);

  // Extracting data from block HTML
  const header = cardsData[0].querySelector('h2').textContent;
  const description = cardsData[0].querySelector('p').textContent;

  const cardElements = cardsData.slice(1).map((card) => {
    const imgElement = card.querySelector('img');
    const title = card.querySelector('p').textContent;
    const downloadLink = card.querySelector('a').href;

    return {
      imgSrc: imgElement.src,
      imgAlt: imgElement.alt,
      title,
      downloadLink,
    };
  });

  // Constructing new HTML structure
  block.innerHTML = `
    <h2>${header}</h2>
    <p>${description}</p>
    <div class="download-cards-grid">
      ${cardElements.map(card => `
        <div class="download-cards-card">
          <img src="${card.imgSrc}" alt="${card.imgAlt}">
          <h3>${card.title}</h3>
          <button onclick="window.location.href='${card.downloadLink}'">Download</button>
        </div>
      `).join('')}
    </div>
  `;
}
