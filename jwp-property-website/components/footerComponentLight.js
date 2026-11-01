
const showAlert = ()=>{
  this.dispatchEvent(new CustomEvent('showAlert_', { 
    detail: { message: 'hey hey hey' }, 
    bubbles: true, // 允许事件冒泡 
    composed: true, // 允许事件穿越Shadow DOM边界
  }))
}

class CustomFooter extends HTMLElement {
  constructor() {
    super();
  }
  
  // component attributes
  static get observedAttributes() {
    return ['name'];
  }
  
  // attribute change
  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[ property ] = newValue;
  }
  
  // connect component
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'closed' });
    const html = `
    <link rel="stylesheet" href="/static/css/fontawesome/css/all.min.css">
    <style>
    footer {
            background: rgba(255, 255, 255, 0.95);
            padding: 60px 5% 30px;
            text-align: center;
            color:#333333;

            box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
            backdrop-filter: blur(5px);
            transition: var(--transition);
        }
        
        .footer-logo {
            font-size: 2rem;
            color: #d4af37;
            margin-bottom: 20px;
        }
        
        .contact-info {
            max-width: 600px;
            margin: 0 auto 40px;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }
        
        .contact-item i {
            color: #d4af37;
            margin-right: 10px;
        }
        
        .copyright {
            padding-top: 30px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            opacity: 0.7;
        }
    </style>
    <footer id="contact">
        <div class="footer-logo">
            <i class="fas fa-globe-americas"></i> JWP Global Investment
        </div>
        
        <div class="contact-info">
            <div class="contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>德国科隆市 | 中国北京市</span>
            </div>
            <div class="contact-item">
                <i class="fas fa-phone"></i>
                <span>+49 221 1234567</span>
            </div>
            <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <span>info@jwp-global.com</span>
            </div>
        </div>
        
        <p class="copyright">© 2023 JWP Global Investment. 版权所有</p>
    </footer>
    `
    shadow.innerHTML = html;
  }

  disconnectedCallback(){

  }
}

// register component
customElements.define('footer-component-light', CustomFooter);