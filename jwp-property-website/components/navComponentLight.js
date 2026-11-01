
class CustomNav extends HTMLElement {
  constructor() {
    super();
  }
  
  static get observedAttributes() {
    return ['name'];
  }
  
  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[ property ] = newValue;
  }
  
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'closed' });
    const html = `
    <link rel="stylesheet" href="/static/css/fontawesome/css/all.min.css">
    <style>
    * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
    }
    nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 5%;
            background-color: rgba(255, 255, 255, 0.95);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
            box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
            backdrop-filter: blur(5px);
            transition: var(--transition);
        }

        nav a{
            text-decoration: none;
        }

        nav.scrolled {
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            padding: 15px 5%;
        }
        
        .logo {
            display: flex;
            align-items: center;
        }
        
        .logo h1 {
            font-size: 28px;
            margin-left: 15px;
            background: linear-gradient(to right, #0a2a57, #1e4a8e);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 700;
        }
        
        .logo-icon {
            color: #c6a467;
            font-size: 32px;
        }
        
        .nav-links {
            display: flex;
            list-style: none;
        }
        
        .nav-links li {
            margin: 0 15px;
        }
        
        .nav-links a {
            color: #333333;
            text-decoration: none;
            font-weight: 500;
            font-size: 16px;
            padding: 8px 15px;
            border-radius: 4px;
            transition: var(--transition);
        }
        
        .nav-links a:hover {
            color: #0a2a57;
            background-color: rgba(198, 164, 103, 0.1);
        }
    </style>
    <nav id="navbar">
      <a href="index.html">
        <div class="logo">
            <i class="fas fa-globe-americas logo-icon"></i>
            <h1 >JWP Global Investment</h1>
        </div>
      </a>
        <ul class="nav-links">
            <li><a href="index.html" class="active">首页</a></li>
            <li><a href="project.html">全球布局</a></li>
            <li><a href="property.html">房产托管</a></li>
            <li><a href="about.html">关于我们</a></li>
            <li><a href="contact.html">联系我们</a></li>
        </ul>
    </nav>
    `
    shadow.innerHTML = html;
  }

  disconnectedCallback(){

  }
}

customElements.define('nav-component-light', CustomNav);