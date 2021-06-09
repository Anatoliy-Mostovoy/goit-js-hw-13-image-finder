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
  newsApiService.fetchArticles().then(data => {
    renderCard(data);
    scrollImg();
  });
}

function renderCard(data) {
  const doCard = cardData(data);
  refs.gallery.insertAdjacentHTML('beforeend', doCard);
}

function scrollImg() {
  refs.moreBtn.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
