// smoove.js

// 处理浏览器前缀添加的函数，参考原来的crossBrowser函数改写
function processTransition(property, value, prefix) {
    const vendor = ['webkit', 'moz', 'ms', 'o'];
    const properties = {};

    vendor.forEach(v => {
        if (prefix) {
            value = value.replace(prefix, '-' + v + '-' + prefix);
        }
        properties[`${v.charAt(0).toUpperCase() + v.slice(1)}${property.charAt(0).toUpperCase() + property.slice(1)}`] = value;
    });
    properties[property] = value;

    return properties;
}

// 从元素的data属性中提取出相关的Smoove配置信息
function extractSmooveSettings(element) {
    const settings = {
        offset: 150,
        opacity: 0,
        transition: "all 1s ease, opacity 1.5s ease",
        transformStyle: 'preserve-3d',
        transformOrigin: false,
        perspective: 1000,
        once: false
    };
    const dataAttributes = element.dataset;
    for (const key in dataAttributes) {
        if (dataAttributes.hasOwnProperty(key)) {
            if (key === 'smooveOnce') {
                settings.once = dataAttributes[key] === 'true';
            } else {
                settings[key] = dataAttributes[key];
            }
        }
    }
    return settings;
}

// 处理单个元素的Smoove效果应用逻辑，类似原来的smooveIt函数部分针对单个元素的处理
function applySmooveEffectToElement(element, direction, scrollTop, windowHeight) {

    const settings = extractSmooveSettings(element);
    const offset = (!direction || direction === 'down' && element.style.opacity === '1') ? 0 : settings.offset;
    const itemTop = scrollTop + windowHeight - element.offsetTop;

    // console.log(itemTop);
    if (element.dataset.smoovePlayed !== 'true') {
        if (itemTop < offset) {


            if (settings.opacity !== false) {
                element.style.opacity = settings.opacity;
            }

            // 处理各种变换属性的逻辑，和原来的代码类似，拼接transform字符串等
            const transforms = {};
            const properties = ['move', 'move3D', 'moveX', 'moveY', 'moveZ', 'rotate', 'rotate3d', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scale3d', 'scaleX', 'scaleY', 'skew', 'skewX', 'skewY'];
            properties.forEach(p => {
                if (settings[p] !== undefined) {
                    transforms[p] = settings[p];
                }
            });

            let transform = '';
            for (const t in transforms) {
                transform += t.replace('move', 'translate') + '(' + transforms[t] + ') ';
            }


            if (transform) {
                element.style.transform = transform;
                element.parentElement.style.perspective = settings.perspective;
                // element.parentElement.style.transformStyle = settings.transformStyle;

                if (settings.transformOrigin) {
                    element.style.transformOrigin = settings.transformOrigin;
                }
            }

        } else {
            element.style.opacity = 1;
            element.style.transform = '';
            if (settings.once) {
                element.dataset.smoovePlayed = 'true';
            }

        }
    }

}

// 整体设置Smoove效果，绑定窗口滚动、大小改变事件监听并处理元素效果
function setupSmooveForElements() {
    const elements = document.querySelectorAll('[data-smoove]');  // 选择带有data-smoove属性的元素，可根据实际情况调整选择器
    let oldScroll = 0;
    let oldHeight = window.innerHeight;
    let oldWidth = window.innerWidth;
    let oldDocHeight = document.documentElement.scrollHeight;

    const handleScroll = () => {
        const scrollTop = window.pageYOffset;
        const direction = (scrollTop < oldScroll) ? 'up' : 'down';
        oldScroll = scrollTop;
        elements.forEach(element => {
            applySmooveEffectToElement(element, direction, scrollTop, window.innerHeight);
        });
    };

    const handleResize = () => {
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        const direction = (oldHeight > windowHeight) ? 'up' : 'down';
        oldHeight = windowHeight;

        if (oldWidth !== windowWidth) {
            elements.forEach(element => {
                element.style.transform = '';
                element.style.transition = '';
            });

            const interval = setInterval(() => {
                const docHeight = document.documentElement.scrollHeight;
                if (docHeight === oldDocHeight) {
                    clearInterval(interval);
                    elements.forEach(element => {
                        element.style.transition = extractSmooveSettings(element).transition;
                    });
                    handleScroll();
                }
                oldDocHeight = docHeight;
            }, 500);
        } else {
            handleScroll();
        }
        oldWidth = windowWidth;
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
    };
}

export default {
    setupSmooveForElements
};