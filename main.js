document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Reveal logic
    setTimeout(() => {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.style.display = 'none', 500);
        }
        animateCharts();
        startPopups();
        startTimer();
    }, 2500);

    // 2. Manipulation Popups (Simulated Social Proof)
    const names = ["Juliana", "Mariana", "Patrícia", "Cláudia", "Fernanda", "Alessandra"];
    const cities = ["São Paulo", "Rio de Janeiro", "Curitiba", "Belo Horizonte", "Fortaleza", "Manaus"];
    
    function startPopups() {
        const popup = document.getElementById('live-popup');
        const nameEl = document.getElementById('popup-name');
        const cityEl = document.getElementById('popup-city');

        function showNext() {
            nameEl.textContent = names[Math.floor(Math.random() * names.length)];
            cityEl.textContent = cities[Math.floor(Math.random() * cities.length)];
            
            popup.classList.remove('hidden');
            
            setTimeout(() => {
                popup.classList.add('hidden');
                setTimeout(showNext, 8000 + Math.random() * 5000); // Wait 8-13s
            }, 4000); // Show for 4s
        }

        setTimeout(showNext, 3000);
    }

    // 3. Countdown Timer (Urgency)
    function startTimer() {
        let time = 15 * 60; // 15 minutes
        const timerEl = document.getElementById('timer');
        
        const countdown = setInterval(() => {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            timerEl.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            
            if (time <= 0) clearInterval(countdown);
            time--;
        }, 1000);
    }

    // 4. Smooth Scroll & Meta Pixel Tracking
    document.querySelectorAll('a[href^="#"], .btn-cta').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Track Meta Pixel Event
            if (typeof fbq === 'function') {
                fbq('track', 'InitiateCheckout');
                console.log('Pixel: InitiateCheckout tracked');
            }

            if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 5. Chart Animation
    function animateCharts() {
        const bars = document.querySelectorAll('.bar-fill');
        bars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (width) bar.style.width = width;
        });
    }

    // 6. Intersection Observer for reveal
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(15px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });
});

// Simple Style Inject for Observer
const style = document.createElement('style');
style.textContent = `.section.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);
