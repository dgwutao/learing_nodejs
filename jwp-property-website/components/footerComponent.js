
const scrollToTop = ()=>{
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
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
    <link href="/static/css/google-fonts.css" rel="stylesheet">
    <style>
    * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        footer {
            background: #1b263b;
            color: #aaa;
            padding: 70px 0 30px;

            font-family: 'Montserrat', sans-serif;
            line-height: 1.6;
            overflow-x: hidden;
        }
        
        .footer-container {
            max-width: 1400px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            padding: 0 20px;
        }
        
        .footer-col h4 {
            color: white;
            font-size: 1.2rem;
            margin-bottom: 25px;
            position: relative;
        }
        
        .footer-col h4::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -10px;
            width: 50px;
            height: 2px;
            background: #c19b76;
        }
        
        .footer-col ul {
            list-style: none;
        }
        
        .footer-col ul li {
            margin-bottom: 15px;
        }
        
        .footer-col ul li a {
            color: #aaa;
            text-decoration: none;
            transition: color 0.3s;
        }
        
        .footer-col ul li a:hover {
            color: #c19b76;
        }
        
        .social-links {
            display: flex;
            gap: 15px;
            margin-top: 20px;
        }
        
        .social-links a {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #333;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            transition: background 0.3s;
        }
        
        .social-links a:hover {
            background: #c19b76;
        }
        
        .footer-bottom {
            max-width: 1400px;
            margin: 50px auto 0;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #444;
            font-size: 0.9rem;
        }
    </style>
    <!-- Footer -->
    <footer>
        <div class="footer-container">
            <div class="footer-col">
                <h4>About JWP Group</h4>
                <p>Creating premium lifestyle experiences through exceptional real estate developments since 1976.</p>
                <div class="social-links">
                    <a href="#"><i class="fab fa-facebook-f"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                    <a href="#"><i class="fab fa-linkedin-in"></i></a>
                    <a href="#"><i class="fab fa-youtube"></i></a>
                </div>
            </div>
            
            <div class="footer-col">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="property.html">Property</a></li>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </div>
            
            <div class="footer-col">
                <h4>Projects</h4>
                <ul>
                    <li><a href="country.html">JWP Thailand</a></li>
                    <li><a href="country.html">JWP Greece</a></li>
                    <li><a href="country.html">JWP Portugal</a></li>
                    <li><a href="country.html">JWP Turkey</a></li>
                    <li><a href="country.html">JWP Japan</a></li>
                    <li><a href="country.html">JWP Cyprus</a></li>
                    <li><a href="country.html">JWP Ireland</a></li>
                </ul>
            </div>
            
            <div class="footer-col">
                <h4>Contact Us</h4>
                <ul>
                    <li><i class="fas fa-map-marker-alt"></i> Sobha Sales Pavilion, Dubai, UAE</li>
                    <li><i class="fas fa-phone"></i> +971 4 123 4567</li>
                    <li><i class="fas fa-envelope"></i> info@sobharealty.com</li>
                </ul>
            </div>
        </div>
        
        <div class="footer-bottom">
            <p>&copy; 2023 Sobha Realty. All Rights Reserved. | Designed with <i class="fas fa-heart" style="color:#c19b76;"></i> for premium living</p>
        </div>
    </footer>
    `
    shadow.innerHTML = html;
  }

  disconnectedCallback(){

  }
}

// register component
customElements.define('footer-component', CustomFooter);