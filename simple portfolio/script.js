document.addEventListener('DOMContentLoaded', () => {
    const smoothScroll = (target, duration) => {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;

        const start = window.pageYOffset;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const distance = targetPosition - start;
        let startTime = null;

        const animation = currentTime => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, start, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        const ease = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        requestAnimationFrame(animation);
    };

    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = link.getAttribute('href');
            smoothScroll(target, 800);
        });
    });

    const scrollTopButton = document.createElement('button');
    scrollTopButton.innerHTML = 'Top';
    scrollTopButton.style.position = 'fixed';
    scrollTopButton.style.bottom = '20px';
    scrollTopButton.style.right = '20px';
    scrollTopButton.style.padding = '10px 15px';
    scrollTopButton.style.backgroundColor = '#4a90e2';
    scrollTopButton.style.color = '#fff';
    scrollTopButton.style.border = 'none';
    scrollTopButton.style.borderRadius = '5px';
    scrollTopButton.style.cursor = 'pointer';
    scrollTopButton.style.display = 'none';
    document.body.appendChild(scrollTopButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopButton.style.display = 'block';
        } else {
            scrollTopButton.style.display = 'none';
        }
    });

    scrollTopButton.addEventListener('click', () => {
        smoothScroll('body', 500);
    });
});
