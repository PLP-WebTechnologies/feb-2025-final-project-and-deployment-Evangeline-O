document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('open');
    });
    
    // Close menu when clicking on nav links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('open');
        });
    });
    
    // Recipe Search Functionality
    const searchInput = document.getElementById('search');
    const recipeCards = document.querySelectorAll('.recipe-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            recipeCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const tags = card.dataset.tags.toLowerCase();
                
                if (title.includes(searchTerm) || tags.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Recipe Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            recipeCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Update active filter button
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                alert('Tafadhali jaza sehemu zote! (Please fill all fields)');
                return;
            }
            
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                alert('Tafadhali weka barua pepe sahihi! (Please enter valid email)');
                return;
            }
            
            // Form is valid - could send to server here
            alert('Asante kwa ujumbe wako! Tutawasiliana nawe hivi karibuni. (Thank you for your message!)');
            this.reset();
        });
    }
    
    // Recipe Rating System
    document.querySelectorAll('.star-rating .star').forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.dataset.rating;
            const recipeId = this.closest('.recipe').dataset.id;
            
            // Update UI
            this.parentElement.querySelectorAll('.star').forEach((s, index) => {
                s.classList.toggle('active', index < rating);
            });
            
            // Save to localStorage
            localStorage.setItem(`recipe_${recipeId}_rating`, rating);
        });
    });
    
    // Initialize ratings from storage
    document.querySelectorAll('.recipe').forEach(recipe => {
        const recipeId = recipe.dataset.id;
        const savedRating = localStorage.getItem(`recipe_${recipeId}_rating`);
        
        if (savedRating) {
            recipe.querySelectorAll('.star-rating .star').forEach((star, index) => {
                star.classList.toggle('active', index < savedRating);
            });
        }
    });
});