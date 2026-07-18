# Nexus 2037 - UI/UX Design System

## Overview

This document details the complete UI/UX design system for Nexus 2037, the social media platform of 2037. Our design philosophy centers on creating an **invisible interface** that adapts to users across multiple reality layers.

---

## 🎨 Design Tokens

### Color System

#### Primary Palette
```css
:root {
  /* Core Brand Colors */
  --neural-cyan: #00F5FF;
  --quantum-purple: #7B2FFF;
  --synth-pink: #FF2F8B;
  
  /* Background Colors */
  --deep-space: #0A0E1A;
  --void-blue: #121826;
  --nebula: #1A2240;
  
  /* Text Colors */
  --text-primary: #FFFFFF;
  --text-secondary: #A0A8C0;
  --text-muted: #6B7280;
  
  /* Semantic Colors */
  --success: #00FF9D;
  --warning: #FFB800;
  --error: #FF4D4D;
  --info: #00D4FF;
}
```

#### Dynamic Theme Colors (Emotion-Based)
```javascript
const emotionThemes = {
  calm: {
    primary: '#4ECDC4',
    background: '#1A3A4A',
    accent: '#95E1D3'
  },
  energetic: {
    primary: '#FF6B6B',
    background: '#2D1B3D',
    accent: '#FFE66D'
  },
  focused: {
    primary: '#6C5CE7',
    background: '#1E1A3D',
    accent: '#A29BFE'
  },
  social: {
    primary: '#FD79A8',
    background: '#2D1B2E',
    accent: '#FAB1A0'
  }
};
```

### Typography Scale

```css
/* Font Families */
--font-neural-sans: 'Neural Sans', system-ui, sans-serif;
--font-quantum-mono: 'Quantum Mono', 'Fira Code', monospace;
--font-holo-display: 'Holo Display', 'Orbitron', sans-serif;

/* Responsive Type Scale */
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
--text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
--text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
--text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
--text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
--text-2xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);
--text-3xl: clamp(2rem, 1.7rem + 1.5vw, 2.5rem);
--text-4xl: clamp(2.5rem, 2rem + 2.5vw, 3.5rem);

/* Spatial Text Sizing (for AR/VR) */
--spatial-text-near: 0.5rem;   /* 50cm distance */
--spatial-text-mid: 1.0rem;    /* 100cm distance */
--spatial-text-far: 2.0rem;    /* 200cm distance */
```

### Spacing System

```css
/* Base 8px Grid */
--space-1: 0.25rem;   /* 2px */
--space-2: 0.5rem;    /* 4px */
--space-3: 0.75rem;   /* 6px */
--space-4: 1rem;      /* 8px */
--space-5: 1.25rem;   /* 10px */
--space-6: 1.5rem;    /* 12px */
--space-8: 2rem;      /* 16px */
--space-10: 2.5rem;   /* 20px */
--space-12: 3rem;     /* 24px */
--space-16: 4rem;     /* 32px */
--space-20: 5rem;     /* 40px */
--space-24: 6rem;     /* 48px */

/* Spatial Depth Layers */
--depth-layer-1: translateZ(0px);
--depth-layer-2: translateZ(50px);
--depth-layer-3: translateZ(100px);
--depth-layer-4: translateZ(200px);
--depth-layer-5: translateZ(400px);
```

### Elevation & Shadows

```css
/* Traditional Shadows */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.6);
--shadow-glow: 0 0 20px rgba(0, 245, 255, 0.5);

/* Holographic Glow Effects */
--holo-glow-cyan: 0 0 30px rgba(0, 245, 255, 0.6);
--holo-glow-purple: 0 0 30px rgba(123, 47, 255, 0.6);
--holo-glow-pink: 0 0 30px rgba(255, 47, 139, 0.6);
```

### Border Radius

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 24px;
--radius-full: 9999px;

