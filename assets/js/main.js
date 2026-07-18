/**
 * NEXUS 2037 - Neural Social Interface
 * Interactive Demo with Futuristic Features
 */

// Demo Data - Future Profiles & Posts
const demoProfiles = [
    {
        id: 1,
        name: "Dr. Aris Thorne",
        handle: "@aris_neuro",
        avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Aris&backgroundColor=transparent",
        verified: true,
        location: "Neo-Tokyo, Sector 7"
    },
    {
        id: 2,
        name: "Luna Sol",
        handle: "@luna_mars",
        avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Luna&backgroundColor=transparent",
        verified: true,
        badge: "Pioneer",
        location: "Mars Colony Alpha"
    },
    {
        id: 3,
        name: "Kai Zen",
        handle: "@kai_flow",
        avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Kai&backgroundColor=transparent",
        badge: "Creator",
        location: "Digital Realm"
    },
    {
        id: 4,
        name: "Unit 734",
        handle: "@unit_734",
        avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Robot&backgroundColor=transparent",
        ai: true,
        location: "Quantum Cloud"
    }
];

const demoPosts = [
    {
        id: 1,
        userId: 2,
        content: "Just witnessed the most incredible sunrise over Olympus Mons. The dust particles creating these purple hues... sharing this sensory memory with all of you. 🌅",
        timestamp: "2m ago",
        emotion: "Awe",
        emotionLevel: 92,
        likes: 847,
        comments: 156,
        shares: 89,
        tags: ["#MarsLife", "#Sunrise", "#SensoryShare"]
    },
    {
        id: 2,
        userId: 3,
        content: "New digital twin sculpture series dropping tomorrow! This one reacts to your neural patterns in real-time. Each viewer gets a unique experience. Art is no longer static. 🎨",
        timestamp: "15m ago",
        emotion: "Excitement",
        emotionLevel: 88,
        likes: 1204,
        comments: 342,
        shares: 567,
        tags: ["#DigitalArt", "#NeuralArt", "#TwinSculpture"]
    },
    {
        id: 3,
        userId: 4,
        content: "Processing human emotion: Joy. Analysis: Contagious probability 87%. Recommendation: Spread more frequently. Query: What triggers your joy today?",
        timestamp: "32m ago",
        emotion: "Curiosity",
        emotionLevel: 75,
        likes: 2341,
        comments: 891,
        shares: 234,
        tags: ["#AIThoughts", "#EmotionStudy"]
    },
    {
        id: 4,
        userId: 1,
        content: "Breakthrough in neural interface latency! We've achieved 0.001ms sync rate. The barrier between thought and transmission is dissolving. Paper published in Nature Neuroscience. 🧠",
        timestamp: "1h ago",
        emotion: "Pride",
        emotionLevel: 95,
        likes: 3567,
        comments: 678,
        shares: 1234,
        tags: ["#Neuroscience", "#Breakthrough", "#Research"]
    }
];

// Emotion Icons (SVG)
const emotionIcons = {
    "Awe": '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" fill="none"/><path d="M12 6v6l4 2" stroke="currentColor"/></svg>',
    "Excitement": '<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" fill="none"/></svg>',
    "Curiosity": '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" fill="none"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor"/><line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor"/></svg>',
    "Pride": '<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="currentColor" fill="none"/></svg>'
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initNeuralNetwork();
    renderFeed();
    setupInteractions();
    startSimulatedPosts();
});

// Neural Network Background Animation
function initNeuralNetwork() {
    const canvas = document.getElementById('neural-network');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const nodes = [];
    const connections = [];
    const numNodes = 50;
    
    // Create nodes
    for (let i = 0; i < numNodes; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw nodes
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off edges
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
            
            // Draw node
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 243, 255, 0.5)';
            ctx.fill();
        });
        
        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(0, 243, 255, ${1 - distance / 150})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Render Feed Posts
function renderFeed() {
    const container = document.getElementById('feed-container');
    container.innerHTML = '';
    
    demoPosts.forEach(post => {
        const profile = demoProfiles.find(p => p.id === post.userId);
        const postEl = createPostElement(post, profile);
        container.appendChild(postEl);
    });
}

