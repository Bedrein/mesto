let page = document.querySelector('.page');
let profile = page.querySelector('.profile');
let popup = page.querySelector('.popup');
let elements = page.querySelector('.elements');
let editBbtn = profile.querySelector('.profile__edit-btn');
let closeBtn = popup.querySelector('.popup__button-close');
let formElement = popup.querySelector('.popup__container');
let nameInput = popup.querySelector('.popup__input_text_name');
let jobInput = popup.querySelector('.popup__input_text_job');
let name = profile.querySelector('.profile__name');
let job  = profile.querySelector('.profile__job');

//Открыть popup
function playPopup() {
	popup.classList.add('popup_opened');
	nameInput.value = name.textContent; 
	jobInput.value  = job.textContent;
}

//Закрыть popup 
function closePopup() { 
	popup.classList.remove('popup_opened');
}

// Работа с input
function handleFormSubmit (evt) {
  evt.preventDefault(); 
  name.textContent = nameInput.value;
	job.textContent = jobInput.value;
	closePopup();
}

editBbtn.addEventListener('click', playPopup);
closeBtn.addEventListener('click', closePopup);

formElement.addEventListener('submit', handleFormSubmit); 