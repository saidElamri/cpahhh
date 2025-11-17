// faq.js
    
// Initialize FAQ Accordion
function initializeFAQ() {
    try {
        const faqItems = document.querySelectorAll('.faq-item');
        
        if (faqItems.length === 0) {
            return;
        }
        
        faqItems.forEach((item, index) => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            if (!question || !answer) {
                return;
            }
            
            answer.style.display = 'none';
            answer.setAttribute('aria-hidden', 'true');
            question.setAttribute('aria-expanded', 'false');
            question.setAttribute('role', 'button');
            question.setAttribute('tabindex', '0');
            question.setAttribute('id', `faq-question-${index}`);
            answer.setAttribute('id', `faq-answer-${index}`);
            answer.setAttribute('aria-labelledby', `faq-question-${index}`);
            
            question.addEventListener('click', function() {
                toggleFAQ(item, question, answer);
            });
            
            question.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFAQ(item, question, answer);
                }
            });
        });
    } catch (error) {
        console.error('Error initializing FAQ:', error);
    }
}

// Toggle FAQ item
function toggleFAQ(item, question, answer) {
    try {
        const isExpanded = question.getAttribute('aria-expanded') === 'true';
        
        const allFaqItems = document.querySelectorAll('.faq-item');
        allFaqItems.forEach(otherItem => {
            if (otherItem !== item) {
                const otherQuestion = otherItem.querySelector('.faq-question');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                if (otherQuestion && otherAnswer) {
                    otherAnswer.style.display = 'none';
                    otherAnswer.setAttribute('aria-hidden', 'true');
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    otherItem.classList.remove('active');
                }
            }
        });
        
        if (isExpanded) {
            answer.style.display = 'none';
            answer.setAttribute('aria-hidden', 'true');
            question.setAttribute('aria-expanded', 'false');
            item.classList.remove('active');
        } else {
            answer.style.display = 'block';
            answer.setAttribute('aria-hidden', 'false');
            question.setAttribute('aria-expanded', 'true');
            item.classList.add('active');
        }
    } catch (error) {
        console.error('Error toggling FAQ:', error);
    }
}

// Make functions globally accessible
window.initializeFAQ = initializeFAQ;