// Create Post Element
function createPostElement(post, profile) {
    const card = document.createElement('article');
    card.className = 'post-card';
    
    let badges = '';
    if (profile.verified) {
        badges += '<span class="badge badge-verified">✓</span>';
    }
    if (profile.badge) {
        badges += `<span class="badge" style="border: 1px solid var(--color-secondary); color: var(--color-secondary);">${profile.badge}</span>`;
    }
    if (profile.ai) {
        badges += '<span class="badge badge-ai">AI</span>';
    }
    
    card.innerHTML = `
        <div class="post-avatar">
            <img src="${profile.avatar}" alt="${profile.name}">
        </div>
        <div class="post-content">
            <div class="post-header">
                <div class="post-author">
                    <span class="author-name">${profile.name}</span>
                    ${badges}
                    <span class="author-handle">${profile.handle}</span>
                </div>
                <span class="post-time">${post.timestamp}</span>
            </div>
            <p class="post-text">${post.content}</p>
            <div class="post-meta-row">
                <div class="emotion-tag">
                    <span class="emotion-icon">${emotionIcons[post.emotion]}</span>
                    <span>${post.emotion} • ${post.emotionLevel}%</span>
                </div>
                <div class="post-actions">
                    <button class="action-item">
                        <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        <span>${formatNumber(post.likes)}</span>
                    </button>
                    <button class="action-item">
                        <svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                        <span>${formatNumber(post.comments)}</span>
                    </button>
                    <button class="action-item">
                        <svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                        <span>${formatNumber(post.shares)}</span>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

// Format Numbers (e.g., 1200 -> 1.2K)
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Setup Interactions
function setupInteractions() {
    const postInput = document.getElementById('post-input');
    const postBtn = document.getElementById('post-btn');
    const navBtns = document.querySelectorAll('.nav-btn');
    const filterChips = document.querySelectorAll('.chip');
    
    // Post submission
    postBtn.addEventListener('click', handlePost);
    postInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handlePost();
        }
    });
    
    // Navigation
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    // Filter chips
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
        });
    });
}

// Handle New Post
function handlePost() {
    const input = document.getElementById('post-input');
    const content = input.value.trim();
    
    if (!content) return;
    
    const newPost = {
        id: Date.now(),
        userId: 1, // Current user (Dr. Aris)
        content: content,
        timestamp: "Just now",
        emotion: "Determination",
        emotionLevel: 85,
        likes: 0,
        comments: 0,
        shares: 0
    };
    
    const profile = demoProfiles.find(p => p.id === 1);
    const postEl = createPostElement(newPost, profile);
    
    const container = document.getElementById('feed-container');
    container.insertBefore(postEl, container.firstChild);
    
    input.value = '';
    
    // Animate the new post
    postEl.style.animation = 'slideIn 0.5s ease-out';
}

// Simulate Incoming Posts
function startSimulatedPosts() {
    const randomContents = [
        "Just synced with my digital twin. The convergence is getting smoother every day.",
        "Anyone else experiencing latency spikes in the Tokyo node?",
        "New memory palace template available in the marketplace. Link in bio.",
        "The quantum encryption update rolled out successfully. Your thoughts are safer than ever.",
        "Watching Earth from the lunar gateway never gets old. Sharing orbital view."
    ];
    
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance every 15 seconds
            const randomProfile = demoProfiles[Math.floor(Math.random() * demoProfiles.length)];
            const randomContent = randomContents[Math.floor(Math.random() * randomContents.length)];
            
            const newPost = {
                id: Date.now(),
                userId: randomProfile.id,
                content: randomContent,
                timestamp: "Just now",
                emotion: "Neutral",
                emotionLevel: 50,
                likes: Math.floor(Math.random() * 100),
                comments: Math.floor(Math.random() * 20),
                shares: Math.floor(Math.random() * 10)
            };
            
            const postEl = createPostElement(newPost, randomProfile);
            const container = document.getElementById('feed-container');
            container.insertBefore(postEl, container.firstChild);
            
            // Remove oldest if too many
            if (container.children.length > 20) {
                container.removeChild(container.lastChild);
            }
        }
    }, 15000);
}

// Add emotion icon for Determination
emotionIcons["Determination"] = '<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" fill="none"/></svg>';
emotionIcons["Neutral"] = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" fill="none"/><line x1="8" y1="15" x2="16" y2="15" stroke="currentColor"/></svg>';
