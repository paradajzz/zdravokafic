// ====================== VIDEO BACKGROUND ======================
function setVideoSize() {
    const vidWidth = 1920;
    const vidHeight = 1080;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const tempVidWidth = windowHeight * vidWidth / vidHeight;
    const tempVidHeight = windowWidth * vidHeight / vidWidth;
    const newVidWidth = tempVidWidth > windowWidth ? tempVidWidth : windowWidth;
    const newVidHeight = tempVidHeight > windowHeight ? tempVidHeight : windowHeight;
    const tmVideo = $('#tm-video');

    tmVideo.css('width', newVidWidth);
    tmVideo.css('height', newVidHeight);
}

$(document).ready(function() {
    setVideoSize();
    let timeout;
    window.onresize = function(){
        clearTimeout(timeout);
        timeout = setTimeout(setVideoSize, 100);
    };

    // Play/Pause dugme
    $("#tm-video-control-button").on("click", function() {
        const video = document.getElementById("tm-video");
        $(this).removeClass();
        if (video.paused) {
            video.play();
            $(this).addClass("fas fa-pause");
        } else {
            video.pause();
            $(this).addClass("fas fa-play");
        }
    });
});

// ====================== NAVIGACIJA I TABOVI ======================
function initPage() {
    let pageId = location.hash;
    if(pageId) {
        highlightMenu($(`.tm-page-link[href^="${pageId}"]`)); 
        showPage($(pageId));
    }
    else {
        pageId = $('.tm-page-link.active').attr('href');
        showPage($(pageId));
    }
}

function highlightMenu(menuItem) {
    $('.tm-page-link').removeClass('active');
    menuItem.addClass('active');
}

function showPage(page) {
    $('.tm-page-content').hide();
    page.show();
}

function openTab(evt, id) {
    $('.tm-tab-content').hide();
    $('#' + id).show();
    $('.tm-tab-link').removeClass('active');
    $(evt.currentTarget).addClass('active');
}

$(document).ready(function() {
    initPage();

   $('.tm-page-link').click(function(event) {
    const href = $(this).attr('href');

    // Ako link vodi ka nečemu spolja ili je download, ne blokiraj
    if(href.startsWith('#')) {
        if(window.innerWidth > 991) event.preventDefault();
        highlightMenu($(this));
        showPage($(this.hash));
    } 
    // inače (ZIP, PDF, eksterni link) -> ne radi preventDefault
});


    $('.tm-tab-link').on('click', e => {
        e.preventDefault(); 
        openTab(e, $(e.target).data('id'));
    });

    $('.tm-tab-link.active').click(); 
});

// ====================== DINAMIČKI ISPIS PROIZVODA ======================
const products = [
    {img:"img/iced-americano.png", name:"Ledena Američka", price:"550din", description:"Osvežavajuća kombinacija espresso kafe i leda, idealna za vruće letnje dane."},
    {img:"img/iced-cappuccino.png", name:"Ledeni Cappuccino", price:"590din", description:"Klasični cappuccino sa šlagom i hladnim mlekom, savršeno izbalansiran ukus."},
    {img:"img/iced-espresso.png", name:"Ledeni Espresso", price:"610din", description:"Intenzivan hladni espresso sa blagom aromom, za ljubitelje jakih kafa."},
    {img:"img/iced-latte.png", name:"Ledeni Latte", price:"560din", description:"Kremasta mešavina espresso kafe i hladnog mleka, lagan i ukusan napitak."}
];
const hotProducts = [
    {img:"img/hot-americano.png", name:"Topla Američka", price:"450din", description:"Topla espresso kafa sa dodatkom tople vode, klasična i osvežavajuća."},
    {img:"img/hot-cappuccino.png", name:"Topli Cappuccino", price:"490din", description:"Bogat cappuccino sa penom od mleka, idealan za jutarnje buđenje."},
    {img:"img/hot-espresso.png", name:"Topli Espresso", price:"510din", description:"Jak i aromatičan espresso, prava doza energije u maloj šolji.."},
    {img:"img/hot-latte.png", name:"Topli Latte", price:"460din", description:"Kremasti latte sa toplim mlekom, savršen za opuštanje."}
];
const juiceProducts = [
    {img:"img/smoothie-1.png", name:"Jagoda Smoothie", price:"590din", description:"Svež i sladak smoothie od jagoda, pun vitamina."},
    {img:"img/smoothie-2.png", name:"Crveni Smoothie", price:"690din", description:"Kombinacija malina, borovnica i jagoda za osvežavajući napitak."},
    {img:"img/smoothie-3.png", name:"Ananas Smoothie", price:"790din", description:"Egzotični smoothie od ananasa sa laganom citrusnom notom."},
    {img:"img/smoothie-4.png", name:"Spanać Smoothie", price:"890din", description:"Zeleni smoothie sa spanaćem, jabukom i bananom, zdrav i hranljiv."}
];

