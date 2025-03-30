// Slide Navigation
let currentSlide = 1;
const totalSlides = document.querySelectorAll('.slide').length;

function startPresentation() {
    // Hide the first slide and show the second slide
    document.getElementById('slide1').classList.add('hidden');
    document.getElementById('slide2').classList.remove('hidden');
    
    // Show navigation controls
    document.getElementById('navControls').classList.remove('hidden');
    
    // Update current slide
    currentSlide = 2;
    updateSlideCounter();
}

function nextSlide() {
    if (currentSlide < totalSlides) {
        // Hide current slide
        document.getElementById(`slide${currentSlide}`).classList.add('hidden');
        
        // Show next slide
        currentSlide++;
        document.getElementById(`slide${currentSlide}`).classList.remove('hidden');
        
        // Update slide counter
        updateSlideCounter();
        
        // If we're on the steps slide, update active step
        if (currentSlide === 7) {
            activateStep(1);
        }
    }
}

function prevSlide() {
    if (currentSlide > 2) {
        // Hide current slide
        document.getElementById(`slide${currentSlide}`).classList.add('hidden');
        
        // Show previous slide
        currentSlide--;
        document.getElementById(`slide${currentSlide}`).classList.remove('hidden');
        
        // Update slide counter
        updateSlideCounter();
        
        // If we're on the steps slide, update active step
        if (currentSlide === 7) {
            activateStep(1);
        }
    }
}

function updateSlideCounter() {
    document.getElementById('slideCounter').textContent = `${currentSlide - 1} / ${totalSlides - 1}`;
}

// Steps Navigation for Getting Started Slide
let currentStep = 1;

function activateStep(stepNumber) {
    // Reset all steps
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Hide all demo steps
    document.querySelectorAll('.demo-step').forEach(demoStep => {
        demoStep.style.display = 'none';
    });
    
    // Activate current step
    const currentStepEl = document.querySelector(`.step[data-step="${stepNumber}"]`);
    currentStepEl.classList.add('active');
    
    // Show corresponding demo step
    const currentDemoStep = document.querySelector(`.demo-step-${stepNumber}`);
    currentDemoStep.style.display = 'block';
    
    // Update current step
    currentStep = stepNumber;
}

// Automatic step progression for the getting started slide
let stepInterval;

function setupStepInterval() {
    // Clear any existing interval
    if (stepInterval) {
        clearInterval(stepInterval);
    }
    
    // Set up new interval
    stepInterval = setInterval(() => {
        if (currentSlide === 7) {
            currentStep = currentStep % 5 + 1;
            activateStep(currentStep);
        } else {
            clearInterval(stepInterval);
        }
    }, 3000);
}

// AI Copilot typing effect
const aiResponseTexts = [
    "分析您的要求...",
    "創建自動化工作流程...",
    "配置電子郵件觸發器...",
    "添加條件檢查...",
    "配置短信操作...",
    "流程已創建！當收到主旨包含「緊急」的電子郵件時，將自動發送短信通知"
];

let currentTextIndex = 0;
let typingInterval;

function typeAIResponse() {
    const responseElement = document.getElementById('ai-response-text');
    
    typingInterval = setInterval(() => {
        responseElement.textContent = aiResponseTexts[currentTextIndex];
        currentTextIndex = (currentTextIndex + 1) % aiResponseTexts.length;
        
        if (currentTextIndex === 0) {
            clearInterval(typingInterval);
            setTimeout(() => {
                currentTextIndex = 0;
                typeAIResponse();
            }, 3000);
        }
    }, 1000);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (document.getElementById('navControls').classList.contains('hidden')) {
        return;
    }
    
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        prevSlide();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Initialize automatic step progression for getting started slide
    setupStepInterval();
    
    // Initialize AI response typing effect
    typeAIResponse();
    
    // Add event listeners for steps on the getting started slide
    document.querySelectorAll('.step').forEach(step => {
        step.addEventListener('click', () => {
            const stepNumber = parseInt(step.getAttribute('data-step'));
            activateStep(stepNumber);
        });
    });
    
    // Monitor slide changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                if (currentSlide === 7 && !document.getElementById('slide7').classList.contains('hidden')) {
                    setupStepInterval();
                }
            }
        });
    });
    
    document.querySelectorAll('.slide').forEach(slide => {
        observer.observe(slide, { attributes: true });
    });
});
