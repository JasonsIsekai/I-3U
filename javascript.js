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
        const a = 2 * Math.PI *(i / N);
        const base_x = 16 * Math.pow(Math.sin(a), 3);
        const base_y = -(13 *Math.cos(a) - 5 * Math.cos(2*a) - 2 * Math.cos(3*a) - Math.cos(4*a));

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
        const angles = [0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4];
        for (let angles of angles) {
            const dx = (size + Math.cos(angle)) * 1.5;
            const dy= (size * Math.sin(angle)) * 1.5;
            ctx.moveTo(x - dx, y - dy);
            ctx.lineTo(x + dx, y + dy);       
        }
        ctx.stroke();
    }

    function animate() {
        ctx.clearReact(0, 0, width, height,);

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
        } else{
            setTimeout(() => {
                switchScreen('screen-animation', 'screen-letter');
            }, 1200);
        }
    }
    animate();
}