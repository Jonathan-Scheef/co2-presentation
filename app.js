// Presentation app JavaScript
class Presentation {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 10;
        this.slides = document.querySelectorAll('.slide');
        this.speakerNotesVisible = false;
        
        // Speaker notes content for each slide
        this.speakerNotes = [
            "Willkommen zur Präsentation über Kohlenstoffdioxid und Kohlensäure. Diese Präsentation führt Sie durch die wichtigsten Aspekte dieser fundamentalen chemischen Verbindungen, die eine zentrale Rolle in unserem täglichen Leben und für unser Klima spielen.",
            
            "Heute werden wir eine umfassende Reise durch die Welt von CO₂ und H₂CO₃ unternehmen. Wir beginnen mit den Grundlagen, erkunden die Eigenschaften und enden mit praktischen Anwendungen und interessanten Fakten.",
            
            "Kohlenstoffdioxid ist eine der wichtigsten chemischen Verbindungen auf unserem Planeten. Es besteht aus einem Kohlenstoffatom, das mit zwei Sauerstoffatomen durch Doppelbindungen verbunden ist. Obwohl CO₂ nur einen sehr kleinen Anteil der Atmosphäre ausmacht, spielt es eine entscheidende Rolle für das Leben auf der Erde. Es entsteht sowohl bei natürlichen Prozessen wie der Zellatmung als auch bei menschlichen Aktivitäten wie der Verbrennung fossiler Brennstoffe.",
            
            "CO₂ hat einige bemerkenswerte physikalische Eigenschaften. Da es schwerer als Luft ist, sammelt es sich in tiefer liegenden Bereichen an, was bei der Arbeit in geschlossenen Räumen wichtig zu beachten ist. Ein faszinierendes Phänomen ist die Sublimation - festes CO₂, bekannt als Trockeneis, geht direkt vom festen in den gasförmigen Zustand über, ohne zu schmelzen. Diese Eigenschaft macht es zu einem idealen Kühlmittel für viele Anwendungen.",
            
            "Kohlensäure ist das Produkt der Reaktion zwischen Kohlenstoffdioxid und Wasser. Interessant ist, dass nur ein sehr geringer Anteil des gelösten CO₂ tatsächlich zu echter Kohlensäure reagiert. Das meiste bleibt als physikalisch gelöstes CO₂ im Wasser. Die echte Kohlensäure ist sehr instabil und zerfällt nach der Entstehung sofort wieder in ihre Ausgangsstoffe. Das Sprudeln in kohlensäurehaltigen Getränken entsteht daher hauptsächlich durch das entweichende CO₂.",
            
            "Als zweiprotonige Säure kann Kohlensäure ihre Protonen in zwei Stufen abgeben. Die erste Dissoziation führt zur Bildung von Hydrogencarbonat-Ionen, die zweite zu Carbonat-Ionen. Diese Eigenschaft ist entscheidend für viele biologische und geologische Prozesse. Die Salze der Kohlensäure finden wir überall in der Natur - von Kalkstein in Gebirgen bis zu den Puffersystemen in unserem Blut.",
            
            "CO₂ und Kohlensäure begegnen uns täglich in vielfältiger Form. In der Getränkeindustrie sorgen sie für den erfrischenden Sprudel. In Feuerlöschern nutzt man die Eigenschaft von CO₂, Sauerstoff zu verdrängen und so Brände zu löschen - besonders wertvoll bei elektrischen Geräten, da CO₂ keine Rückstände hinterlässt. Trockeneis wird nicht nur zum Kühlen verwendet, sondern auch für spektakuläre Nebeleffekte auf Bühnen. Als Lebensmittelzusatzstoff E290 hilft CO₂ dabei, Lebensmittel länger haltbar zu machen.",
            
            "CO₂ spielt eine Doppelrolle als Treibhausgas. Der natürliche Treibhauseffekt ist lebensnotwendig - ohne ihn wäre unser Planet eine gefrorene Wüste. CO₂-Moleküle können bei einer spezifischen Wellenlänge von 15 Mikrometern zum Schwingen angeregt werden, was genau im Bereich der von der Erde abgestrahlten Wärmestrahlung liegt. Problematisch wird es, wenn durch menschliche Aktivitäten zu viel zusätzliches CO₂ in die Atmosphäre gelangt und den natürlichen Treibhauseffekt verstärkt.",
            
            "Hier sind einige faszinierende Fakten: Jeder von uns produziert täglich etwa 700 Gramm CO₂ nur durch das Atmen - das ist aber Teil des natürlichen Kreislaufs. Welse haben eine erstaunliche Fähigkeit entwickelt: Sie können winzige Veränderungen im CO₂-Gehalt des Wassers wahrnehmen und so ihre Beute aufspüren. Wenn wir zu anderen Planeten blicken, sehen wir extreme Beispiele: Die Venus zeigt uns, was ein außer Kontrolle geratener Treibhauseffekt bewirken kann. Die praktische Eigenschaft der elektrischen Nichtleitfähigkeit macht CO₂ zum idealen Löschmittel für empfindliche Elektronik.",
            
            "Zum Abschluss können wir festhalten: Kohlenstoffdioxid und Kohlensäure sind weit mehr als nur chemische Formeln. Sie sind grundlegende Bausteine des Lebens auf der Erde, haben unzählige praktische Anwendungen und spielen eine zentrale Rolle für unser Klima. Das Verständnis ihrer Eigenschaften und Wirkungen hilft uns, sowohl die Natur besser zu verstehen als auch verantwortungsvoller mit unserem Planeten umzugehen. Die Chemie zeigt uns einmal mehr, wie eng Wissenschaft und Alltag miteinander verknüpft sind."
        ];
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateSlideCounter();
        this.updateSpeakerNotes();
        this.updateNavigationButtons();
    }
    
    bindEvents() {
        // Navigation buttons
        document.getElementById('nextBtn').addEventListener('click', () => this.nextSlide());
        document.getElementById('prevBtn').addEventListener('click', () => this.prevSlide());
        
        // Speaker notes toggle
        document.getElementById('toggleNotes').addEventListener('click', () => this.toggleSpeakerNotes());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        
        // Prevent default arrow key scrolling
        document.addEventListener('keydown', (e) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
                e.preventDefault();
            }
        });
        
        // Touch/swipe support for mobile
        this.addTouchSupport();
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.goToSlide(this.currentSlide + 1);
        }
    }
    
    prevSlide() {
        if (this.currentSlide > 0) {
            this.goToSlide(this.currentSlide - 1);
        }
    }
    
    goToSlide(slideIndex) {
        if (slideIndex < 0 || slideIndex >= this.totalSlides) return;
        
        // Remove active class from current slide
        this.slides[this.currentSlide].classList.remove('active');
        
        // Add transition classes
        if (slideIndex > this.currentSlide) {
            this.slides[this.currentSlide].classList.add('prev');
            this.slides[slideIndex].classList.add('next');
        } else {
            this.slides[this.currentSlide].classList.add('next');
            this.slides[slideIndex].classList.add('prev');
        }
        
        // Update current slide
        this.currentSlide = slideIndex;
        
        // Activate new slide after a short delay
        setTimeout(() => {
            this.slides.forEach(slide => {
                slide.classList.remove('prev', 'next');
            });
            this.slides[this.currentSlide].classList.add('active');
        }, 50);
        
        // Update UI
        this.updateSlideCounter();
        this.updateSpeakerNotes();
        this.updateNavigationButtons();
        
        // Animate bullet points
        this.animateBulletPoints();
    }
    
    updateSlideCounter() {
        document.getElementById('currentSlide').textContent = this.currentSlide + 1;
        document.getElementById('totalSlides').textContent = this.totalSlides;
    }
    
    updateSpeakerNotes() {
        const notesContent = document.getElementById('notesContent');
        notesContent.innerHTML = `<p>${this.speakerNotes[this.currentSlide]}</p>`;
    }
    
    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        prevBtn.disabled = this.currentSlide === 0;
        nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
    }
    
    toggleSpeakerNotes() {
        const speakerNotes = document.getElementById('speakerNotes');
        const toggleBtn = document.getElementById('toggleNotes');
        
        this.speakerNotesVisible = !this.speakerNotesVisible;
        
        if (this.speakerNotesVisible) {
            speakerNotes.classList.add('visible');
            toggleBtn.textContent = 'Notizen ausblenden';
        } else {
            speakerNotes.classList.remove('visible');
            toggleBtn.textContent = 'Notizen einblenden';
        }
    }
    
    handleKeyDown(e) {
        switch (e.code) {
            case 'ArrowRight':
            case 'Space':
            case 'PageDown':
                this.nextSlide();
                break;
            case 'ArrowLeft':
            case 'PageUp':
                this.prevSlide();
                break;
            case 'Home':
                this.goToSlide(0);
                break;
            case 'End':
                this.goToSlide(this.totalSlides - 1);
                break;
            case 'KeyF':
                this.toggleFullscreen();
                break;
            case 'KeyN':
                this.toggleSpeakerNotes();
                break;
            case 'Escape':
                if (this.speakerNotesVisible) {
                    this.toggleSpeakerNotes();
                }
                break;
        }
    }
    
    addTouchSupport() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        const container = document.querySelector('.presentation-container');
        
        container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        container.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            // Check if it's a horizontal swipe
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.prevSlide();
                } else {
                    this.nextSlide();
                }
            }
        });
    }
    
    animateBulletPoints() {
        const currentSlideElement = this.slides[this.currentSlide];
        const bulletPoints = currentSlideElement.querySelectorAll('.bullet-points li');
        
        bulletPoints.forEach((bullet, index) => {
            bullet.style.opacity = '0';
            bullet.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                bullet.style.transition = 'all 0.5s ease';
                bullet.style.opacity = '1';
                bullet.style.transform = 'translateX(0)';
            }, index * 150 + 200);
        });
    }
    
    toggleFullscreen() {
        const container = document.querySelector('.presentation-container');
        
        if (!document.fullscreenElement) {
            container.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }
    
    // Auto-advance functionality (optional)
    startAutoAdvance(interval = 30000) { // 30 seconds
        this.autoAdvanceInterval = setInterval(() => {
            if (this.currentSlide < this.totalSlides - 1) {
                this.nextSlide();
            } else {
                this.stopAutoAdvance();
            }
        }, interval);
    }
    
    stopAutoAdvance() {
        if (this.autoAdvanceInterval) {
            clearInterval(this.autoAdvanceInterval);
            this.autoAdvanceInterval = null;
        }
    }
    
    // Progress tracking
    getProgress() {
        return {
            current: this.currentSlide + 1,
            total: this.totalSlides,
            percentage: Math.round(((this.currentSlide + 1) / this.totalSlides) * 100)
        };
    }
}

