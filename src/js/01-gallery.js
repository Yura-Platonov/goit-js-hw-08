// Add imports above this line
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const refs = {
    gallery: document.querySelector('.gallery'),
}

//генерація розмітки
const galleryMarkup = createGalleryCardsMarkup(galleryItems);
refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryCardsMarkup(imgs) {
    return imgs.map(({ preview, original, description }) => {
        return `<div class="gallery__item">
            <a class="gallery__link" onclick="event.preventDefault()" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </div>`;
    }).join('');
};

//
let galleryImages = new SimpleLightbox('.gallery a'); 