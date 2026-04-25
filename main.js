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

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});
