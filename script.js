const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//unsplash api
const count = 30;
const apiKey = 'KOzhs8skwVnfwJTCW3103JI6WDTSrSUvwk_STyS5oYY';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//check if all images were loaded
function imageLoaded(){
    imagesLoaded ++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

//helper function to set attribute on dom elements
function setAttributes(element, attributes)
{
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

//create elements for links & photos, add to dom
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //run function foreach objct in photosArray
    photosArray.forEach((photo) => {
        //create <a> to link to unsplash 
            //create <a> element
        const item = document.createElement('a');
    
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //create <img> for photo 
        const img = document.createElement('img');

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        //event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded)
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//get photos from api 
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(error) {
        //catch err
    }
}

//check to see if scroll is near bottom of page
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

//on load 
getPhotos();
