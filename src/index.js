import './sass/main.scss';
import { refs } from './js/variables.js';
import cardData from './templates/card';
import NewsApiService from './js/apiService';

console.log(refs.loadBtn);

refs.searchForm.addEventListener('submit', onSearch);
refs.moreBtn.addEventListener('click', onLoadMore);

const newsApiService = new NewsApiService();

function onSearch(event) {
  event.preventDefault();

  newsApiService.query = event.currentTarget.elements.query.value.trim();
  newsApiService.resetPage();
  newsApiService.fetchArticles().then(renderCard);
}

function onLoadMore() {
  newsApiService.fetchArticles().then(renderCard);

  refs.loadBtn.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function renderCard(data) {
  const doCard = cardData(data);
  refs.gallery.insertAdjacentHTML('beforeend', doCard);
}
