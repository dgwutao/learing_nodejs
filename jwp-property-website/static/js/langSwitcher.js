
        const resources = {
            'zh': {
                title: '多语言网站示例',
                'hero-title': '构建多语言网站',
                'hero-text': '无需框架或库，使用原生JavaScript实现多语言切换功能，提升全球用户体验。',
                'hero-btn': '了解更多',
                'feature1-title': '简单语言切换',
                'feature1-text': '通过JavaScript实现一键切换语言功能，无需重新加载页面，提供流畅的用户体验。',
                'feature2-title': '纯前端实现',
                'feature2-text': '仅使用HTML、CSS和JavaScript实现，无需后端支持，轻量高效。',
                'feature3-title': '记忆用户偏好',
                'feature3-text': '使用localStorage保存用户语言偏好，下次访问时自动恢复设置。',
                'feature-btn': '阅读更多',
                'info-title': '多语言网站的优势',
                'info-text1': '在全球化的今天，多语言网站对于吸引国际用户至关重要。通过提供用户母语内容，您可以显著提升用户体验和参与度。',
                'info-text2': '研究表明，用户更倾向于使用母语浏览网站，使用母语时购买意愿提高4倍。多语言支持是拓展国际市场的基础。',
                'info-text3': '我们的解决方案使用纯前端技术实现语言切换，无需复杂后端架构，适合中小型网站快速实现国际化。',
                'globe-text': '全球用户无障碍访问',
                'footer-text': '© 2023 多语言网站示例 | 使用原生Web技术构建'
            },
            'en': {
                'title': 'Multilingual Website Demo',
                'hero-title': 'Build Multilingual Websites',
                'hero-text': 'Implement language switching with native JavaScript, no frameworks required. Enhance global user experience.',
                'hero-btn': 'Learn More',
                'feature1-title': 'Easy Language Switching',
                'feature1-text': 'One-click language switching with JavaScript, no page reload required for a seamless experience.',
                'feature2-title': 'Pure Frontend Solution',
                'feature2-text': 'Implemented with only HTML, CSS, and JavaScript. No backend required, lightweight and efficient.',
                'feature3-title': 'User Preference Memory',
                'feature3-text': 'Save user language preferences using localStorage. Settings restored on next visit automatically.',
                'feature-btn': 'Read More',
                'info-title': 'Benefits of Multilingual Websites',
                'info-text1': 'In today\'s globalized world, multilingual websites are essential for attracting international users. Providing content in users\' native language significantly enhances user experience and engagement.',
                'info-text2': 'Research shows that users prefer browsing websites in their native language and are 4 times more likely to make a purchase. Multilingual support is fundamental for international market expansion.',
                'info-text3': 'Our solution implements language switching using pure frontend technology, requiring no complex backend architecture. Ideal for small to medium websites to achieve internationalization quickly.',
                'globe-text': 'Global Accessibility',
                'footer-text': '© 2023 Multilingual Website Demo | Built with Native Web Technologies'
            }
        };

        var currentLang = 'zh';
        var elementsToTranslate;

        function initLanguage() {
            elementsToTranslate = document.querySelectorAll('[data-lang]');
            const savedLang = localStorage.getItem('preferredLang');
            if (savedLang) {
                currentLang = savedLang;
            }
            applyLanguage();
        }

        function switchLanguage(lang) {
            if (currentLang != lang) {
                currentLang = lang;
                localStorage.setItem('preferredLang', lang);
                applyLanguage();
            }
        }

        function applyLanguage() {
            elementsToTranslate.forEach(element => {
                const key = element.dataset.lang;
                if (resources[currentLang][key]) {
                    element.textContent = resources[currentLang][key];
                }
            });
        }
