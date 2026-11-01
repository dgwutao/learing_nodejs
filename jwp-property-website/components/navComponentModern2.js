
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
            top: 30px;
            background-color: rgba(255, 255, 255, 1.0);
            min-width: 120px;
            border-radius: 10px;
            box-shadow: 0 8px 16px rgba(0,0,0,0.2);
            z-index: 1;
        }

        .dropdown-content a {
            display: block;
            color: #333;
            text-decoration: none;
            font-weight: 500;
            font-size: 16px;
            padding: 8px 0;
            border-radius: 4px;
            transition: all 0.3s ease;
            border-radius: 6px;
            text-align: center;
        }

        .dropdown-content a:hover {
            color: #c19b76;
        }

        .dropdown:hover .dropdown-content {
            display: block;
        }

        header {
            background-color: rgba(255, 255, 255, 0.95);
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 15px 0;
        }
        
        .header-container {
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
        }
        
        .logo {
            width: 70px;
        }
        
        .nav-menu {
            display: flex;
            list-style: none;
        }
        
        .nav-menu li {
            margin: 0 15px;
            position: relative;
            color: #333;
        }
        
        .nav-menu li a {
            text-decoration: none;
            color: #333;
            font-weight: 500;
            font-size: 16px;
            transition: color 0.3s;
        }
        
        .nav-menu li a:hover {
            color: #c19b76;
        }
        
        .header-right {
            display: flex;
            align-items: center;
        }
        
        .header-contact {
            display: flex;
            align-items: center;
            margin-right: 20px;
        }
        
        .contact-icon {
            background-color: #c19b76;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
        }
        
        .contact-text {
            font-size: 14px;
        }
        
        .contact-text span {
            font-weight: 600;
            display: block;
        }
        
        .header-actions {
            display: flex;
        }
        
        .action-btn {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #f5f5f5;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        
        .action-btn:hover {
            background-color: #c19b76;
            color: white;
        }
    </style>
    <header>
        <div class="header-container">
            <a href="index.html">
                <img class="logo" src="/static/images/logo_blue.png" title="JWP Group">
            </a>
            
            <ul class="nav-menu">
                <li><a href="index.html">Home</a></li>
                <div class="dropdown">
                <li style="padding: 0px 15px 10px 15px;">Projects</li>
                <div class="dropdown-content">
                    <a href="country.html" style="padding:12px 0;">Thailand🇹🇭</a>
                    <a href="country2.html" style="padding:12px 0;">Greece🇬🇷</a>
                    <a href="country.html" style="padding:12px 0;">Portugal🇵🇹</a>
                    <a href="country.html" style="padding:12px 0;">Turkey🇹🇷</a>
                    <a href="country.html" style="padding:12px 0;">Japan🇯🇵</a>
                    <a href="country.html" style="padding:12px 0;">Cyprus🇨🇾</a>
                    <a href="country.html" style="padding:12px 0;">Ireland🇮🇪</a>
                </div>
            </div>
                <li><a href="property.html">Property</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
            
            <div class="header-right" style="visibility:hidden;">
            <a href="tel:+971 4 123 4567" style="text-decoration: none;color: #333;">
                <div class="header-contact">
                    <div class="contact-icon">
                        <i class="fas fa-phone"></i>
                    </div>
                    <div class="contact-text">
                        <span>Call Us Now</span>
                        +971 4 123 4567
                    </div>
                </div>
            </a>
            </div>
        </div>
    </header>
    `
    shadow.innerHTML = html;
  }

  disconnectedCallback(){

  }
}

customElements.define('nav-component-modern', CustomNav);