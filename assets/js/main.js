/**
 * メインJavaScriptファイル
 * 作成者: 森山湧二郎 (Y.M)
 * 
 * このファイルでは以下の機能を提供：
 * - スムーズスクロール
 * - ナビゲーションのアクティブ状態管理
 * - スキルバーのアニメーション
 * - フェードインアニメーション
 * - ポートフォリオアイテムの動的追加機能
 * - 面白い視覚効果とインタラクション
 */

document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

/**
 * ポートフォリオサイトの初期化
 */
function initializePortfolio() {
    setupSmoothScrolling();
    setupNavbarScrollEffect();
    setupSkillBarsAnimation();
    setupFadeInAnimations();
    setupPortfolioFeatures();
    setupInteractiveEffects();
    setupScrollReveal();
    setupTypingEffect();
    setupParticleBackground();
    setupSoundEngine();
    setupSoundToggle();
    
    console.log('✨ Portfolio initialized with awesome effects! ✨');
}

/**
 * サウンドエンジン（タイプ音・ブリンク音）
 */
let audioCtx;
let soundEnabled = true;
function setupSoundEngine() {
    try {
        soundEnabled = JSON.parse(localStorage.getItem('soundEnabled') ?? 'true');
    } catch (_) { soundEnabled = true; }
    // ユーザー操作で初期化：初回操作でAudioContextを作る
    const resume = () => {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        document.removeEventListener('click', resume);
        document.removeEventListener('pointerdown', resume);
        document.removeEventListener('keydown', resume);
    };
    document.addEventListener('click', resume, { once: true });
    document.addEventListener('pointerdown', resume, { once: true });
    document.addEventListener('keydown', resume, { once: true });
}

function setupSoundToggle() {
    const btn = document.getElementById('sound-toggle');
    if (!btn) {
        console.error('Sound toggle button not found!');
        return;
    }
    const icon = btn.querySelector('i');
    const applyIcon = () => {
        if (soundEnabled) {
            icon.classList.remove('bi-volume-mute');
            icon.classList.add('bi-volume-up');
            btn.setAttribute('aria-label', 'Sound on');
        } else {
            icon.classList.remove('bi-volume-up');
            icon.classList.add('bi-volume-mute');
            btn.setAttribute('aria-label', 'Sound off');
        }
        console.log(`Sound is now ${soundEnabled ? 'enabled' : 'disabled'}`);
    };
    applyIcon();
    btn.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        localStorage.setItem('soundEnabled', JSON.stringify(soundEnabled));
        applyIcon();
        // ONにしたときはAudioContextを確実に作って確認音
        if (soundEnabled) {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                console.log('AudioContext initialized.');
            } else if (audioCtx.state === 'suspended') {
                audioCtx.resume && audioCtx.resume();
                console.log('AudioContext resumed.');
            }
            // 確認音
            setTimeout(() => playClick(900, 0.04, 0.03), 50);
        }
    });
}

// 簡易シンセ：短いクリック音（キータイプ）とクリック音（ブリンク）
function playClick(freq = 800, duration = 0.03, gain = 0.03) {
    if (!soundEnabled || !audioCtx) {
        console.warn('Sound is disabled or AudioContext is not initialized.');
        return;
    }
    console.log(`Playing click sound at ${freq} Hz for ${duration} seconds.`);
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    g.gain.setValueAtTime(gain, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(g).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

function playBlink() {
    // 低めの周波数で短い音
    playClick(300, 0.02, 0.02);
}

/**
 * インタラクティブエフェクトの設定
 */
function setupInteractiveEffects() {
    // カードのマウス追従エフェクト
    const cards = document.querySelectorAll('.card-custom');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // アイコンのクリックエフェクト
    const icons = document.querySelectorAll('.icon-bounce');
    icons.forEach(icon => {
        icon.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'bounceIcon 0.6s ease';
            }, 10);
        });
    });
}

/**
 * スクロール連動のリビールエフェクト
 */
function setupScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * タイピングエフェクトの設定
 */
