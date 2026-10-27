// --- Step 1: Screen transition function --- 
function openEnvelope() {
    const wrapper = document.querySelector('.envelope-wrapper');
    wrapper.classList.add('open');

    setTimeout(() => {
        switchScreen('screen-envelope', 'screen-animation');
        startHeartAnimation();
    }, 500);
}

function switchScreen(hideId, showId) {
    document.getElementById(hideId).classList.remove('active');
    document.getElementById(showId).classList.add('active');
}

// --- Step 2: Canvas Heart particle animation function ---
function startHeartAnimation() {
    const canvas = document.getElementById('animationCanvas');
    const ctx = canvas.getContext('2d');

    const width = 350;
    const height = 350;
    const N = 400;
    const stars = [];
    const steps = 50;
    let currentFrame = 0;

    for (let i = 0; i < N; i++) {
        const a = 2 * Math.PI * (i / N);
        const base_x = 16 * Math.pow(Math.sin(a), 3);
        const base_y = -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a));

        const scale = 9;
        const tx = width / 2 + base_x * scale;
        const ty = height / 2 + base_y * scale + 10;

        stars.push({
            sx: Math.random() * width,
            sy: Math.random() * height,
            tx: tx + (Math.random() * 20 - 10),
            ty: ty + (Math.random() * 20 - 10),
            size: Math.random() * 1.5 + 1.2
        });
    }

    function drawStar(x, y, size) {
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 1;
        ctx.beginPath();

        ctx.moveTo(x, y - size * 2);
        ctx.lineTo(x, y + size * 2);
        ctx.moveTo(x - size * 2, y);
        ctx.lineTo(x + size * 2, y);

        ctx.stroke();
    }

    function animate() {
        ctx.clearRect(0, 0, width, height,);

        const progress = Math.min(currentFrame / steps, 1);
        const eased = Math.sin(progress * Math.PI / 2)

        for (let star of stars) {
            const cx = star.sx + (star.tx - star.sx) * eased;
            const cy = star.sy + (star.ty - star.sy) * eased;
            drawStar(cx, cy, star.size);
        }

        if (currentFrame < steps) {
            currentFrame++;
            requestAnimationFrame(animate);
        } else {
            setTimeout(() => {
                switchScreen('screen-animation', 'screen-letter');
            }, 1200);
        }
    }
    animate();
}

// --- Step 3: Free form submission logic (AJAX) ---
const form = document.getElementById('replyForm');

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const data = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            form.reset();
            document.getElementById('successMessage').style.display = 'block';
        } else {
            alert('Oops! Baby you made a mistake with submitting your form..');
        }
    } catch (error) {
        alert('Network error...Its the damn wifi again')
    }
});