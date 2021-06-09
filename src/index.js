import './sass/main.scss';
import { refs } from './js/variables.js';
import cardData from './templates/card';
import NewsApiService from './js/apiService';

refs.searchForm.addEventListener('submit', onSearch);
refs.moreBtn.addEventListener('click', onLoadMore);

const newsApiService = new NewsApiService();

function onSearch(event) {
  event.preventDefault();

  newsApiService.query = event.currentTarget.elements.query.value.trim();
  newsApiService.resetPage();
  newsApiService.fetchArticles().then(renderCard);

  clearGallery();
}

function onLoadMore() {
  newsApiService.fetchArticles().then(renderCard, scrollImg());
}

function renderCard(data) {
  const doCard = cardData(data);
  refs.gallery.insertAdjacentHTML('beforeend', doCard);
}

function scrollImg() {
  refs.gallery.scrollIntoView({
    block: 'end',
    behavior: 'smooth',
  });
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
