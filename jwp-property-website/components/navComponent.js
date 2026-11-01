
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
    const shadow = this.attachShadow({ mode:'closed' });
    const html = `
    <style>
    * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
    }
    .dropdown {
            position: relative;
            display: inline-block;
        }

        .dropdown-content {
            display: none;
            position: absolute;
            top: 26px;
            background-color: #1b263b;
            min-width: 120px;
            border-radius: 10px;
            box-shadow: 0 8px 16px rgba(0,0,0,0.2);
            z-index: 1;
            transition: all 0.3s ease;
        }

        .dropdown-content a {
            display: block;
            color: #f8f9fa;
            text-decoration: none;
            font-weight: 500;
            font-size: 16px;
            border-radius: 4px;
            transition: all 0.5s ease;
            border-radius: 6px;
            text-align: center;
        }

        .dropdown-content a:hover {
            background-color: #d4af37;
            color: #0d1b2a;
        }

        .dropdown:hover .dropdown-content {
            display: block;
        }

        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 5%;
            background-color: rgba(13, 27, 42, 0.95);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
        }

        nav a{
            text-decoration: none;
        }
        
        .logo {
            display: flex;
            align-items: center;
        }
        
        .logo h1 {
            font-size: 28px;
            margin-left: 15px;
            background: linear-gradient(to right, #d4af37, #f5d76e);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 700;
        }
        
        .logo-icon {
            color: #d4af37;
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
            color: #f8f9fa;
            text-decoration: none;
            font-weight: 500;
            font-size: 16px;
            padding: 8px 15px;
            border-radius: 4px;
            transition: all 0.3s ease;
        }
        
        .nav-links a:hover {
            background-color: #d4af37;
            color: #0d1b2a;
        }
    </style>
    <nav>
        <a href="index.html" target="_self">
            <div class="logo">
                <img src="/static/images/logo.png" style="display:block;object-fit:cover;object-position:center;width:70px;"></img>
                <h1 >JWP Group</h1>
            </div>
        </a>
        <ul class="nav-links">
            <li><a href="index.html">首页</a></li>
            <div class="dropdown">
                <li style="padding: 0px 15px 10px 15px;color:white;">全球布局</li>
                <div class="dropdown-content">
                    <a href="country.html" style="padding:12px 0;">泰国🇹🇭</a>
                    <a href="country2.html" style="padding:12px 0;">希腊🇬🇷</a>
                    <a href="country2.html" style="padding:12px 0;">葡萄牙🇵🇹</a>
                    <a href="country2.html" style="padding:12px 0;">土耳其🇹🇷</a>
                    <a href="country2.html" style="padding:12px 0;">日本🇯🇵</a>
                    <a href="country2.html" style="padding:12px 0;">塞浦路斯🇨🇾</a>
                    <a href="country2.html" style="padding:12px 0;">爱尔兰🇮🇪</a>
                </div>
            </div>
            
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

customElements.define('nav-component', CustomNav);