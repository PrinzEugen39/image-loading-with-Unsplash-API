//Unsplash API

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

let count = 2;
const apiKey = "XiVQouPP3WX9A0uzX7fw1YQGHaWPbk5piusVcU5M3TY";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 10;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
        console.log("ready = ", ready);
    }
}

//helper function
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log("total photo = ",totalImages)
    //method for each
    photosArray.forEach((photo) =>{
        //create <a> element
        const item = document.createElement("a");
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank",
        });
        //create <img> element
        const img = document.createElement("img");
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        img.addEventListener("load", imageLoaded)
        //put img inside <a> element
        imageContainer.appendChild(item).appendChild(img);
    });
}

//GET photos from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
    } catch (error) {
        console.log(error);
    }
}

//load more photos
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

getPhotos();