// Nexus 2037 - Interactive Demo JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Sample data for the feed
    const samplePosts = [
        {
            id: 1,
            author: 'Alex Chen',
            avatar: '👤',
            time: '2m ago',
            content: 'Just experienced an incredible sunset memory shared by someone in Tokyo. The emotion sync made me feel their genuine awe and peace. This is the future of empathy! 💫',
            type: 'emotion',
            likes: 234,
            shares: 45,
            comments: 28
        },
        {
            id: 2,
            author: 'Sam Rivera',
            avatar: '🎨',
            time: '15m ago',
            content: 'Our team just completed the first collaborative thought sculpture in the Digital Twin City! Over 50 minds contributed to this evolving masterpiece. Check it out at coordinates 40.7128, -74.0060 🏙️',
            type: 'memory',
            likes: 892,
            shares: 156,
            comments: 89
        },
        {
            id: 3,
            author: 'Jordan Kim',
            avatar: '🎮',
            time: '1h ago',
            content: 'Who\'s joining tonight\'s Reality Quest? We\'re solving the Mystery of the Quantum Gardens. 100+ players already registered. Bring your best puzzle-solving neural patterns! 🧩',
            type: 'thought',
            likes: 567,
            shares: 234,
            comments: 145
        },
        {
            id: 4,
            author: 'Maya Patel',
            avatar: '🌍',
            time: '2h ago',
            content: 'The Global Mind Mesh just hit 2.4 billion connected consciousnesses! Grateful to be part of this historic moment. Here\'s to breaking down all barriers between human minds 🚀',
            type: 'location',
            likes: 1523,
            shares: 678,
            comments: 312
        }
    ];

    // Render feed posts
    const feedContainer = document.getElementById('feedContainer');
    
    function renderPosts(posts) {
        feedContainer.innerHTML = '';
        posts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.className = 'post-card';
            postCard.innerHTML = `
                <div class="post-header">
                    <div class="post-avatar">${post.avatar}</div>
                    <div>
                        <div class="post-author">${post.author}</div>
                        <div class="post-time">${post.time}</div>
                    </div>
                </div>
                <div class="post-content">${post.content}</div>
                <div class="post-actions">
                    <button class="action-btn">
                        <span>❤️</span>
                        <span>${post.likes}</span>
                    </button>
                    <button class="action-btn">
                        <span>💬</span>
                        <span>${post.comments}</span>
                    </button>
                    <button class="action-btn">
                        <span>🔄</span>
                        <span>${post.shares}</span>
                    </button>
                    <button class="action-btn">
                        <span>🧠</span>
                        <span>Sync</span>
                    </button>
                </div>
            `;
            feedContainer.appendChild(postCard);
        });
    }

    // Initial render
    renderPosts(samplePosts);

    // Feed filter buttons
    const controlBtns = document.querySelectorAll('.control-btn');
    controlBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            controlBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Simulate filtering (in real app, this would fetch different data)
            const filter = this.textContent.toLowerCase();
            let filteredPosts = [...samplePosts];
            
            if (filter === 'following') {
                filteredPosts = samplePosts.slice(0, 2);
            } else if (filter === 'trending') {
                filteredPosts = samplePosts.slice(2, 4);
            }
            
            feedContainer.style.opacity = '0';
            setTimeout(() => {
                renderPosts(filteredPosts);
                feedContainer.style.opacity = '1';
            }, 200);
        });
    });

    // Navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(n => n.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Composer send button
    const composerSend = document.querySelector('.composer-send');
    const composerInput = document.querySelector('.composer-text');
    
    composerSend.addEventListener('click', function() {
        const text = composerInput.value.trim();
        if (text) {
            const newPost = {
                id: Date.now(),
                author: 'You',
                avatar: '👤',
                time: 'Just now',
                content: text,
                type: 'thought',
                likes: 0,
                shares: 0,
                comments: 0
            };
            
            samplePosts.unshift(newPost);
            renderPosts(samplePosts);
            composerInput.value = '';
            
            // Show success animation
            composerSend.innerHTML = '<span>Sent!</span><span class="send-icon">✓</span>';
            setTimeout(() => {
                composerSend.innerHTML = '<span>Send</span><span class="send-icon">➤</span>';
            }, 2000);
        }
    });

    // Allow Enter key to send
    composerInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            composerSend.click();
        }
    });

    // Option buttons interaction
    const optionBtns = document.querySelectorAll('.option-btn');
    optionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            optionBtns.forEach(b => b.style.background = '');
            optionBtns.forEach(b => b.style.borderColor = '');
            optionBtns.forEach(b => b.style.color = '');
            
            this.style.background = 'var(--color-primary)';
            this.style.borderColor = 'var(--color-primary)';
            this.style.color = 'white';
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Architecture layer animations
    document.querySelectorAll('.arch-layer').forEach((layer, index) => {
        layer.style.opacity = '0';
        layer.style.transform = 'translateX(-20px)';
        layer.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(layer);
    });

    // Stats counter animation
    function animateCounter(element, target, suffix = '') {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = formatNumber(Math.floor(current)) + suffix;
        }, 30);
    }

    function formatNumber(num) {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1) + 'B';
        } else if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K';
        }
        return num.toString();
    }

    // Observe stats for animation
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statValue = entry.target.querySelector('.stat-value');
                if (statValue) {
                    const text = statValue.textContent;
                    const number = parseFloat(text.replace(/[^0-9.]/g, ''));
                    const suffix = text.replace(/[0-9.]/g, '');
                    
                    if (!isNaN(number)) {
                        animateCounter(statValue, number, suffix);
                        statsObserver.unobserve(entry.target);
                    }
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.arch-stat').forEach(stat => {
        statsObserver.observe(stat);
    });

    // Add hover effect to floating cards
    document.querySelectorAll('.floating-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
            this.style.transform = 'scale(1.05) translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
            this.style.transform = '';
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });

    console.log('🧠 Nexus 2037 Interface Loaded Successfully');
    console.log('Welcome to the future of human connection!');
});
