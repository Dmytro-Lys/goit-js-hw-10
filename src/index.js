import { fetchBreeds, fetchCatByBreed } from "./js/cat-api.js";
import Notiflix from 'notiflix';
import "notiflix/src/notiflix.css";

const refs = {
    select: document.querySelector(".breed-select"),
    pLoader: document.querySelector(".loader"),
    pError: document.querySelector(".error"),
    divData: document.querySelector(".cat-info")
}



startLoading(refs.select);
fetchBreeds().then((data) => {
    return data.reduce(
        (markup, currentEl) => markup + createSelectElement(currentEl), "");
}).then(updateSelect).catch(onError)
    .finally(endLoading);

refs.select.addEventListener('change', onSelect);

// functions
function createSelectElement({id, name}) {
    return `<option value="${id}">${name}</option>`
}

function updateSelect(markup) {
    refs.select.innerHTML = markup;
    refs.select.classList.remove("invisible");
}

function onSelect(e) {
    startLoading(refs.divData);
    fetchCatByBreed(e.target.value).then((data) => {
       return data.reduce(
        (markup, currentEl) => markup + createInfoElement(toArgs(currentEl)), "");
    }).then(updateInfo)
        .catch(onError)
        .finally(endLoading);  
}


function createInfoElement({url,  name, description, temperament}) {    
   return ` <img
      class="cat_image"
      src="${url}"
      alt="${name}"
    />
    <div class="cat-info-text">
    <h2>${name}</h2>
    <p>${description}</p>
    <p><b>Temperament: </b>${temperament}</p>
    </div>`
}

function updateInfo(markup) {
    refs.divData.innerHTML = markup;
    refs.divData.classList.remove("invisible");
}

function toArgs({ url, breeds }) {
    const { name, description, temperament } = breeds[0];
    return {
        url,
        name,
        description,
        temperament
    }
}
function startLoading(element) {
    element.classList.add("invisible");
    Notiflix.Loading.hourglass(refs.pLoader.textContent);
}
function endLoading() {
    Notiflix.Loading.remove();
}
function onError() {
    Notiflix.Notify.failure(refs.pError.textContent);
}