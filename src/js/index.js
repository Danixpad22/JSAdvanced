// Import axios
const axios = require('axios');

// Import CSS styles
import '../css/styles.css';

const newsElement = document.getElementById('newsList');
const btnLoadMore = document.getElementById('loadMoreNews');
const newsForPage = 10;
let currentPage = 0;

const loadNews = () => {
  const start = newsForPage * currentPage;
  const end = start + newsForPage;

  axios.get('https://hacker-news.firebaseio.com/v0/newstories.json')
    .then(responseNews => {
      const idNews = responseNews.data;
      const idStartEnd = idNews.slice(start, end);
      const promiseDetails = idStartEnd.map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`));
      console.log(promiseDetails);
      return Promise.all(promiseDetails);
    })
    .then(detailsNews => {
      detailsNews.forEach(response => {
        const news = response.data;

        // Create news element
        const listElement = document.createElement('li');
        const linkElement = document.createElement('a');

        // Customize news element
        listElement.classList.add('li-style');
        linkElement.classList.add('link-element-style');
        linkElement.href = news.url;
        linkElement.textContent = news.title;
        linkElement.target = '_blank';

        // Create date news
        const date = document.createElement('p');
        date.classList.add('date-style');
        date.textContent = new Date(news.time * 1000).toLocaleString();
        console.log(date);

        // Append to document
        listElement.appendChild(linkElement);
        listElement.appendChild(date);
        newsElement.appendChild(listElement);  
      });
      // Increment the page number for the next load
      currentPage++;
    })
    .catch(error => console.error('Errore nel caricamento delle notizie:', error));
};

btnLoadMore.addEventListener('click',loadNews);

loadNews();