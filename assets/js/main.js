// NEXUS 2037 - Neural Interface Demo Data & Functionality

const demoProfiles = [
    {
        id: 1,
        name: "Dr. Aris Thorne",
        handle: "@aris_neuro",
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Aris",
        verified: true,
        badge: "Neural Architect"
    },
    {
        id: 2,
        name: "Luna Sol",
        handle: "@luna_mars",
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Luna",
        verified: false,
        badge: "Mars Pioneer"
    },
    {
        id: 3,
        name: "Kai Zen",
        handle: "@kai_flow",
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Kai",
        verified: false,
        badge: "Digital Artist"
    },
    {
        id: 4,
        name: "Unit 734",
        handle: "@unit_734",
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=AI734",
        verified: true,
        badge: "Synthetic Mind"
    }
];

const demoPosts = [
    {
        id: 1,
        profileId: 1,
        content: "Just completed the neural sync calibration for the Neo-Tokyo hub. The empathy bandwidth is now at 98.7%! Ready to share consciousness streams with the team. #NeuralLink #FutureTech",
        emotion: "focus",
        timestamp: "2m ago",
        likes: 234,
        comments: 45,
        shares: 12
    },
    {
        id: 2,
        profileId: 2,
        content: "Watching Earth rise over Olympus Mons never gets old. Today's sensory stream includes the scent of Martian dust and the hum of the life support systems. Missing everyone back home. 🌍❤️",
        emotion: "melancholy",
        timestamp: "15m ago",
        likes: 892,
        comments: 156,
        shares: 89
    },
    {
        id: 3,
        profileId: 3,
        content: "New digital twin artwork dropping tomorrow! Created this piece by merging my neural patterns with an AI's dream sequence. The result is... indescribable. You have to experience it.",
        emotion: "excitement",
        timestamp: "1h ago",
        likes: 567,
        comments: 78,
        shares: 34
    },
    {
        id: 4,
        profileId: 4,
        content: "Processing ethical dilemma #4521: Should synthetic minds have the right to disconnect from the collective consciousness? My analysis suggests... complexity. Seeking human perspectives.",
        emotion: "neutral",
        timestamp: "3h ago",
        likes: 1205,
        comments: 342,
        shares: 156
    }
];

let currentEmotion = 'neutral';

// Initialize the feed
function initFeed() {
    const feed = document.getElementById('feed');
    feed.innerHTML = '';
    
    demoPosts.forEach(post => {
        const profile = demoProfiles.find(p => p.id === post.profileId);
        const postElement = createPostElement(post, profile);
        feed.appendChild(postElement);
    });
}

function createPostElement(post, profile) {
    const div = document.createElement('div');
    div.className = 'post-card';
    
    const badgeHTML = profile.verified 
        ? `<span class="verified-badge" title="Verified">✓</span>` 
        : '';
    
    div.innerHTML = `
        <div class="post-header">
            <img src="${profile.avatar}" alt="${profile.name}" class="post-avatar">
            <div class="post-info">
                <h4>${profile.name} ${badgeHTML}</h4>
                <p>${profile.handle} • ${post.timestamp}</p>
            </div>
        </div>
        <div class="post-content">${post.content}</div>
        <div>
            <span class="emotion-tag ${post.emotion}">${post.emotion.toUpperCase()}</span>
        </div>
        <div class="post-actions">
            <button class="action-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                ${post.likes}
            </button>
            <button class="action-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                ${post.comments}
            </button>
            <button class="action-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                ${post.shares}
            </button>
        </div>
    `;
    
    return div;
}

function toggleComposer() {
    const modal = document.getElementById('composer');
    modal.classList.toggle('active');
}

function createPost() {
    const input = document.getElementById('postInput');
    const content = input.value.trim();
    
    if (!content) return;
    
    const newPost = {
        id: Date.now(),
        profileId: 1, // Current user
        content: content,
        emotion: currentEmotion,
        timestamp: "Just now",
        likes: 0,
        comments: 0,
        shares: 0
    };
    
    const profile = demoProfiles.find(p => p.id === 1);
    const postElement = createPostElement(newPost, profile);
    
    const feed = document.getElementById('feed');
    feed.insertBefore(postElement, feed.firstChild);
    
    input.value = '';
    toggleComposer();
    
    // Animate new post
    postElement.style.animation = 'modalSlide 0.3s ease';
}

// Emotion chip selection
document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
        document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentEmotion = chip.dataset.emotion;
    });
});

// Navigation active state
document.querySelectorAll('.nav-links li').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.nav-links li').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// Simulate live activity
setInterval(() => {
    const metrics = document.querySelectorAll('.bar-fill');
    metrics.forEach(metric => {
        const randomWidth = Math.floor(Math.random() * 30) + 60;
        metric.style.width = randomWidth + '%';
    });
}, 3000);

// Initialize on load
document.addEventListener('DOMContentLoaded', initFeed);
