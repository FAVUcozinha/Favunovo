const sideMenu = document.getElementById('side-menu');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const aboutModal = document.getElementById('aboutModal');
const menuQuemSomos = document.getElementById('menu-quem-somos');

function toggleMenu(show) {
    if (show) sideMenu.classList.add('active');
    else sideMenu.classList.remove('active');
}
if(mobileMenuBtn) mobileMenuBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(true); });
if(closeMenuBtn) closeMenuBtn.addEventListener('click', () => toggleMenu(false));
document.addEventListener('click', (e) => {
    if (sideMenu.classList.contains('active') && !sideMenu.contains(e.target) && e.target !== mobileMenuBtn) toggleMenu(false);
});

function openAboutModal() { aboutModal.classList.add('show'); toggleMenu(false); }
function closeAboutModal() { aboutModal.classList.remove('show'); }
if(menuQuemSomos) menuQuemSomos.addEventListener('click', (e) => { e.preventDefault(); openAboutModal(); });
window.onclick = (e) => { if(e.target == aboutModal) closeAboutModal(); }

document.addEventListener("DOMContentLoaded", function () {
    const slideshow = document.getElementById('slideshow-draggable');
    const track = document.getElementById('slideshow-track');
    const totalImages = 23; 
    let imagesHTML = '';
    for (let i = 1; i <= totalImages; i++) {
        const num = i.toString().padStart(2, '0');
        imagesHTML += `<div class="slide-item"><img src="images/S${num}.jpg" loading="lazy" alt="Delícia ${num}"></div>`;
    }
    track.innerHTML = imagesHTML + imagesHTML + imagesHTML;

    let isDown = false;
    let startX;
    let scrollLeft;
    let autoplayInterval;
    const scrollSpeed = 1;      
    const autoplayDelay = 15;   

    setTimeout(() => { slideshow.scrollLeft = slideshow.scrollWidth / 3; startAutoplay(); }, 100);

    function startAutoplay() {
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(() => {
            slideshow.scrollLeft += scrollSpeed;
            checkInfiniteLoop();
        }, autoplayDelay);
    }
    function stopAutoplay() { clearInterval(autoplayInterval); }

    function checkInfiniteLoop() {
        const oneSetWidth = slideshow.scrollWidth / 3;
        if (slideshow.scrollLeft >= oneSetWidth * 2) slideshow.scrollLeft = oneSetWidth;
        else if (slideshow.scrollLeft <= 0) slideshow.scrollLeft = oneSetWidth;
    }

    const startDrag = (e) => {
        isDown = true; stopAutoplay(); slideshow.classList.add('active');
        const pageX = e.pageX || e.touches[0].pageX;
        startX = pageX - slideshow.offsetLeft; scrollLeft = slideshow.scrollLeft;
    };
    const endDrag = () => { if (!isDown) return; isDown = false; slideshow.classList.remove('active'); startAutoplay(); };
    const moveDrag = (e) => {
        if (!isDown) return; e.preventDefault();
        const pageX = e.pageX || e.touches[0].pageX;
        const x = pageX - slideshow.offsetLeft;
        const walk = (x - startX) * 2;
        slideshow.scrollLeft = scrollLeft - walk; checkInfiniteLoop();
    };

    slideshow.addEventListener('mousedown', startDrag);
    slideshow.addEventListener('mouseleave', endDrag);
    slideshow.addEventListener('mouseup', endDrag);
    slideshow.addEventListener('mousemove', moveDrag);
    slideshow.addEventListener('touchstart', startDrag);
    slideshow.addEventListener('touchend', endDrag);
    slideshow.addEventListener('touchmove', moveDrag);
});