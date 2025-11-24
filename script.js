document.addEventListener('DOMContentLoaded', () => {
    // --- Particle Background ---
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.color = Math.random() > 0.5 ? '#00ff88' : '#00ccff'; // Theme colors
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const particleCount = Math.min(window.innerWidth / 10, 100); // Responsive count
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, index) => {
            p.update();
            p.draw();

            // Connect particles
            for (let j = index + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 255, 136, ${1 - distance / 150})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    // --- Scroll Reveal ---
    const revealElements = document.querySelectorAll('.reveal-hidden');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-show');
                revealObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Role Typer ---
    const roles = ['Senior Software Engineer', '.NET Developer', 'AI Enthusiast', 'Team Leader', 'Python & C# Expert'];
    const typer = document.getElementById('role-typer');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeRole() {
        if (!typer) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typer.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typer.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(typeRole, typeSpeed);
    }

    typeRole();

    // --- Mobile Menu ---
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });

        // Close menu when clicking a link
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('hidden');
            });
        });
    }

    // --- 3D Tilt Effect for Cards ---
    const cards = document.querySelectorAll('.project-card, .skill-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
    // --- Silent CV Download Tracking ---
    const btnDownload = document.getElementById('download-cv-btn');
    let userIP = 'Unknown';
    let userLocation = 'Unknown';

    // Initialize EmailJS
    emailjs.init("DwakjsfKQjz_Fzfeu");

    // Fetch IP and Location
    fetch('https://ipwho.is/')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                userIP = data.ip || 'Unknown';
                userLocation = `${data.city || ''}, ${data.region || ''}, ${data.country || ''}`.replace(/(^,\s*|,\s*$)/g, '').replace(/,\s*,/g, ',');
            } else {
                console.warn('IP Location failed:', data.message);
                // Fallback to ipify
                throw new Error(data.message);
            }
        })
        .catch(error => {
            console.error('Error fetching IP and location:', error);
            // Fallback to ipify for just IP
            fetch('https://api.ipify.org?format=json')
                .then(response => response.json())
                .then(data => {
                    userIP = data.ip;
                })
                .catch(err => console.error('Error fetching IP:', err));
        });

    if (btnDownload) {
        btnDownload.addEventListener('click', function (e) {
            // We do NOT prevent default here, so the download starts immediately.
            // We just fire off the email in the background.

            const templateParams = {
                name: "Anonymous Downloader",
                email: "anonymous@example.com", // Changed to valid email format
                number: "+0000000000",
                message: "CV Downloaded directly.",
                ip_address: userIP,
                location: userLocation,
                timestamp: new Date().toISOString()
            };

            // Added alerts for debugging
            // alert("Attempting to send tracking email...");

            emailjs.send('service_g29ulfq', 'template_ez3sapr', templateParams)
                .then(function (response) {
                    console.log('Tracking email sent!', response.status, response.text);
                }, function (error) {
                    console.log('Tracking email failed...', error);
                });
        });
    }
});
