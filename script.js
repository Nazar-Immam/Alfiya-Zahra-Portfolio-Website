
// Typing animation
const typingTexts = [
    "DevOps Engineer",
    "Cloud Enthusiast", 
    "Automation Expert",
    "Infrastructure Architect"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const current = typingTexts[textIndex];
    const typingElement = document.getElementById('typingText');
    
    if (isDeleting) {
        typingElement.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === current.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
    }
    
    setTimeout(typeText, isDeleting ? 50 : 150);
}

// Create pipeline animation
function createPipeline() {
    const container = document.getElementById('pipelineBg');
    const line = document.createElement('div');
    line.className = 'pipeline-line';
    line.style.top = Math.random() * window.innerHeight + 'px';
    line.style.width = '200px';
    container.appendChild(line);
    
    setTimeout(() => {
        container.removeChild(line);
    }, 8000);
}

// Create floating containers
function createFloatingContainers() {
    const hero = document.querySelector('.hero');
    // floating box loop
  /*  for (let i = 0; i < 6; i++) {
        const container = document.createElement('div');
        container.className = 'floating-container';
        container.style.left = Math.random() * window.innerWidth + 'px';
        container.style.top = Math.random() * window.innerHeight + 'px';
        container.style.animationDelay = Math.random() * 6 + 's';
        hero.appendChild(container);
    } */
}

// Terminal functionality
function showTerminal() {
    document.getElementById('terminal').style.display = 'block';
}

function closeTerminal() {
    document.getElementById('terminal').style.display = 'none';
}

// Dashboard mode
function toggleDashboard() {
    const dashboard = document.getElementById('dashboardMode');
    dashboard.style.display = dashboard.style.display === 'none' ? 'block' : 'none';
}

// Terminal easter egg
document.addEventListener('DOMContentLoaded', function() {
    const terminalInput = document.getElementById('terminalInput');
    const terminalOutput = document.getElementById('terminalOutput');
    
    terminalInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const command = this.value.toLowerCase();
            if (command === 'kubectl get pods') {
                terminalOutput.innerHTML = `
                    <div style="color: #10b981; margin-top: 10px;">
                        NAME&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;READY&nbsp;&nbsp;&nbsp;STATUS&nbsp;&nbsp;&nbsp;&nbsp;RESTARTS
                        <br>frontend-pod-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1/1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Running&nbsp;&nbsp;&nbsp;0
                        <br>frontend-pod-2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1/1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Running&nbsp;&nbsp;&nbsp;0
                        <br>backend-pod-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1/1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Running&nbsp;&nbsp;&nbsp;0
                        <br>database-pod-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1/1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Running&nbsp;&nbsp;&nbsp;0
                    </div>`;
                // Create pod animation
                createPodAnimation();
            }
            this.value = '';
        }
    });
});

function createPodAnimation() {
    for (let i = 0; i < 4; i++) {
        setTimeout(() => {
            const pod = document.createElement('div');
            pod.style.cssText = `
                position: fixed;
                width: 40px;
                height: 40px;
                background: linear-gradient(45deg, #10b981, #00d4ff);
                border-radius: 8px;
                top: ${Math.random() * window.innerHeight}px;
                left: -50px;
                animation: podFly 3s linear forwards;
                z-index: 1000;
            `;
            document.body.appendChild(pod);
            
            setTimeout(() => {
                document.body.removeChild(pod);
            }, 3000);
        }, i * 200);
    }
}

// Add CSS for pod animation
const style = document.createElement('style');
style.textContent = `
    @keyframes podFly {
        to {
            transform: translateX(${window.innerWidth + 100}px) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Initialize everything
typeText();
createFloatingContainers();

// Show terminal after 3 seconds
setTimeout(showTerminal, 3000);

// Create pipeline animations
setInterval(createPipeline, 2000);

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission - Allow FormSubmit to work
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    // Don't prevent default - let FormSubmit handle it
    const submitBtn = this.querySelector('.cta-btn');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
});

// Skill tag interactions
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', function() {
        this.style.animation = 'pulse 0.6s ease-in-out';
        setTimeout(() => {
            this.style.animation = '';
        }, 600);
    });
});

// Add pulse animation for skill tags
const skillStyle = document.createElement('style');
skillStyle.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); box-shadow: 0 0 20px #00d4ff; }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(skillStyle);

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

// Add scroll reveal animation
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

// Apply scroll reveal to sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.8s ease-out';
    observer.observe(section);
});

// Add certification badge animation (if needed)
function createCertificationBadge() {
    const badge = document.createElement('div');
    badge.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #00d4ff, #7c3aed);
            padding: 30px;
            border-radius: 20px;
            color: white;
            text-align: center;
            z-index: 3000;
            box-shadow: 0 0 50px rgba(0, 212, 255, 0.5);
            display: none;
        " id="certBadge">
            <h3>🏆 AWS Cloud Practitioner</h3>
            <p>Certified Cloud Professional</p>
            <button onclick="closeCertBadge()" style="
                margin-top: 15px;
                background: white;
                color: #00d4ff;
                border: none;
                padding: 10px 20px;
                border-radius: 10px;
                cursor: pointer;
            ">Close</button>
        </div>
    `;
    document.body.appendChild(badge);
}

window.closeCertBadge = function() {
    document.getElementById('certBadge').style.display = 'none';
};

// Show certification badge on skill click (AWS)
document.querySelectorAll('.skill-tag').forEach(tag => {
    if (tag.textContent === 'AWS') {
        tag.addEventListener('dblclick', function() {
            document.getElementById('certBadge').style.display = 'block';
        });
    }
});

createCertificationBadge();

// Add particle system for extra visual appeal
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -2;
    `;
    document.body.appendChild(particleContainer);

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #00d4ff;
            border-radius: 50%;
            animation: particle ${Math.random() * 10 + 5}s linear infinite;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
        `;
        particleContainer.appendChild(particle);
    }
}

// Add particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particle {
        0% { 
            opacity: 0;
            transform: translateY(0) scale(0);
        }
        10% { 
            opacity: 1;
            transform: translateY(-10px) scale(1);
        }
        90% { 
            opacity: 1;
            transform: translateY(-100vh) scale(1);
        }
        100% { 
            opacity: 0;
            transform: translateY(-100vh) scale(0);
        }
    }
`;
document.head.appendChild(particleStyle);

createParticles();

// Add dynamic dashboard updates
function updateDashboard() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const randomWidth = Math.floor(Math.random() * 40) + 60; // 60-100%
        bar.style.width = randomWidth + '%';
    });
}

// Update dashboard every 3 seconds when visible
setInterval(() => {
    if (document.getElementById('dashboardMode').style.display === 'block') {
        updateDashboard();
    }
}, 3000);

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl + D for dashboard
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        toggleDashboard();
    }
    
    // Ctrl + T for terminal
    if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        const terminal = document.getElementById('terminal');
        terminal.style.display = terminal.style.display === 'none' ? 'block' : 'none';
    }
});

console.log('🚀 DevOps Portfolio loaded successfully!');
console.log('💡 Try these keyboard shortcuts:');
console.log('   Ctrl + D: Toggle Dashboard Mode');
console.log('   Ctrl + T: Toggle Terminal');
console.log('🎯 Double-click AWS skill tag to see certification!');

