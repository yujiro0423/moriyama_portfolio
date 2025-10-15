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
    
    console.log('Portfolio initialized successfully!');
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
                const headerOffset = 80; // ナビゲーションバーの高さ
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
            navbar.style.backgroundColor = 'rgba(15, 15, 26, 0.95)';
        } else {
            navbar.style.backgroundColor = 'rgba(15, 15, 26, 0.7)';
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
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            });
            
            // 一度実行したら削除
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
    
    // 観察対象の要素を追加
    const animateElements = document.querySelectorAll('.card-custom, .section-title');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * ポートフォリオ機能の設定
 */
function setupPortfolioFeatures() {
    // ポートフォリオアイテム追加機能の初期化
    window.portfolioManager = new PortfolioManager();
}

/**
 * ポートフォリオ管理クラス
 * 動的にプロジェクトや音楽作品を追加できる機能を提供
 */
class PortfolioManager {
    constructor() {
        this.programmingContainer = document.getElementById('programming-portfolio');
        this.musicContainer = document.getElementById('music-portfolio');
        this.musicAnnouncementsContainer = document.getElementById('music-announcements');
        this.musicVideosContainer = document.getElementById('music-videos');
    }
    
    /**
     * プログラミング作品を追加
     * @param {Object} project - プロジェクト情報
     */
    addProgrammingProject(project) {
        const projectElement = this.createProjectElement(project);
        
        if (this.programmingContainer.querySelector('.text-muted')) {
            this.programmingContainer.innerHTML = '';
        }
        
        this.programmingContainer.appendChild(projectElement);
    }
    
    /**
     * 音楽作品を追加
     * @param {Object} music - 音楽作品情報
     */
    addMusicProject(music) {
        const musicElement = this.createMusicElement(music);
        
        if (this.musicContainer.querySelector('.text-muted')) {
            this.musicContainer.innerHTML = '';
        }
        
        this.musicContainer.appendChild(musicElement);
    }
    
    /**
     * 音楽活動の告知を追加
     * @param {Object} announcement - 告知情報
     */
    addMusicAnnouncement(announcement) {
        const announcementElement = this.createAnnouncementElement(announcement);
        
        if (this.musicAnnouncementsContainer.querySelector('.text-muted')) {
            this.musicAnnouncementsContainer.innerHTML = '';
        }
        
        this.musicAnnouncementsContainer.appendChild(announcementElement);
    }
    
    /**
     * 音楽動画を追加
     * @param {Object} video - 動画情報
     */
    addMusicVideo(video) {
        const videoElement = this.createVideoElement(video);
        
        this.musicVideosContainer.style.display = 'block';
        this.musicVideosContainer.appendChild(videoElement);
    }
    
    /**
     * プロジェクト要素を作成
     */
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
    
    /**
     * 音楽要素を作成
     */
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
    
    /**
     * 告知要素を作成
     */
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
    
    /**
     * 動画要素を作成
     */
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