function setupTypingEffect() {
    const typingElement = document.querySelector('.typing-effect');
    if (!typingElement) return;
    
    const text = typingElement.textContent;
    typingElement.textContent = '';
    
    let index = 0;
    const typeCharacter = () => {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            // タイプ音
            playClick(700 + Math.random()*200, 0.025, 0.025);
            setTimeout(typeCharacter, 90 + Math.random()*60);
        }
    };
    
    // 少し遅延してからタイピングを開始
    setTimeout(typeCharacter, 1000);

    // カーソル点滅に合わせて微音（30fps程度は重いのでsetIntervalで控えめ）
    let blinkOn = false;
    setInterval(() => {
        blinkOn = !blinkOn;
        if (blinkOn) playBlink();
    }, 1100);
}

/**
 * パーティクル背景の設定
 */
function setupParticleBackground() {
    const heroSection = document.getElementById('home');
    if (!heroSection) return;
    
    // パーティクルコンテナを作成
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-bg';
    heroSection.appendChild(particleContainer);
    
    // パーティクルを生成（控えめに）
    for (let i = 0; i < 24; i++) {
        createParticle(particleContainer, i);
    }
    
    function createParticle(container, index) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // ランダムな位置と遅延
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        
        container.appendChild(particle);
        
        // パーティクルが終了したら再生成
        particle.addEventListener('animationend', () => {
            particle.remove();
            createParticle(container, index);
        });
    }
}

/**
 * 動的なグラデーション変更
 */
function setupDynamicGradients() {
    const gradientElements = document.querySelectorAll('.gradient-text');
    
    setInterval(() => {
        gradientElements.forEach(el => {
            const hue = Math.random() * 360;
            el.style.filter = `hue-rotate(${hue}deg)`;
        });
    }, 3000);
}

/**
 * スムーズスクロールの設定
 */
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // モバイルメニューを閉じる
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });
}

/**
 * ナビゲーションバーのスクロール効果
 */
function setupNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        // ナビゲーションバーの背景透明度調整
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.92)';
        } else {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
        }
        
        // アクティブセクションのハイライト
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.offsetHeight;
            
            if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * スキルバーのアニメーション設定
 */
function setupSkillBarsAnimation() {
    const skillBars = document.querySelectorAll('.progress-bar-custom');
    const skillsSection = document.getElementById('skills');
    
    const animateSkillBars = () => {
        const sectionTop = skillsSection.getBoundingClientRect().top;
        const sectionBottom = skillsSection.getBoundingClientRect().bottom;
        
        if (sectionTop < window.innerHeight && sectionBottom > 0) {
            skillBars.forEach((bar, index) => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                    // ちょっとした音効果的な視覚効果
                    bar.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.8)';
                    setTimeout(() => {
                        bar.style.boxShadow = '';
                    }, 500);
                }, 200 * (index + 1));
            });
            
            window.removeEventListener('scroll', animateSkillBars);
        }
    };
    
    window.addEventListener('scroll', animateSkillBars);
}

/**
 * フェードインアニメーションの設定
 */
function setupFadeInAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const animateElements = document.querySelectorAll('.card-custom, .section-title');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * ポートフォリオ機能の設定
 */
function setupPortfolioFeatures() {
    window.portfolioManager = new PortfolioManager();
    
    // 動的グラデーション効果を開始
    setupDynamicGradients();
}

/**
 * ポートフォリオ管理クラス（既存のまま保持）
 */
class PortfolioManager {
    constructor() {
        this.programmingContainer = document.getElementById('programming-portfolio');
        this.musicContainer = document.getElementById('music-portfolio');
        this.musicAnnouncementsContainer = document.getElementById('music-announcements');
        this.musicVideosContainer = document.getElementById('music-videos');
    }
    
    addProgrammingProject(project) {
        const projectElement = this.createProjectElement(project);
        
        if (this.programmingContainer.querySelector('.text-muted')) {
            this.programmingContainer.innerHTML = '';
        }
        
        this.programmingContainer.appendChild(projectElement);
    }
    
    addMusicProject(music) {
        const musicElement = this.createMusicElement(music);
        
        if (this.musicContainer.querySelector('.text-muted')) {
            this.musicContainer.innerHTML = '';
        }
        
        this.musicContainer.appendChild(musicElement);
    }
    
    addMusicAnnouncement(announcement) {
        const announcementElement = this.createAnnouncementElement(announcement);
        
        if (this.musicAnnouncementsContainer.querySelector('.text-muted')) {
            this.musicAnnouncementsContainer.innerHTML = '';
        }
        
        this.musicAnnouncementsContainer.appendChild(announcementElement);
    }
    
