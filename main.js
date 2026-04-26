document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal-text, .glass, .section-title');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Cursor styles (added dynamically)
    const style = document.createElement('style');
    style.innerHTML = `
        .reveal-text, .glass, .section-title {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal-text.active, .glass.active, .section-title.active {
            opacity: 1;
            transform: translateY(0);
        }

        /* Stagger effect for cards */
        .skills-grid .glass:nth-child(2) { transition-delay: 0.1s; }
        .skills-grid .glass:nth-child(3) { transition-delay: 0.2s; }
    `;
    document.head.appendChild(style);

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Hero content entrance
    setTimeout(() => {
        document.querySelectorAll('.hero-content .reveal-text').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('active');
            }, index * 200);
        });
    }, 300);
    // Project Modal Logic
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');
    const projectCards = document.querySelectorAll('.project-card');

    const projectData = {
        'cooking': {
            title: '🍳 My Cooking Journey',
            content: `
                <p>I have developed strong cooking skills through consistent practice and a genuine love for food ❤️. I enjoy preparing a variety of dishes 🍲 and focus not only on taste but also on presentation, making sure that every meal looks as good as it tastes ✨.</p>
                <p>Cooking allows me to express my creativity 🎨, as I enjoy experimenting with different ingredients, flavors, and techniques to create something unique and memorable 🌟. I pay close attention to detail 🔍—from balancing flavors to perfect timing ⏱️ and presenting the final dish in an appealing way 🍽️.</p>
                <p>I also love learning new recipes 📖 and improving them with my own ideas 💡, which helps me grow and refine my skills over time. For me, cooking is not just a task—it is something I truly enjoy and take pride in 😊.</p>
                <p>I feel a sense of satisfaction when I create something from scratch 🥘 and see others enjoy it 😄. With continuous practice and curiosity 🚀, I keep improving and expanding my abilities in the kitchen.</p>
            `
        },
        'skills-artist': {
            title: '🎨 Essential Skills Every Creative Artist Should Know',
            content: `
                <p>As a creative artist, I understand that creativity alone is not enough—it needs to be supported by a combination of skills that help bring ideas to life in the best possible way. Developing these skills allows me to grow, improve, and stand out in my work.</p>
                
                <p>✨ <strong>Creativity & Imagination</strong><br>At the core of every artist is the ability to think differently and imagine new ideas. Creativity helps me turn simple concepts into something unique and meaningful.</p>
                
                <p>🧠 <strong>Observation & Attention to Detail</strong><br>A great artist notices the small things—colors, shapes, textures, and patterns. Paying attention to detail helps me improve the quality and realism of my work.</p>
                
                <p>🎯 <strong>Consistency & Practice</strong><br>Skill comes from regular practice. By consistently working on my craft, I improve my techniques and build confidence in my abilities.</p>
                
                <p>💡 <strong>Problem-Solving Skills</strong><br>Art is not always perfect on the first try. I often face challenges, and solving them creatively helps me grow and refine my work.</p>
                
                <p>🎨 <strong>Sense of Design & Aesthetics</strong><br>Understanding color combinations, balance, spacing, and composition helps me create visually appealing and professional-looking work.</p>
                
                <p>🗣️ <strong>Communication Through Art</strong><br>Art is a way of expressing ideas and emotions. I aim to create work that connects with people and communicates a message without words.</p>
                
                <p>📚 <strong>Willingness to Learn</strong><br>The creative field is always evolving. I stay open to learning new techniques, tools, and styles to keep improving and staying updated.</p>
                
                <p>⚙️ <strong>Technical Skills</strong><br>Whether it’s sketching, digital tools, or web design, having technical knowledge helps me turn creative ideas into real outcomes.</p>
                
                <p>⏳ <strong>Patience & Dedication</strong><br>Great art takes time. I understand the importance of being patient and putting in the effort to achieve the best results.</p>
                
                <p>🚀 <strong>Adaptability & Innovation</strong><br>Trends and styles change, and being adaptable allows me to explore new ideas and stay relevant while developing my own unique style.</p>
            `
        },
        'skills-web': {
            title: '💻 Essential Skills Every Web Developer Should Master',
            content: `
                <p>As a web developer, I understand that building great websites requires more than just writing code—it involves creativity, logic, and continuous learning. Mastering these essential skills helps me create websites that are not only functional but also visually appealing and user-friendly.</p>
                
                <p>🌐 <strong>HTML, CSS & JavaScript</strong><br>These are the foundation of web development. I use HTML to structure content, CSS to design and style it, and JavaScript to add interactivity and dynamic behavior.</p>
                
                <p>🎨 <strong>Responsive Design</strong><br>I ensure that websites look and work perfectly on all devices—mobile phones, tablets, and desktops—by using responsive design techniques.</p>
                
                <p>⚙️ <strong>Problem-Solving Skills</strong><br>Web development often involves debugging and fixing issues. I focus on solving problems logically and efficiently.</p>
                
                <p>🚀 <strong>Performance Optimization</strong><br>A good website should load fast and run smoothly. I work on optimizing images, code, and performance to improve user experience.</p>
                
                <p>🧠 <strong>Understanding of UI/UX</strong><br>I pay attention to how users interact with a website. A clean, simple, and intuitive design makes the website more effective and enjoyable to use.</p>
                
                <p>🔧 <strong>Version Control (Git)</strong><br>Using tools like Git helps me manage my code, track changes, and collaborate efficiently on projects.</p>
                
                <p>🌍 <strong>Basic Backend Knowledge</strong><br>Understanding how servers, databases, and APIs work helps me build more complete and functional web applications.</p>
                
                <p>📱 <strong>Browser Compatibility</strong><br>I make sure my websites work consistently across different browsers like Chrome, Edge, and Firefox.</p>
                
                <p>🔒 <strong>Basic Security Practices</strong><br>I follow basic security measures to protect websites from common issues and ensure safe user interactions.</p>
                
                <p>📚 <strong>Continuous Learning</strong><br>Technology keeps evolving, so I stay updated with new tools, frameworks, and best practices to keep improving my skills.</p>
            `
        },
        'hobby-time': {
            title: '🎯 My Hobbies',
            content: `
                <ul style="list-style: none; padding: 0;">
                    <li style="margin-bottom: 1rem;">🍳 I enjoy cooking and experimenting with new recipes</li>
                    <li style="margin-bottom: 1rem;">✏️ I like sketching and expressing my creativity through drawings</li>
                    <li style="margin-bottom: 1rem;">💻 I love developing websites and creating new designs</li>
                    <li style="margin-bottom: 1rem;">📚 I enjoy learning new skills and exploring different ideas</li>
                    <li style="margin-bottom: 1rem;">🚀 I like improving my work and practicing regularly to get better</li>
                    <li style="margin-bottom: 1rem;">🎨 I enjoy working on creative projects in my free time</li>
                    <li style="margin-bottom: 1rem;">🌟 I like trying new things and challenging myself</li>
                </ul>
            `
        },
        'hobby': {
            title: '🎨 What Is Your Hobby?',
            content: `
                <p>Feel Free To Tell!</p>
                <div class="hobby-input-area">
                    <input type="text" id="user-hobby" placeholder="Type your hobby here..." class="modal-input">
                    <button class="btn primary" id="save-hobby">Share</button>
                </div>
                <p id="hobby-thanks" style="display:none; margin-top: 1rem; color: var(--accent-color);">That sounds like a wonderful hobby! Thanks for sharing! ✨</p>
            `
        }
    };

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            if (projectData[projectId]) {
                modalBody.innerHTML = `
                    <h2>${projectData[projectId].title}</h2>
                    ${projectData[projectId].content}
                `;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling

                // Handle hobby share button if it exists
                const saveHobbyBtn = document.getElementById('save-hobby');
                if (saveHobbyBtn) {
                    saveHobbyBtn.addEventListener('click', () => {
                        const hobbyInput = document.getElementById('user-hobby');
                        const thanksMsg = document.getElementById('hobby-thanks');
                        if (hobbyInput.value.trim() !== "") {
                            hobbyInput.style.display = 'none';
                            saveHobbyBtn.style.display = 'none';
                            thanksMsg.style.display = 'block';
                        }
                    });
                }
            }
        });
    });

    // --- Gaming Zone Logic ---
    const gameContainer = document.getElementById('game-container');
    const gameUI = document.getElementById('game-ui');
    const mobileControls = document.getElementById('mobile-controls');
    const gameCards = document.querySelectorAll('.game-card[data-game]');
    
    let currentGame = null;
    let gameInterval = null;

    gameCards.forEach(card => {
        card.addEventListener('click', () => {
            const gameId = card.getAttribute('data-game');
            startGame(gameId);
        });
    });

    function startGame(id) {
        modalBody.style.display = 'none';
        gameContainer.style.display = 'flex';
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        gameUI.innerHTML = '';
        mobileControls.style.display = 'none';
        if (gameInterval) clearInterval(gameInterval);

        switch(id) {
            case 'snake':
                initSnakeGame();
                break;
            case 'clicker':
                initClickerGame();
                break;
            case 'typing':
                initTypingGame();
                break;
            case 'bomb':
                initBombGame();
                break;
            case 'follow-path':
                initPathGame();
                break;
            case 'odd-one':
                initOddOneOutGame();
                break;
            case 'find-letters':
                initFindLettersGame();
                break;
            default:
                gameUI.innerHTML = `<div class="game-over-overlay"><h2>${id.replace('-', ' ').toUpperCase()}</h2><p>Game logic coming soon! 🚀</p><button class="btn primary" onclick="location.reload()">Back</button></div>`;
        }
    }

    // 🐍 Snake Master Game
    function initSnakeGame() {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) mobileControls.style.display = 'flex';

        gameUI.innerHTML = `
            <div class="game-score">Score: <span id="score">0</span></div>
            <canvas id="snakeCanvas" width="400" height="400"></canvas>
        `;

        const canvas = document.getElementById('snakeCanvas');
        const ctx = canvas.getContext('2d');
        const scoreEl = document.getElementById('score');
        
        const box = 20;
        let score = 0;
        let snake = [{ x: 9 * box, y: 10 * box }];
        let food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
        let d = "RIGHT";

        // Controls
        document.addEventListener("keydown", direction);
        document.getElementById('ctrl-up').onclick = () => { if(d != "DOWN") d = "UP"; };
        document.getElementById('ctrl-down').onclick = () => { if(d != "UP") d = "DOWN"; };
        document.getElementById('ctrl-left').onclick = () => { if(d != "RIGHT") d = "LEFT"; };
        document.getElementById('ctrl-right').onclick = () => { if(d != "LEFT") d = "RIGHT"; };

        function direction(event) {
            const key = event.keyCode;
            const char = event.key.toLowerCase();
            
            if((key == 37 || char == 'a') && d != "RIGHT") d = "LEFT";
            else if((key == 38 || char == 'w') && d != "DOWN") d = "UP";
            else if((key == 39 || char == 'd') && d != "LEFT") d = "RIGHT";
            else if((key == 40 || char == 's') && d != "UP") d = "DOWN";
        }

        function draw() {
            ctx.fillStyle = "#0a0a0a";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw Snake
            for(let i = 0; i < snake.length; i++) {
                ctx.fillStyle = (i == 0) ? "#007aff" : "#3a3a3a";
                ctx.beginPath();
                ctx.roundRect(snake[i].x, snake[i].y, box, box, [4]);
                ctx.fill();
                
                // Add eyes to the head
                if (i === 0) {
                    ctx.fillStyle = "white";
                    ctx.beginPath();
                    ctx.arc(snake[i].x + 5, snake[i].y + 5, 2, 0, Math.PI * 2);
                    ctx.arc(snake[i].x + 15, snake[i].y + 5, 2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // Draw Apple 🍎
            ctx.font = `${box}px Arial`;
            ctx.textBaseline = "top";
            ctx.fillText("🍎", food.x, food.y);

            let snakeX = snake[0].x;
            let snakeY = snake[0].y;

            if( d == "LEFT") snakeX -= box;
            if( d == "UP") snakeY -= box;
            if( d == "RIGHT") snakeX += box;
            if( d == "DOWN") snakeY += box;

            if(snakeX == food.x && snakeY == food.y) {
                score++;
                scoreEl.innerHTML = score;
                food = {
                    x: Math.floor(Math.random() * 19 + 1) * box,
                    y: Math.floor(Math.random() * 19 + 1) * box
                };
            } else {
                snake.pop();
            }

            let newHead = { x: snakeX, y: snakeY };

            if(snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
                clearInterval(gameInterval);
                gameUI.innerHTML += `<div class="game-over-overlay"><h2>Game Over!</h2><p>Final Score: ${score}</p><button class="btn primary" id="restart-snake">Try Again</button></div>`;
                document.getElementById('restart-snake').onclick = initSnakeGame;
            }

            snake.unshift(newHead);
        }

        function collision(head, array) {
            for(let i = 0; i < array.length; i++) {
                if(head.x == array[i].x && head.y == array[i].y) return true;
            }
            return false;
        }

        gameInterval = setInterval(draw, 100);
    }

    // 🖱️ Clicker Game
    function initClickerGame() {
        let count = 0;
        let timeLeft = 10.0;
        let gameStarted = false;
        let highScore = localStorage.getItem('clickerHighScore') || 0;
        if (gameInterval) clearInterval(gameInterval);

        gameUI.innerHTML = `
            <div class="game-score">Best: ${highScore} | Owner: 76 | Time: <span id="timer">10.0</span>s</div>
            <div class="game-score">Score: <span id="clicks">0</span></div>
            <button id="click-me" class="btn primary" style="width: 200px; height: 200px; border-radius: 50%; font-size: 2rem;">START!</button>
        `;

        const btn = document.getElementById('click-me');
        const clicksEl = document.getElementById('clicks');
        const timerEl = document.getElementById('timer');

        btn.onclick = () => {
            if (!gameStarted) {
                gameStarted = true;
                btn.innerHTML = "TAP!";
                gameInterval = setInterval(() => {
                    timeLeft -= 0.1;
                    timerEl.innerHTML = timeLeft.toFixed(1);
                    if (timeLeft <= 0) {
                        clearInterval(gameInterval);
                        endGame();
                    }
                }, 100);
            }

            if (timeLeft > 0) {
                count++;
                clicksEl.innerHTML = count;
                btn.style.transform = "scale(0.95)";
                setTimeout(() => btn.style.transform = "scale(1)", 50);
            }
        };

        function endGame() {
            if (count > highScore) {
                highScore = count;
                localStorage.setItem('clickerHighScore', highScore);
            }
            gameUI.innerHTML = `
                <div class="game-over-overlay">
                    <h2>Time's Up! ⏱️</h2>
                    <p class="game-score">Score: ${count}</p>
                    <p>High Score: ${highScore}</p>
                    <button class="btn primary" id="restart-clicker">Play Again</button>
                </div>
            `;
            document.getElementById('restart-clicker').onclick = initClickerGame;
        }
    }

    // ⌨️ Typing Speed Test
    function initTypingGame() {
        const words = ["MASTERY", "PRECISION", "CHAMPION", "VELOCITY", "REACTION", "BUILDER", "LEGENDARY", "UNSTOPPABLE", "FIREBOLT", "STEALTH", "VORTEX", "CYBER", "ZENITH", "PHANTOM"];
        const targetWord = words[Math.floor(Math.random() * words.length)];
        
        const timeLimit = Math.max(2, (targetWord.length * 0.4)).toFixed(1);
        let timeLeft = parseFloat(timeLimit);
        let gameStarted = false;
        if (gameInterval) clearInterval(gameInterval);
        let highScore = localStorage.getItem('typingHighScore') || 0;

        gameUI.innerHTML = `
            <div class="game-score">Best: ${highScore}s | Time: <span id="typing-timer">${timeLimit}</span>s</div>
            <div class="typing-container">
                <p style="margin-bottom: 0.5rem; opacity: 0.7;">Type this word:</p>
                <h2 id="target-word" style="font-size: 3rem; letter-spacing: 5px; color: var(--accent-color); margin-bottom: 1.5rem;">${targetWord}</h2>
                <input type="text" id="typing-input" class="modal-input" placeholder="Type here..." autocomplete="off" style="text-align: center; font-size: 1.5rem; text-transform: uppercase;">
            </div>
        `;

        const input = document.getElementById('typing-input');
        const timerEl = document.getElementById('typing-timer');
        input.focus();

        input.oninput = () => {
            if (!gameStarted) {
                gameStarted = true;
                gameInterval = setInterval(() => {
                    timeLeft -= 0.1;
                    timerEl.innerHTML = timeLeft.toFixed(1);
                    if (timeLeft <= 0) {
                        clearInterval(gameInterval);
                        endTypingGame(false);
                    }
                }, 100);
            }

            if (input.value.toUpperCase() === targetWord) {
                clearInterval(gameInterval);
                endTypingGame(true);
            }
        };
        function endTypingGame(won) {
            if (won) {
                const speed = (timeLimit - timeLeft).toFixed(2);
                if (highScore === 0 || speed < highScore) {
                    highScore = speed;
                    localStorage.setItem('typingHighScore', highScore);
                }
                gameUI.innerHTML = `
                    <div class="game-over-overlay">
                        <h2>Perfect! ⚡</h2>
                        <p>You typed it in <strong>${speed}s</strong></p>
                        <p>Best Time: ${highScore}s</p>
                        <button class="btn primary" id="next-word">Next Word</button>
                    </div>
                `;
                document.getElementById('next-word').onclick = initTypingGame;
            } else {
                gameUI.innerHTML = `
                    <div class="game-over-overlay">
                        <h2>Time's Up! ⏱️</h2>
                        <p>The word was: <strong>${targetWord}</strong></p>
                        <button class="btn primary" id="retry-typing">Try Again</button>
                    </div>
                `;
                document.getElementById('retry-typing').onclick = initTypingGame;
            }
        }
    }

    // 💣 Dont Tap The Bomb
    function initBombGame() {
        let score = 0;
        let gameActive = true;
        let spawnRate = 800;
        let activeBomb = null;
        if (gameInterval) clearTimeout(gameInterval);

        gameUI.innerHTML = `
            <div class="game-score">Score: <span id="bomb-score">0</span></div>
            <div id="bomb-area" class="bomb-game-area"></div>
        `;

        const area = document.getElementById('bomb-area');
        const scoreEl = document.getElementById('bomb-score');

        function spawn() {
            if (!gameActive) return;

            const circle = document.createElement('div');
            // Only spawn a bomb if one isn't already active
            const isBomb = Math.random() < 0.25 && !activeBomb; 
            
            circle.className = `game-circle ${isBomb ? 'red' : 'green'}`;
            circle.style.left = `${Math.random() * 310}px`;
            circle.style.top = `${Math.random() * 310}px`;

            if (isBomb) activeBomb = circle;

            circle.onclick = (e) => {
                e.stopPropagation();
                if (!gameActive) return;
                
                if (isBomb) {
                    gameActive = false;
                    clearTimeout(gameInterval);
                    circle.classList.add('explosion');
                    setTimeout(() => {
                        gameUI.innerHTML += `
                            <div class="game-over-overlay">
                                <h2>BOOM! 💥</h2>
                                <p>You tapped the bomb!</p>
                                <p>Final Score: ${score}</p>
                                <button class="btn primary" id="retry-bomb">Try Again</button>
                            </div>
                        `;
                        document.getElementById('retry-bomb').onclick = initBombGame;
                    }, 500);
                } else {
                    score++;
                    scoreEl.innerHTML = score;
                    // Speed up slightly every 5 points
                    if (score % 5 === 0 && spawnRate > 300) {
                        spawnRate -= 50;
                    }
                    circle.remove();
                }
            };

            area.appendChild(circle);

            // Disappear after 2 seconds
            setTimeout(() => {
                if (circle.parentElement) {
                    if (isBomb) activeBomb = null;
                    circle.remove();
                }
            }, 2000);

            // Schedule next spawn with current rate
            gameInterval = setTimeout(spawn, spawnRate);
        }

        spawn();
    }

    // 🏜️ Follow The Path
    function initPathGame(level = 1) {
        mobileControls.style.display = 'flex';

        gameUI.innerHTML = `
            <div class="game-score" id="path-status">Level ${level} | Stay on the path! 🏜️</div>
            <canvas id="pathCanvas" width="350" height="450" class="path-canvas"></canvas>
        `;

        const canvas = document.getElementById('pathCanvas');
        const ctx = canvas.getContext('2d');
        
        // Generate Procedural Path
        const pathData = generatePath(level);
        const pathSegments = pathData.segments;
        const finishLine = pathData.finish;
        
        let player = { x: pathSegments[0].x + 20, y: pathSegments[0].y + 20, radius: 8 };
        let gameActive = true;
        let won = false;
        let moveSpeed = 4;

        function generatePath(lvl) {
            const segments = [];
            let cx = 20, cy = 20;
            const pw = Math.max(28, 52 - (lvl * 2)); // Narrower with lvl
            const count = 7 + lvl;

            segments.push({ x: cx, y: cy, w: 60, h: 60 }); // Start
            cx += 20; cy += 20;

            let lastDir = 'H';
            for (let i = 0; i < count; i++) {
                const dir = Math.random() > 0.5 ? 'H' : 'V';
                const len = 60 + Math.random() * 100;

                if (dir === 'H') {
                    const side = (cx + len > canvas.width - 60) ? -1 : (cx - len < 20) ? 1 : (Math.random() > 0.5 ? 1 : -1);
                    const w = len;
                    const x = side === 1 ? cx : cx - w;
                    segments.push({ x: x, y: cy, w: w + pw, h: pw });
                    cx = side === 1 ? cx + w : cx - w;
                } else {
                    const side = (cy + len > canvas.height - 60) ? -1 : (cy - len < 20) ? 1 : (Math.random() > 0.5 ? 1 : -1);
                    const h = len;
                    const y = side === 1 ? cy : cy - h;
                    segments.push({ x: cx, y: y, w: pw, h: h + pw });
                    cy = side === 1 ? cy + h : cy - h;
                }
                
                // Keep within canvas
                cx = Math.max(40, Math.min(canvas.width - 80, cx));
                cy = Math.max(40, Math.min(canvas.height - 80, cy));
            }

            const finish = { x: cx, y: cy, w: pw + 20, h: pw + 20 };
            segments.push({ x: finish.x, y: finish.y, w: finish.w, h: finish.h });

            const cacti = [];
            for (let i = 0; i < 20; i++) {
                cacti.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height });
            }

            return { segments, finish, cacti };
        }

        // Controls
        const keys = {};
        document.onkeydown = (e) => keys[e.key.toLowerCase()] = true;
        document.onkeyup = (e) => keys[e.key.toLowerCase()] = false;

        let btnMove = { up: false, down: false, left: false, right: false };
        const ctrls = ['up', 'down', 'left', 'right'];
        ctrls.forEach(dir => {
            const el = document.getElementById(`ctrl-${dir}`);
            el.onmousedown = el.ontouchstart = (e) => { e.preventDefault(); btnMove[dir] = true; };
            el.onmouseup = el.ontouchend = () => btnMove[dir] = false;
        });

        function update() {
            if (!gameActive) return;
            if (keys['arrowup'] || keys['w'] || btnMove.up) player.y -= moveSpeed;
            if (keys['arrowdown'] || keys['s'] || btnMove.down) player.y += moveSpeed;
            if (keys['arrowleft'] || keys['a'] || btnMove.left) player.x -= moveSpeed;
            if (keys['arrowright'] || keys['d'] || btnMove.right) player.x += moveSpeed;
            player.x = Math.max(player.radius, Math.min(canvas.width - player.radius, player.x));
            player.y = Math.max(player.radius, Math.min(canvas.height - player.radius, player.y));
            checkCollision();
        }

        function draw() {
            if (!gameActive) return;
            update();
            
            // Draw Sand Texture
            ctx.fillStyle = "#d2b48c";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#c2a270";
            for(let i=0; i<canvas.width; i+=15) {
                for(let j=0; j<canvas.height; j+=15) {
                    if((i+j)%4===0) ctx.fillRect(i, j, 2, 2);
                }
            }

            // Draw Cacti 🌵
            ctx.font = "20px Arial";
            pathData.cacti.forEach(c => {
                // Only draw if NOT on path
                let onPath = false;
                pathSegments.forEach(seg => {
                    if(c.x > seg.x && c.x < seg.x+seg.w && c.y > seg.y && c.y < seg.y+seg.h) onPath = true;
                });
                if(!onPath) ctx.fillText("🌵", c.x, c.y);
            });

            ctx.fillStyle = "#f5f5f5";
            pathSegments.forEach(seg => ctx.fillRect(seg.x, seg.y, seg.w, seg.h));

            ctx.fillStyle = "#4cd964";
            ctx.fillRect(finishLine.x, finishLine.y, finishLine.w, finishLine.h);
            ctx.fillStyle = "white";
            ctx.font = "bold 12px Arial";
            ctx.textAlign = "center";
            ctx.fillText("FINISH", finishLine.x + 25, finishLine.y + 30);

            ctx.fillStyle = "#007aff";
            ctx.beginPath();
            ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "white";
            ctx.lineWidth = 2;
            ctx.stroke();

            requestAnimationFrame(draw);
        }

        function checkCollision() {
            // Check 8 points around the circumference for strict collision
            const points = [];
            for(let i=0; i<8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                points.push({
                    x: player.x + Math.cos(angle) * player.radius,
                    y: player.y + Math.sin(angle) * player.radius
                });
            }

            let allPointsOnPath = true;
            points.forEach(p => {
                let pointOnPath = false;
                pathSegments.forEach(seg => {
                    if (p.x >= seg.x && p.x <= seg.x + seg.w &&
                        p.y >= seg.y && p.y <= seg.y + seg.h) pointOnPath = true;
                });
                if(!pointOnPath) allPointsOnPath = false;
            });

            if (player.x >= finishLine.x && player.x <= finishLine.x + finishLine.w &&
                player.y >= finishLine.y && player.y <= finishLine.y + finishLine.h) {
                winGame();
            } else if (!allPointsOnPath) {
                failGame();
            }
        }

        function failGame() {
            gameActive = false;
            gameUI.innerHTML += `<div class="game-over-overlay"><h2>Off Track!</h2><p>Sand is lava! Try again.</p><button class="btn primary" id="retry-path">Try Level ${level}</button></div>`;
            document.getElementById('retry-path').onclick = () => initPathGame(level);
        }

        function winGame() {
            if (won) return;
            won = true;
            gameActive = false;
            gameUI.innerHTML += `<div class="game-over-overlay"><h2>Victory!</h2><p>Level ${level} complete!</p><button class="btn primary" id="next-path">Next Level</button></div>`;
            document.getElementById('next-path').onclick = () => initPathGame(level + 1);
        }

        draw();
    }

    // 🔍 Odd One Out
    function initOddOneOutGame(level = 1) {
        const categories = [
            { normal: '🍎', odd: '🍅', name: 'Fruits' },
            { normal: '🐶', odd: '🐱', name: 'Animals' },
            { normal: '😀', odd: '😁', name: 'Faces' },
            { normal: '🚗', odd: '🏎️', name: 'Vehicles' },
            { normal: '⚽', odd: '🏀', name: 'Sports' },
            { normal: '🍔', odd: '🍕', name: 'Food' },
            { normal: '🦉', odd: '🦅', name: 'Birds' },
            { normal: '🌲', odd: '🌵', name: 'Plants' },
            { normal: '⭐', odd: '🌟', name: 'Stars' }
        ];

        // Increase grid size with level
        const gridSize = Math.min(6, 2 + Math.floor(level / 3));
        const totalItems = gridSize * gridSize;
        const category = categories[Math.floor(Math.random() * categories.length)];
        const oddIndex = Math.floor(Math.random() * totalItems);

        gameUI.innerHTML = `
            <div class="game-score">Level ${level} | Find the odd ${category.name}!</div>
            <div id="odd-grid" class="odd-one-grid" style="grid-template-columns: repeat(${gridSize}, 1fr);"></div>
        `;

        const grid = document.getElementById('odd-grid');

        for (let i = 0; i < totalItems; i++) {
            const item = document.createElement('div');
            item.className = 'odd-item';
            item.innerHTML = (i === oddIndex) ? category.odd : category.normal;
            
            item.onclick = () => {
                if (i === oddIndex) {
                    gameUI.innerHTML += `
                        <div class="game-over-overlay">
                            <h2>Perfect! ✨</h2>
                            <p>You found the odd one!</p>
                            <button class="btn primary" id="next-odd">Next Level</button>
                        </div>
                    `;
                    document.getElementById('next-odd').onclick = () => initOddOneOutGame(level + 1);
                } else {
                    item.style.borderColor = 'red';
                    setTimeout(() => item.style.borderColor = '', 500);
                }
            };
            grid.appendChild(item);
        }
    }

    // 👻 Find The Letters
    function initFindLettersGame(level = 1) {
        const words = ['SPECTER', 'BANSHEE', 'REVENANT', 'POLTERGEIST', 'APPARITION', 'WRAITH', 'NIGHTMARE', 'OBSCURITY'];
        const targetWord = words[Math.floor(Math.random() * words.length)];
        
        gameUI.innerHTML = `
            <div class="game-score">Level ${level} | Scour the shadows for: <b>${targetWord}</b></div>
            <div class="find-letters-container" style="width: 100%; height: 500px;">
                <canvas id="ghostCanvas" width="450" height="550" class="find-letters-canvas"></canvas>
            </div>
        `;

        const canvas = document.getElementById('ghostCanvas');
        const ctx = canvas.getContext('2d');
        let mouse = { x: -100, y: -100 };
        let gameActive = true;
        let won = false;

        // Smoke particles
        let particles = [];
        for(let i=0; i<30; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: 20 + Math.random() * 40,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                alpha: Math.random() * 0.1
            });
        }

        const textPos = { 
            x: 100 + Math.random() * 250, 
            y: 100 + Math.random() * 350 
        };

        const flashlightRadius = Math.max(25, 70 - (level * 4));

        canvas.onmousemove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = (e.clientX - rect.left) * (canvas.width / rect.width);
            mouse.y = (e.clientY - rect.top) * (canvas.height / rect.height);
        };

        canvas.onclick = () => {
            const dist = Math.sqrt((mouse.x - textPos.x)**2 + (mouse.y - textPos.y)**2);
            if (dist < 50 && gameActive) winGame();
        };

        function draw() {
            if (!gameActive) return;

            // 1. Solid Void
            ctx.fillStyle = "#020202";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 2. Draw Smoke/Fog (Ambient)
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if(p.x < 0) p.x = canvas.width;
                if(p.x > canvas.width) p.x = 0;
                if(p.y < 0) p.y = canvas.height;
                if(p.y > canvas.height) p.y = 0;

                ctx.fillStyle = `rgba(40, 40, 40, ${p.alpha})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
                ctx.fill();
            });

            // 3. Spooky Lighting (Flashlight)
            ctx.save();
            
            // Outer glow (soft)
            const outerGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, flashlightRadius * 2);
            outerGlow.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
            outerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = outerGlow;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Inner Beam (Masking)
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, flashlightRadius, 0, Math.PI * 2);
            ctx.clip();

            // Core Light
            const beamGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, flashlightRadius);
            beamGlow.addColorStop(0, 'rgba(255, 250, 200, 0.6)'); // Warm bulb light
            beamGlow.addColorStop(0.8, 'rgba(255, 255, 255, 0.2)');
            beamGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            ctx.fillStyle = "#0a0a0a";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = beamGlow;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // The Word
            ctx.fillStyle = "rgba(255,255,255,0.8)";
            ctx.font = "bold 28px 'Courier New'";
            ctx.textAlign = "center";
            ctx.fillText(targetWord, textPos.x, textPos.y);

            // Ghostly Dust inside beam
            for(let i=0; i<8; i++) {
                ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.2})`;
                ctx.beginPath();
                ctx.arc(mouse.x + (Math.random()-0.5)*flashlightRadius*2, mouse.y + (Math.random()-0.5)*flashlightRadius*2, 2, 0, Math.PI*2);
                ctx.fill();
            }
            
            ctx.restore();

            requestAnimationFrame(draw);
        }

        function winGame() {
            if (won) return;
            won = true;
            gameActive = false;
            gameUI.innerHTML += `
                <div class="game-over-overlay">
                    <h2>Vanquished! 🕯️</h2>
                    <p>The entity was: <b>${targetWord}</b></p>
                    <button class="btn primary" id="next-find">Next Ritual</button>
                </div>
            `;
            document.getElementById('next-find').onclick = () => initFindLettersGame(level + 1);
        }

        draw();
    }

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        modalBody.style.display = 'block';
        gameContainer.style.display = 'none';
        if (gameInterval) clearInterval(gameInterval);
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            modalBody.style.display = 'block';
            gameContainer.style.display = 'none';
            if (gameInterval) clearInterval(gameInterval);
            document.body.style.overflow = 'auto';
        }
    });
});
