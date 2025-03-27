

/**
 * Decorates the banner block.
 * @param {Element} block The banner block element
 */
export default async function decorate(block) {
  // Data extraction with null checking
  const getElementText = (selector) => {
    const element = block.querySelector(selector);
    return element ? element.textContent : '';
  };

  const imageSrc = block.querySelector('img')?.getAttribute('src') || '';
  const featuredText = getElementText('strong');
  const mainTitle = getElementText('h2');
  const description = getElementText('p:nth-of-type(2)');

  // Main banner container
  const bannerContent = document.createElement('div');
  bannerContent.className = 'banner-content';
  bannerContent.style.backgroundImage = `url(${imageSrc})`;

  // Create a container for text and temperature info
  const bannerInner = document.createElement('div');
  bannerInner.className = 'banner-inner';

  // Utility function to create elements
  const createElement = (tag, className, text = '') => {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = text;
    return element;
  };

  // Add content to the banner
  const textContainer = createElement('div', 'text-container');
  textContainer.appendChild(createElement('h3', 'banner-title', featuredText));
  textContainer.appendChild(createElement('h1', 'banner-title', mainTitle));
  textContainer.appendChild(createElement('p', 'banner-title', description));

  const tempInfoContainer = createElement('div', 'temperature-info');
  const tempList = createElement('ul', '');
  const currentTemp = createElement('li', '');
  const minTemp = createElement('li', '');
  const maxTemp = createElement('li', '');

  tempList.append(currentTemp, minTemp, maxTemp);
  tempInfoContainer.appendChild(tempList);
  bannerInner.append(textContainer, tempInfoContainer);

  // Append new structure to the block
  block.innerHTML = '';
  bannerContent.appendChild(bannerInner);
  block.appendChild(bannerContent);

  // Fetch temperature data
  try {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=3cb03b517e26c5c370402011f5438cbf');
    const data = await response.json();
    
    if (data.main) {
      currentTemp.textContent = `Current Temp: ${data.main.temp}°C`;
      minTemp.textContent = `Min Temp: ${data.main.temp_min}°C`;
      maxTemp.textContent = `Max Temp: ${data.main.temp_max}°C`;
    }
  } catch (error) {
    console.error('Error fetching temperature data:', error);
    currentTemp.textContent = 'Current Temp: N/A';
    minTemp.textContent = 'Min Temp: N/A';
    maxTemp.textContent = 'Max Temp: N/A';
  }
}