// Initialize presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const presentation = new Presentation();
    
    // Add some helpful keyboard shortcuts info
    console.log('Keyboard shortcuts:');
    console.log('→ / Space / Page Down: Next slide');
    console.log('← / Page Up: Previous slide');
    console.log('Home: First slide');
    console.log('End: Last slide');
    console.log('F: Toggle fullscreen');
    console.log('N: Toggle speaker notes');
    console.log('ESC: Hide speaker notes');
    
    // Make presentation globally accessible for debugging
    window.presentation = presentation;
    
    // Add progress indicator to console
    setInterval(() => {
        const progress = presentation.getProgress();
        document.title = `Präsentation (${progress.current}/${progress.total}) - Kohlenstoffdioxid und Kohlensäure`;
    }, 1000);
    
    // Add print functionality
    window.addEventListener('beforeprint', () => {
        // Make all slides visible for printing
        document.querySelectorAll('.slide').forEach(slide => {
            slide.style.position = 'static';
            slide.style.opacity = '1';
            slide.style.transform = 'none';
        });
    });
    
    window.addEventListener('afterprint', () => {
        // Restore slide visibility
        document.querySelectorAll('.slide').forEach((slide, index) => {
            if (index !== presentation.currentSlide) {
                slide.style.position = 'absolute';
                slide.style.opacity = '0';
                slide.style.transform = 'translateX(100px)';
            }
        });
    });
});

// Add some helper functions for external control
window.goToSlide = (slideNumber) => {
    if (window.presentation) {
        window.presentation.goToSlide(slideNumber - 1);
    }
};

window.toggleNotes = () => {
    if (window.presentation) {
        window.presentation.toggleSpeakerNotes();
    }
};

window.getSlideInfo = () => {
    if (window.presentation) {
        return window.presentation.getProgress();
    }
    return null;
};