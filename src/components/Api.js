export default class Api {
  constructor(options) {
    this._options = options;
  }

  _checkPrommis(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getProfileInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers,
    }).then((res) => this._checkPrommis(res));
  }

  patchProfileInfo(data) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._checkPrommis(res));
  }

  patchAvatar(data) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: data.url,
      }),
    }).then((res) => this._checkPrommis(res));
  }

  //-------------------------------------------------

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers,
    }).then((res) => this._checkPrommis(res));
  }

  postNewCard({ title, link }) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        name: title,
        link: link,
      }),
    }).then((res) => this._checkPrommis(res));
  }

  patchEditAvatar(link) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => this._checkPrommis(res));
  }

  deleteCard(idCard) {
    return fetch(`${this._options.baseUrl}/cards/${idCard}`, {
      method: 'DELETE',
      headers: this._options.headers,
    }).then((res) => this._checkPrommis(res));
  }

  putlikeCard(idCard) {
    return fetch(`${this._options.baseUrl}/cards/${idCard}/likes`, {
      method: 'PUT',
      headers: this._options.headers,
    }).then((res) => this._checkPrommis(res));
  }

  deleteLikeCard(idCard) {
    return fetch(`${this._options.baseUrl}/cards/${idCard}/likes`, {
      method: 'DELETE',
      headers: this._options.headers,
    }).then((res) => this._checkPrommis(res));
  }
}