    addMusicVideo(video) {
        const videoElement = this.createVideoElement(video);
        
        this.musicVideosContainer.style.display = 'block';
        this.musicVideosContainer.appendChild(videoElement);
    }
    
    createProjectElement(project) {
        const div = document.createElement('div');
        div.className = 'project-item mb-3 p-3 border rounded';
        div.style.backgroundColor = 'var(--dark-surface)';
        div.style.borderColor = 'var(--border-color)';
        
        div.innerHTML = `
            <h6>${project.title}</h6>
            <p class="text-muted mb-2">${project.description}</p>
            <div class="d-flex gap-2">
                ${project.github ? `<a href="${project.github}" target="_blank" class="btn btn-sm btn-outline-custom">
                    <i class="bi bi-github"></i> GitHub
                </a>` : ''}
                ${project.demo ? `<a href="${project.demo}" target="_blank" class="btn btn-sm btn-custom">
                    <i class="bi bi-eye"></i> Demo
                </a>` : ''}
            </div>
            ${project.technologies ? `<div class="mt-2">
                <small class="text-muted">使用技術: ${project.technologies.join(', ')}</small>
            </div>` : ''}
        `;
        
        return div;
    }
    
    createMusicElement(music) {
        const div = document.createElement('div');
        div.className = 'music-item mb-3 p-3 border rounded';
        div.style.backgroundColor = 'var(--dark-surface)';
        div.style.borderColor = 'var(--border-color)';
        
        div.innerHTML = `
            <h6>${music.title}</h6>
            <p class="text-muted mb-2">${music.description}</p>
            ${music.audio ? `<audio controls class="w-100 mb-2">
                <source src="${music.audio}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>` : ''}
            ${music.spotify ? `<a href="${music.spotify}" target="_blank" class="btn btn-sm btn-custom">
                <i class="bi bi-spotify"></i> Spotify
            </a>` : ''}
        `;
        
        return div;
    }
    
    createAnnouncementElement(announcement) {
        const div = document.createElement('div');
        div.className = 'announcement-item mb-3 p-3 border rounded';
        div.style.backgroundColor = 'var(--dark-surface)';
        div.style.borderColor = 'var(--border-color)';
        
        div.innerHTML = `
            <div class="d-flex justify-content-between align-items-start mb-2">
                <h6>${announcement.title}</h6>
                <small class="text-muted">${announcement.date}</small>
            </div>
            <p class="text-muted mb-2">${announcement.description}</p>
            ${announcement.link ? `<a href="${announcement.link}" target="_blank" class="btn btn-sm btn-custom">
                詳細を見る
            </a>` : ''}
        `;
        
        return div;
    }
    
    createVideoElement(video) {
        const div = document.createElement('div');
        div.className = 'video-item mb-3';
        
        div.innerHTML = `
            <h6>${video.title}</h6>
            <div class="ratio ratio-16x9 mb-2">
                <iframe src="${video.url}" allowfullscreen></iframe>
            </div>
            <p class="text-muted">${video.description}</p>
        `;
        
        return div;
    }
}

/**
 * 使用例:
 * 
 * // プログラミング作品を追加
 * portfolioManager.addProgrammingProject({
 *     title: "ToDoアプリ",
 *     description: "Pythonで作成したタスク管理アプリケーション",
 *     github: "https://github.com/yujiro0423/todo-app",
 *     demo: "https://yujiro0423.github.io/todo-app",
 *     technologies: ["Python", "Flask", "SQLite"]
 * });
 * 
 * // 音楽活動告知を追加
 * portfolioManager.addMusicAnnouncement({
 *     title: "初ライブ決定！",
 *     date: "2025-11-15",
 *     description: "地元のライブハウスでバンド初ライブを行います。",
 *     link: "https://example.com/live-info"
 * });
 * 
 * // 音楽動画を追加
 * portfolioManager.addMusicVideo({
 *     title: "オリジナル楽曲 - サンプル",
 *     url: "https://www.youtube.com/embed/VIDEO_ID",
 *     description: "バンドで制作したオリジナル楽曲です。"
 * });
 */