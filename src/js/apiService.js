export default class NewsApiService {
  constructor() {
    this.searchQuery = ''; //это сво-во обьекта NewApiSerice
    this.page = 1;
  }
  //fetchArticle это метод обьекта NewApiService
  fetchArticles() {
    console.log(this);
    const KEY = '21944092-5843deb4113ddddf966c6ecb1';
    const URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`;

    return fetch(URL) //return для возврата промиса во внешнюю функицю
      .then(response => response.json())
      .then(data => {
        this.page += 1;
        return data; //возврат значения промиса во внешнюю функцию
      });
  }
  //для обнуления номера страниц при новом поиске
  resetPage() {
    this.page = 1;
  }
  //для получения данных из внешенго кода
  get query() {
    return this.searchQuery;
  }

  set query(newQeury) {
    this.searchQuery = newQeury;
  }
}