/* Spatial Borders (for 3D cards) */
--radius-spatial: clamp(12px, 10px + 1vw, 20px);
```

---

## 🧩 Core Components

### 1. Neural Feed Card

The fundamental content unit in Nexus 2037.

```jsx
// NeuralFeedCard.jsx
import React from 'react';
import { motion } from 'framer-motion-3d';
import { useGesture } from '@use-gesture/react';

const NeuralFeedCard = ({ 
  post, 
  depth = 0, 
  onReact, 
  onExpand 
}) => {
  const [{ rotateX, rotateY }, api] = useGesture(() => ({}));
  
  // Depth-based styling
  const depthScale = 1 - (depth * 0.05);
  const depthOpacity = 1 - (depth * 0.1);
  
  return (
    <motion.div
      className="neural-card"
      style={{
        scale: depthScale,
        opacity: depthOpacity,
        transformStyle: 'preserve-3d',
      }}
      animate={{
        z: depth * 100,
      }}
      whileHover={{
        z: depth * 100 + 50,
        boxShadow: 'var(--holo-glow-cyan)',
      }}
    >
      {/* Sentiment Particles Background */}
      <SentimentParticles sentiment={post.sentiment} />
      
      {/* Content Layer */}
      <div className="card-content">
        <AuthorAvatar author={post.author} size="spatial" />
        <PostContent content={post.content} type={post.type} />
        <MediaGallery media={post.media} />
      </div>
      
      {/* Interaction Layer */}
      <div className="interaction-bar">
        <ReactionButton type="empathy" count={post.empathyCount} />
        <ReactionButton type="insight" count={post.insightCount} />
        <ReactionButton type="resonance" count={post.resonanceCount} />
        <ShareButton spatial />
      </div>
      
      {/* Context Tags */}
      <ContextTags tags={post.context} />
    </motion.div>
  );
};
```

**Visual States:**
- **Rest**: Subtle float animation, depth-appropriate opacity
- **Hover**: Elevates, glows with user's theme color
- **Focus**: Expands to fill view, background blurs
- **Interacting**: Particle effects react to gestures

### 2. HoloProfile Avatar

Dynamic 3D representation that evolves with user activity.

```jsx
// HoloProfileAvatar.jsx
const HoloProfileAvatar = ({ userId, size = 'md', interactive = true }) => {
  const [userData, setUserData] = useState(null);
  const avatarRef = useRef();
  
  // Fetch dynamic avatar data
  useEffect(() => {
    fetch(`/api/users/${userId}/avatar`)
      .then(res => res.json())
      .then(data => setUserData(data));
  }, [userId]);
  
  if (!userData) return <AvatarSkeleton />;
  
  return (
    <div className={`holo-avatar holo-avatar--${size}`}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls enableZoom={false} autoRotate={interactive} />
        
        {/* Base Mesh */}
        <AvatarMesh 
          geometry={userData.meshGeometry}
          material={userData.holoMaterial}
        />
        
        {/* Dynamic Aura */}
        <AuraEffect 
          mood={userData.currentMood}
          activityLevel={userData.activityScore}
        />
        
        {/* Achievement Particles */}
        {userData.achievements.map(achievement => (
          <AchievementParticle 
            key={achievement.id}
            icon={achievement.icon}
            position={achievement.position}
          />
        ))}
        
        {/* Real-time Status Ring */}
        <StatusRing 
          status={userData.status}
          availability={userData.availability}
        />
      </Canvas>
      
      {/* Name Tag (AR mode) */}
      {interactive && (
        <div className="avatar-label">
          <span className="user-name">{userData.displayName}</span>
          <span className="user-status">{userData.statusText}</span>
        </div>
      )}
    </div>
  );
};
```

**Avatar States:**
- **Online**: Pulsing cyan aura
- **Focused**: Purple glow, minimal particles
- **Social**: Pink sparkles, active rotation
- **Away**: Dimmed, slow pulse
- **In VR/AR**: Full 3D presence indicator

### 3. Immersive Composer

Multi-modal input interface for creating content.

```jsx
// ImmersiveComposer.jsx
const ImmersiveComposer = ({ onSubmit, mode = 'standard' }) => {
  const [inputMode, setInputMode] = useState('text');
  const [content, setContent] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [privacyLevel, setPrivacyLevel] = useState('public');
  
  // AI co-creation
  useEffect(() => {
    if (content.length > 10) {
      debouncedFetchSuggestions(content);
    }
  }, [content]);
  
  const handleInputModeChange = (newMode) => {
    setInputMode(newMode);
    // Initialize appropriate input handler
  };
  
  return (
    <div className="immersive-composer">
      {/* Mode Selector */}
      <div className="mode-selector">
        <ModeButton 
          icon="keyboard" 
          label="Text" 
          active={inputMode === 'text'}
          onClick={() => handleInputModeChange('text')}
        />
        <ModeButton 
          icon="mic" 
          label="Voice" 
          active={inputMode === 'voice'}
          onClick={() => handleInputModeChange('voice')}
        />
        <ModeButton 
          icon="brain" 
          label="Thought" 
          active={inputMode === 'neural'}
          onClick={() => handleInputModeChange('neural')}
          requiresNeuralInterface
        />
        <ModeButton 
          icon="experience" 
          label="Experience" 
          active={inputMode === 'experience'}
          onClick={() => handleInputModeChange('experience')}
        />
      </div>
      
      {/* Input Area */}
      <div className="composer-input">
        {inputMode === 'text' && (
          <SmartTextArea 
            value={content}
            onChange={setContent}
            aiAssist
          />
        )}
        {inputMode === 'voice' && (
          <VoiceRecorder 
            onTranscript={setContent}
            visualizer="waveform"
          />
        )}
        {inputMode === 'neural' && (
          <NeuralInterfaceInput 
            onThoughtCapture={setContent}
            confidenceThreshold={0.85}
          />
        )}
        {inputMode === 'experience' && (
          <ExperienceCapture 
            onCapture={(exp) => setContent(JSON.stringify(exp))}
            includeSensoryData
          />
        )}
      </div>
      
      {/* AI Suggestions */}
      {aiSuggestions.length > 0 && (
        <AISuggestionsPanel 
          suggestions={aiSuggestions}
          onApply={(suggestion) => setContent(suggestion)}
        />
      )}
      
      {/* Privacy Slider */}
      <PrivacySlider 
        value={privacyLevel}
        onChange={setPrivacyLevel}
        levels={['neural-only', 'close-friends', 'followers', 'public']}
      />
      
      {/* Reality Preview */}
      <RealityPreviewToggle 
        previewModes={['mobile', 'ar', 'vr', 'hologram']}
      />
      
      {/* Action Buttons */}
      <div className="composer-actions">
        <AttachMediaButton />
        <AddContextTagButton />
        <SchedulePostButton />
        <SubmitButton 
          onClick={() => onSubmit({ content, privacyLevel, inputMode })}
          disabled={!content.trim()}
        />
      </div>
    </div>
  );
};
```

### 4. Spatial Chat Interface

3D conversation space for real-time communication.

```jsx
// SpatialChat.jsx
const SpatialChat = ({ roomId, participants }) => {
  const [messages, setMessages] = useState([]);
  const [spatialPosition, setSpatialPosition] = useState({ x: 0, y: 0, z: 0 });
  
  return (
    <div className="spatial-chat-container">
      {/* 3D Conversation Space */}
      <Canvas>
        <ArcballCamera />
        
        {/* Participant Avatars in Space */}
        {participants.map(participant => (
          <SpatialAvatar
            key={participant.id}
            participant={participant}
            position={participant.spatialPosition}
            onProximityChange={handleProximityChange}
          />
        ))}
        
        {/* Message Bubbles in 3D Space */}
        {messages.map(message => (
          <MessageBubble3D
            key={message.id}
            message={message}
            position={message.spatialPosition}
            age={message.age}
            fadeOnAge
          />
        ))}
        
        {/* Ambient Conversation Zones */}
        <ConversationZone 
          center={[0, 0, 0]}
          radius={5}
          onEnter={handleZoneEnter}
          onLeave={handleZoneLeave}
        />
      </Canvas>
      
      {/* Traditional Fallback UI */}
      <div className="chat-fallback">
        <MessageList messages={messages} />
        <ChatInput onSend={sendMessage} />
      </div>
      
      {/* Spatial Controls */}
      <SpatialControls
        onMove={setSpatialPosition}
        onZoom={handleZoom}
        onViewChange={handleViewChange}
      />
    </div>
  );
};
```

### 5. Emotion Visualization Component

Real-time sentiment display using particle systems.

```jsx
// SentimentParticles.jsx
const SentimentParticles = ({ sentiment, intensity = 0.5 }) => {
  const particles = useRef();
  
  useFrame((state, delta) => {
    if (particles.current) {
      particles.current.rotation.y += delta * 0.1;
      // Animate based on sentiment
      updateParticleBehavior(particles.current, sentiment, delta);
    }
  });
  
  const getSentimentColor = (sentiment) => {
    const colors = {
      joy: '#FFD700',
      sadness: '#4A90E2',
      excitement: '#FF2F8B',
      calm: '#00FF9D',
      anger: '#FF4D4D',
      curiosity: '#7B2FFF'
    };
    return colors[sentiment] || '#FFFFFF';
  };
  
  return (
    <Canvas>
      <Points ref={particles}>
        <BufferGeometry>
          <Float32BufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </BufferGeometry>
        <PointsMaterial
          size={0.1}
          color={getSentimentColor(sentiment)}
          transparent
          opacity={intensity * 0.8}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </Canvas>
  );
};
```

---

## 🎭 Animation System

### Micro-interactions

```javascript
// animations.js
export const animations = {
  // Card entrance
  cardEntrance: {
    initial: { opacity: 0, y: 50, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { type: 'spring', damping: 20, stiffness: 300 }
  },
  
  // Reaction burst
  reactionBurst: {
    initial: { scale: 0, opacity: 1 },
    animate: { scale: 1.5, opacity: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  
  // Floating idle
  floatIdle: {
    y: [0, -10, 0],
    transition: { 
      duration: 4, 
      repeat: Infinity,
      ease: 'easeInOut'
    }
  },
  
  // Neural pulse
  neuralPulse: {
    boxShadow: [
      '0 0 10px rgba(0, 245, 255, 0.3)',
      '0 0 30px rgba(0, 245, 255, 0.8)',
      '0 0 10px rgba(0, 245, 255, 0.3)'
    ],
    transition: { duration: 2, repeat: Infinity }
  }
};
```

### Page Transitions

```javascript
// pageTransitions.js
export const pageTransitions = {
  // Neural feed scroll
  feedScroll: {
    type: 'scroll',
    parallax: true,
    depthLayers: 5,
    easing: 'smooth'
  },
  
  // Profile navigation
  profileEnter: {
    type: 'zoom',
    from: 'thumbnail',
    duration: 0.4,
    backdropBlur: true
  },
  
  // Modal presentation
  modalPresent: {
    type: 'spring',
    backdrop: 'blur',
    scale: { from: 0.9, to: 1 },
    opacity: { from: 0, to: 1 }
  }
};
```

---

## 📐 Layout Systems

### Responsive Breakpoints

```css
/* Device-Agnostic Breakpoints */
--breakpoint-nano: 320px;   /* Smart watches */
--breakpoint-mobile: 640px; /* Phones */
--breakpoint-tablet: 1024px; /* Tablets */
--breakpoint-desktop: 1440px; /* Monitors */
--breakpoint-ultrawide: 2560px; /* Ultra-wide */

/* Reality Mode Breakpoints */
--breakpoint-ar: min-width 1px; /* Always active in AR */
--breakpoint-vr: min-width 1px; /* Always active in VR */
--breakpoint-holo: display-mode holographic; /* Holographic displays */
```

### Grid Systems

```css
/* Fluid Grid */
.grid-fluid {
  display: grid;
  grid-template-columns: repeat(
    auto-fit, 
    minmax(min(300px, 100%), 1fr)
  );
  gap: var(--space-6);
}

/* Spatial Grid (for 3D layouts) */
.grid-spatial {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  perspective: 1000px;
  transform-style: preserve-3d;
}
```

---

## ♿ Accessibility

### WCAG 2.2 AAA Compliance

- **Contrast Ratios**: Minimum 7:1 for all text
- **Focus Indicators**: Visible on all interactive elements
- **Screen Reader Support**: Full ARIA labeling
- **Keyboard Navigation**: Complete functionality without mouse
- **Motion Reduction**: Respects `prefers-reduced-motion`
- **Neurodiversity**: Customizable sensory input levels

```css
/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  :root {
    --text-primary: #FFFFFF;
    --text-secondary: #FFFF00;
    --deep-space: #000000;
  }
}
```

### Neural Interface Accessibility

```javascript
// Neural accessibility settings
const neuralAccessibility = {
  thoughtSensitivity: 'medium', // low, medium, high
  feedbackModality: 'haptic', // visual, auditory, haptic
  confirmationRequired: true,
  errorTolerance: 0.15,
  calibrationFrequency: 'session' // per-session, daily, weekly
};
```

---

## 🌐 Internationalization

### Supported Languages

- 200+ written languages
- 50+ sign language avatars
- Real-time translation with tone preservation
- Context-aware localization

```javascript
// i18n configuration
const i18n = {
  locales: ['en', 'es', 'zh', 'hi', 'ar', 'fr', ...], // 200+
  defaultLocale: 'en',
  direction: 'auto', // LTR/RTL detection
  numberFormatting: 'locale',
  dateFormatting: 'relative', // "2 hours ago" vs timestamp
  tonePreservation: true,
  culturalContext: true
};
```

---

## 📱 Platform-Specific Adaptations

### AR Glasses

```css
/* AR-specific styles */
@media (display-mode: augmented-reality) {
  .neural-card {
    position: fixed;
    anchor-name: --content-anchor;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .ui-chrome {
    display: none; /* Invisible interface */
  }
}
```

### VR Headsets

```css
/* VR-specific styles */
@media (display-mode: virtual-reality) {
  body {
    overscroll-behavior: none;
    cursor: none;
  }
  
  .immersive-composer {
    transform-style: preserve-3d;
    max-width: 80vw; /* Comfortable viewing angle */
  }
}
```

### Traditional Mobile

```css
/* Mobile fallback */
@media (max-width: 640px) {
  .neural-feed {
    transform: none; /* Disable 3D */
    perspective: none;
  }
  
  .holo-avatar {
    aspect-ratio: 1;
    max-width: 120px;
  }
}
```

---

## 🧪 Testing Guidelines

### Visual Regression Tests

```bash
# Run visual tests
npm run test:visual

# Test across reality modes
npm run test:ar
npm run test:vr
npm run test:mobile
```

### Accessibility Audits

```bash
# Automated accessibility testing
npm run audit:a11y

# Neural interface usability testing
npm run test:neural-a11y
```

### Performance Benchmarks

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Animation Frame Rate**: 90fps minimum (120fps target)
- **Bundle Size**: < 100KB critical path

---

## 📚 Resources

- **Figma Design System**: [link.internal/design]
- **Component Storybook**: [storybook.nexus2037.dev]
- **3D Asset Library**: [assets.nexus2037.dev]
- **Animation Playground**: [animations.nexus2037.dev]

---

*Last updated: January 2025*  
*Version: 1.0.0-alpha*
