/* =========================================
   SELECT ELEMENTS
========================================= */

const galleryItems =
    document.querySelectorAll(".gallery-item");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxTitle =
    document.getElementById("lightboxTitle");

const lightboxDescription =
    document.getElementById("lightboxDescription");

const imageCounter =
    document.getElementById("imageCounter");

const closeBtn =
    document.getElementById("closeBtn");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");


/* =========================================
   CURRENT IMAGE
========================================= */

let currentIndex = 0;


/* =========================================
   GET VISIBLE IMAGES
========================================= */

function getVisibleItems() {

    return Array.from(galleryItems)
        .filter(item => {

            return !item.classList.contains("hide");

        });

}


/* =========================================
   OPEN LIGHTBOX
========================================= */

function openLightbox(item) {

    const image =
        item.querySelector("img");

    const title =
        item.dataset.title;

    const description =
        item.dataset.description;


    lightboxImage.src = image.src;

    lightboxImage.alt = image.alt;

    lightboxTitle.textContent = title;

    lightboxDescription.textContent =
        description;


    const visibleItems =
        getVisibleItems();

    currentIndex =
        visibleItems.indexOf(item);


    imageCounter.textContent =
        `${currentIndex + 1} / ${visibleItems.length}`;


    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";
}


/* =========================================
   CLOSE LIGHTBOX
========================================= */

function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "auto";
}


/* =========================================
   SHOW IMAGE
========================================= */

function showImage(index) {

    const visibleItems =
        getVisibleItems();

    if (visibleItems.length === 0) {
        return;
    }


    if (index < 0) {

        index =
            visibleItems.length - 1;

    }


    if (index >= visibleItems.length) {

        index = 0;

    }


    currentIndex = index;


    const item =
        visibleItems[currentIndex];


    const image =
        item.querySelector("img");


    lightboxImage.src =
        image.src;

    lightboxImage.alt =
        image.alt;


    lightboxTitle.textContent =
        item.dataset.title;


    lightboxDescription.textContent =
        item.dataset.description;


    imageCounter.textContent =
        `${currentIndex + 1} / ${visibleItems.length}`;
}


/* =========================================
   NEXT IMAGE
========================================= */

function showNext() {

    showImage(currentIndex + 1);

}


/* =========================================
   PREVIOUS IMAGE
========================================= */

function showPrevious() {

    showImage(currentIndex - 1);

}


/* =========================================
   IMAGE CLICK EVENTS
========================================= */

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        openLightbox(item);

    });

});


/* =========================================
   FILTER FUNCTIONALITY
========================================= */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter =
            button.dataset.filter;


        /* Remove active from all buttons */

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        /* Add active to clicked button */

        button.classList.add("active");


        /* Filter gallery */

        galleryItems.forEach(item => {

            const category =
                item.dataset.category;


            if (
                filter === "all" ||
                category === filter
            ) {

                item.classList.remove("hide");

            }
            else {

                item.classList.add("hide");

            }

        });

    });

});


/* =========================================
   BUTTON EVENTS
========================================= */

closeBtn.addEventListener(
    "click",
    closeLightbox
);


nextBtn.addEventListener(
    "click",
    showNext
);


prevBtn.addEventListener(
    "click",
    showPrevious
);


/* =========================================
   CLICK OUTSIDE IMAGE
========================================= */

lightbox.addEventListener(
    "click",
    event => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    }
);


/* =========================================
   KEYBOARD EVENTS
========================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
         Only process keyboard events
         when lightbox is open.
        */

        if (!lightbox.classList.contains("active")) {

            return;

        }


        /* ESC */

        if (event.key === "Escape") {

            closeLightbox();

        }


        /* RIGHT ARROW */

        if (event.key === "ArrowRight") {

            showNext();

        }


        /* LEFT ARROW */

        if (event.key === "ArrowLeft") {

            showPrevious();

        }

    }
);