function renderProducts(products, containerId) {
    const container = document.getElementById(containerId);
    products.forEach(product => {
        const itemHTML = `
            <div class="tm-list-item">          
                <img src="${product.img}" alt="Image" class="tm-list-item-img">
                <div class="tm-black-bg tm-list-item-text">
                    <h3 class="tm-list-item-name">
                        ${product.name}<span class="tm-list-item-price">${product.price}</span>
                    </h3>
                    <p class="tm-list-item-description">${product.description}</p>
                </div>
            </div>
        `;
        container.innerHTML += itemHTML;
    });
}

renderProducts(products, 'cold');
renderProducts(hotProducts, 'hot');
renderProducts(juiceProducts, 'juice');

//++++++++++DINAMICKI ISPIS SPECIJALITETA+++++++++++++++++

const specialItems = [
    {
        img: "img/special-01.jpg",
        title: "Narandžasti napitak",
        description: "Osvežavajući voćni napitak sa narandžom i limunom, savršen za letnje dane."
    },
    {
        img: "img/special-02.jpg",
        title: "Kroasani",
        description: "Hrskavi i zlatno pečeni kroasani, idealni za jutarnji doručak uz kafu."
    },
    {
        img: "img/special-03.jpg",
        title: "Mini burgeri",
        description: "Mini burgeri sa svežim konjskim mesom i domaćim sosom, mali zalogaji pune energije."
    },
    {
        img: "img/special-04.jpg",
        title: "Pink merengue",
        description: "Slatki i nežni merengue kolači, lagani desert za ljubitelje slatkiša."
    },
    {
        img: "img/special-05.jpg",
        title: "Koktel sa jagodama",
        description: "Hladni koktel sa jagodama i mentom, osvežavajući i aromatičan napitak."
    },
    {
        img: "img/special-06.jpg",
        title: "Topli sendvič",
        description: "Topli sendvič sa povrćem i sosom, hranljiv i ukusan obrok za svaku priliku."
    }
];
const specialContainer = document.querySelector(".tm-special-items");

specialItems.forEach(item => {
    const itemHTML = `
        <div class="tm-black-bg tm-special-item">
            <img src="${item.img}" alt="${item.title}">
            <div class="tm-special-item-description">
                <h2 class="tm-text-primary tm-special-item-title">${item.title}</h2>
                <p class="tm-special-item-text">${item.description}</p>
            </div>
        </div>
    `;
    specialContainer.innerHTML += itemHTML;
});


// ====================== VALIDACIJA FORME ======================
document.getElementById("reservationForm").addEventListener("submit", function(event){
    event.preventDefault();
    let isValid = true;

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const date = document.getElementById("date");
    const message = document.getElementById("message");
    const successMessage = document.getElementById("successMessage");

    // NAME
    let nameRegex = /^[A-ZĆČĐŠŽ][a-zĆČĐŠŽ]{2,20}$/;
    if(!nameRegex.test(name.value)){
        isValid = false;
        showError(name, "Ime mora početi velikim slovom i imati više od 2 slova.");
    } else removeError(name);

    // EMAIL
    let emailRegex = /^[a-z0-9._%+-]+@(gmail\.com|hotmail\.com|yahoo\.com)$/;
    if(!emailRegex.test(email.value)){
        isValid = false;
        showError(email, "Unesite validan email (primer@gmail.com).");
    } else removeError(email);

    // PHONE
    let phoneRegex = /^[+0-9]{9,13}$/;
    if(!phoneRegex.test(phone.value)){
        isValid = false;
        showError(phone, "Molimo unesite broj u formatu +381611234567 ili 0611234567");
    } else removeError(phone);

    // DATE
    if(!date.value){
        isValid = false;
        showError(date, "Datum je obavezan.");
    } else {
        const today = new Date().toISOString().split('T')[0];
        if(date.value < today){
            isValid = false;
            showError(date, "Datum ne sme biti u prošlosti.");
        } else removeError(date);
    }

    // MESSAGE
  

    if(isValid){
        successMessage.style.display = 'block';
        this.reset();
    }
});

// Pomoćne funkcije za greške
function showError(element, message){
    element.classList.add("is-invalid");
    let errorDiv = element.parentElement.querySelector(".error-message");
    if(!errorDiv){
        errorDiv = document.createElement("div");
        errorDiv.className = "error-message";
        errorDiv.style.color = "red";
        element.parentElement.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
}

function removeError(element){
    element.classList.remove("is-invalid");
    const errorDiv = element.parentElement.querySelector(".error-message");
    if(errorDiv) errorDiv.remove();
}
