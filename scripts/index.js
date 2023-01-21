
let page = document.querySelector('.page');
let profile = page.querySelector('.profile');
let popup = page.querySelector('.popup');
let elements = page.querySelector('.elements');
let editBbtn = profile.querySelector('.profile__edit-btn');
let closeBtn = popup.querySelector('.popup__icon-close');
let formElement = popup.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__input-name');
let jobInput = formElement.querySelector('.popup__input-job');
let name = profile.querySelector('.profile__name');
let job  = profile.querySelector('.profile__job');

//Открыть popup
editBbtn.addEventListener('click', playPopup);
function playPopup() {
	popup.classList.add('popup_opened');
}

//Закрыть popup 
closeBtn.addEventListener('click', closePopup);
function closePopup() { 
	popup.classList.remove('popup_opened');
	nameInput.value = name.textContent; 
	jobInput.value  = job.textContent;
}

// Работа с input
formElement.addEventListener('submit', handleFormSubmit); 
function handleFormSubmit (evt) {
  evt.preventDefault(); 
  name.textContent = nameInput.value;
	job.textContent = jobInput.value;
	popup.classList.remove('popup_opened');
	closeBtn.addEventListener('click', closePopup);
}




