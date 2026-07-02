document.addEventListener("DOMContentLoaded", () => {
    // Animate the first page immediately on load
    animateWords(document.getElementById('page1'));
});

function nextPage(currentId, nextId) {
    // Handle Audio (Browsers require user interaction before playing sound)
    const music = document.getElementById("bg-music");
    if (music.paused) {
        music.volume = 0.5; // Keeps the volume soft and comforting
        music.play();
    }

    // Switch Pages
    document.getElementById(currentId).classList.remove('active');
    const nextContainer = document.getElementById(nextId);
    nextContainer.classList.add('active');

    // Trigger word-by-word animation for the new page
    animateWords(nextContainer);
}

function animateWords(container) {
    const elements = container.querySelectorAll('.word-animate');
    let delay = 0.2; // Initial delay before text starts appearing

    elements.forEach((el) => {
        // If we haven't split this text into words yet, do it now
        if (!el.dataset.processed) {
            const text = el.innerText;
            el.innerHTML = ''; // Clear the raw text
            
            const words = text.split(' ');
            words.forEach(word => {
                const span = document.createElement('span');
                span.innerText = word + ' ';
                span.classList.add('word');
                // Apply a staggered delay for each word
                span.style.animation = `popWord 0.4s forwards ease-out`;
                span.style.animationDelay = `${delay}s`;
                el.appendChild(span);
                delay += 0.12; // Speed of the words appearing
            });
            el.dataset.processed = "true";
            delay += 0.3; // Pause between sentences
        } else {
            // If the user loops back around, reset and replay the animation
            const spans = el.querySelectorAll('.word');
            spans.forEach(span => {
                span.style.animation = 'none';
                span.offsetHeight; /* Trigger reflow to restart animation */
                span.style.animation = `popWord 0.4s forwards ease-out`;
                span.style.animationDelay = `${delay}s`;
                delay += 0.12;
            });
            delay += 0.3;
        }
    });
}
