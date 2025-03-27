import { loadCSS } from '../../scripts/lib-franklin.js';

const fetchRSSFeed = async () => {
  try {
    const response = await fetch('https://newsdata.io/api/1/news?apikey=pub_74190f1a09ff0aad8b8e1dd35167f33e536f6&q=technology&country=us&language=en');
    if (!response.ok) throw new Error('Failed to fetch RSS feed');
    const data = await response.json();
    return   data.results.slice(0, 8);;
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return null;
  }
};

const renderRSSFeed = (rssFeedItems, block) => {
  if (!rssFeedItems) {
    block.innerHTML = '<p>Failed to load RSS feed.</p>';
    return;
  }

  const rssFeedHTML = rssFeedItems.map(item => `
    <div class="rss-feed-card" role="article" aria-labelledby="title-${item.article_id}">
      <img src="${item.image_url || 'placeholder.jpg'}" alt="${item.title}" loading="lazy">
      <h3 id="title-${item.article_id}"><a href="${item.link}" target="_blank" aria-label="Read more about ${item.title}">${item.title}</a></h3>
      <div class="source-info" aria-label="Source information">
        <img src="${item.source_icon}" alt="${item.source_name} logo" loading="lazy">
        <span>${item.source_name}</span>
      </div>
      <time datetime="${new Date(item.pubDate).toISOString()}">${new Date(item.pubDate).toLocaleDateString()}</time>
    </div>
  `).join('');

  block.innerHTML = rssFeedHTML;
};

export default async function decorate(block) {
  loadCSS('/blocks/rss-feed/rss-feed.css');

  const rssFeedItems = await fetchRSSFeed();
  renderRSSFeed(rssFeedItems, block);
}
