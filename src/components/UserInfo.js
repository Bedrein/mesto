//отвечает за управление отображением информации о
//пользователе на странице.
export default class UserInfo {
  constructor({ name, job }) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
  }

  //Возвращает объект с данными пользователя.
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    };
  }

  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo = (data) => {
    this._name.textContent = data.name;
    this._job.textContent = data.job;
  };
}
