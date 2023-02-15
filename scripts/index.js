const page = document.querySelector('.page');
const profile = page.querySelector('.profile');
const popup = page.querySelector('.popup');
const elements = page.querySelector('.elements');
const itemLiistWrapper = elements.querySelector('.element');
const editBtn = profile.querySelector('.profile__edit-btn');
const closeBtn = popup.querySelector('.popup__button-close');
const formElement = popup.querySelector('.popup__container');
const nameInput = popup.querySelector('.popup__input_text_name');
const jobInput = popup.querySelector('.popup__input_text_job');
const name = profile.querySelector('.profile__name');
const job  = profile.querySelector('.profile__job');
const popupTypeImage = page.querySelector('.popup_type_image');
const closeImageBtn = popupTypeImage.querySelector('.popup__button-close_type-image');

//Открыть popup
function playPopup() {
	popup.classList.add('popup_opened');
	nameInput.value = name.textContent; 
	jobInput.value  = job.textContent;
}

function closePopup() { 
	popup.classList.remove('popup_opened');
}
	

// Работа с input
const handleFormSubmit = (evt) => {
  evt.preventDefault(); 
  name.textContent = nameInput.value;
	job.textContent = jobInput.value;
	closePopup();
}

editBtn.addEventListener('click', playPopup);
closeBtn.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit); 



const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

// функция удаления карточки
const deleteElement = (evt) => {
	evt.target.closest('.element__item').remove();
}
//------------------------------------------------------------------------------
// лайк карточки 
const likeElement = (evt) => {
	evt.target.closest('.element__button-heart').classList.toggle('element__button-heart_active');
};

	// Добавление карточки
const addElementItem = (name, link) => {
	const elementItemTemplate = document.querySelector('#element__item-template');
	const newItemElement =  elementItemTemplate.content.cloneNode(true); 
	const newItemName = newItemElement.querySelector('.element__text');
	newItemName.textContent = name;
	const newItemLink = newItemElement.querySelector('.element__image');
	newItemLink.src = link;
	// Удаление карточки
	const trashBtn = newItemElement.querySelector('.element__button-delete');
	trashBtn.addEventListener ('click', deleteElement);
	//Лайк карточки
	const elementButtonHeart = newItemElement.querySelector('.element__button-heart');
	elementButtonHeart.addEventListener ('click', likeElement);
	//открытие popup-image
	const elementText = popupTypeImage.querySelector ('.popup__title-image');
	const popupImage = popupTypeImage.querySelector('.popup__image');
	const addImage = newItemElement.querySelector('.element__image_type_image');
	addImage.addEventListener("click", (evt) => {
		popupImage.src = evt.target.src;
		popupImage.alt = evt.target.alt;
		elementText.textContent = evt.target.closest('.element__item').querySelector('.element__text').textContent;
		popupTypeImage.classList.add('popup_opened')
	});       
	
	return newItemElement;
}

// Закрыть PopupImage
closeImageBtn.addEventListener('click', () => {popupTypeImage.classList.remove('popup_opened')} );	




const renderItem = (wrap, name, link) => {	
	wrap.prepend(addElementItem(name, link));
}

initialCards.forEach (function(item) {
	renderItem(itemLiistWrapper, item.name, item.link);
});





//------------------------------------------------------------------------------
			// Добавление карточки 
const popupTypeAddElement = page.querySelector('.popup_type_add-element')
const addElementBtn = profile.querySelector('.profile__add-btn');
const formAddElement = popupTypeAddElement.querySelector('.popup__container_type_add-element');
const titleInput = popupTypeAddElement.querySelector('.popup__input_text_title');
const linkInputImage = popupTypeAddElement.querySelector ('.popup__input_link-image');
const closePopupElementBtn = popupTypeAddElement.querySelector('.popup__button-close_type_add-element');

const openPopupElement = () => {
	popupTypeAddElement.classList.add('popup_opened');
}

const closePopupElement = () => {
	popupTypeAddElement.classList.remove('popup_opened');	
}

addElementBtn.addEventListener('click', openPopupElement);
closePopupElementBtn.addEventListener('click', closePopupElement);

//форма для addElement
formAddElement.addEventListener('submit', (evt) => {
	evt.preventDefault();
	const nameInput = titleInput.value;
	const linkInput = linkInputImage.value;
	if (nameInput && linkInput) {
		renderItem(itemLiistWrapper, nameInput, linkInput);
	}
	titleInput.value = '';
	linkInputImage.value = '';
	closePopupElement();
});
	

