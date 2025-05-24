// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');

    // Ubah ikon saat menu aktif
    const icon = hamburger.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Tutup mobile menu saat link diklik
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        hamburger.querySelector('i').classList.remove('fa-times');
        hamburger.querySelector('i').classList.add('fa-bars');
    });
});



// Quotes slider
const quotes = document.querySelectorAll('.quote');
const quoteNav = document.querySelectorAll('.quote-nav button');
let currentQuote = 0;

function showQuote(index) {
    quotes.forEach(quote => quote.classList.remove('active'));
    quoteNav.forEach(btn => btn.classList.remove('active'));

    quotes[index].classList.add('active');
    quoteNav[index].classList.add('active');
    currentQuote = index;
}

quoteNav.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        showQuote(index);
    });
});

// Auto slide quotes
setInterval(() => {
    let nextQuote = (currentQuote + 1) % quotes.length;
    showQuote(nextQuote);
}, 5000);

// Scroll animation
const fadeElements = document.querySelectorAll('.section-title, .gallery-item, .poem-card, .timeline-item');

function checkScroll() {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.classList.add('fade-in');
        }
    });
}

// Initial check
checkScroll();

// Check on scroll
window.addEventListener('scroll', checkScroll);

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

function openGalleryPage(category) {
    // Dalam implementasi nyata, ini akan mengarahkan ke halaman baru
    // atau mengambil data dari server. Di sini kita buat simulasi

    // Kosongkan modal content
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <h2 style="color: white; text-align: center; margin-bottom: 20px;">${category.replace('-', ' ').toUpperCase()}</h2>
        <div class="expanded-gallery" id="expandedGallery"></div>
    `;

    const expandedGallery = document.getElementById('expandedGallery');

    // Generate gambar dummy (dalam implementasi nyata, ini akan dari database)
    for (let i = 0; i < 15; i++) {
        expandedGallery.innerHTML += `
            <div class="expanded-gallery-item">
                <img src="https://source.unsplash.com/random/600x600/?${category},${i}" alt="Gallery item ${i}">
            </div>
        `;
    }

    // Tampilkan modal
    document.getElementById('galleryModal').style.display = "block";

    // Tambahkan event listener untuk gambar di expanded gallery
    setTimeout(() => {
        document.querySelectorAll('.expanded-gallery-item').forEach(item => {
            item.onclick = function () {
                const imgSrc = this.querySelector('img').src;
                modalContent.innerHTML = `
                    <img src="${imgSrc}" class="modal-content" style="width:100%">
                `;
            };
        });
    }, 100);
}

function closeModal() {
    document.getElementById('galleryModal').style.display = "none";
}

// Handle upload foto
document.getElementById('file-input').addEventListener('change', function (e) {
    const previewContainer = document.getElementById('previewContainer');
    previewContainer.innerHTML = '';

    for (let file of e.target.files) {
        if (!file.type.match('image.*')) continue;

        const reader = new FileReader();
        reader.onload = function (e) {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            previewItem.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
                <button class="preview-item-remove" onclick="removePreview(this)">&times;</button>
            `;
            previewContainer.appendChild(previewItem);
        }
        reader.readAsDataURL(file);
    }
});

function removePreview(button) {
    button.parentElement.remove();
}

document.getElementById('uploadForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const photoName = document.getElementById('photoName').value;
    const photoDesc = document.getElementById('photoDesc').value;
    const files = document.getElementById('file-input').files;

    if (files.length === 0) {
        alert('Silakan pilih foto terlebih dahulu');
        return;
    }

    // Di sini biasanya akan ada kode untuk mengupload ke server
    // Ini hanya simulasi
    alert(`Foto "${photoName}" berhasil diupload! (Simulasi)`);

    // Reset form
    this.reset();
    document.getElementById('previewContainer').innerHTML = '';
});

// Tutup modal ketika klik di luar gambar
window.onclick = function (event) {
    const modal = document.getElementById('galleryModal');
    if (event.target == modal) {
        closeModal();
    }
}