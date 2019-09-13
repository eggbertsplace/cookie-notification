class IgCookieNotification extends HTMLElement {
    constructor() {
        super();
        this._root = this.attachShadow({"mode": "open"});
        this._$button = null;
        this._cookieName = 'cookieBarHide';
        this._domain = 'localhost';
        console.log("ig-cookie-notification is constructed!");
    }

    connectedCallback() {
        if(this.checkForCookie() === -1) {
            this._root.innerHTML = `
                <style>
                #cookie-notice {
                    transition: all .8s;
                    background: #000;
                    opacity: .9;
                    overflow: hidden;
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    color: #fff;
                    box-sizing: border-box;
                    font-size: 12px;
                    z-index: 201;
                }
                #cookie-notice .wrap {
                    margin: 0 auto;
                    height: 100%;
                    padding: 3px 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                #cookie-notice p {
                    margin: 0;
                    padding: 5px;
                    display: inline-block;
                    line-height: 15px;
                    text-align: left;
                    color: #999;
                }
                #cookie-notice a {
                    color: #999;
                    text-decoration: underline;
                }
                
                #cookie-notice .button {
                    background-color: transparent;
                    border: solid #999 1px;
                    margin: 0 5px 0 5px;
                    padding: 0 20px;
                    color: #999;
                    display: inline-block;
                    text-align: center;
                    line-height: 20px;
                    white-space: nowrap;
                    cursor: pointer;
                }
                
                </style>
                <div id="cookie-notice">
                    <div class="wrap">
                        <p>
                          This game follows our <a href="https://localhost" target="_blank">Privacy Policy</a>.
                          We use cookies to ensure you get the best experience. This also includes third-party services.<br>
                        </p>
                        <span id="cookie-notice-okay" class="button">Okay</span>
                    </div>
                </div>
            `;
            this._$button = this._root.querySelector("#cookie-notice-okay");

            this._$button.addEventListener("click", (event) => {
                this.writeCookie();
                this.hideCookieNotification();
            });

            console.log("ig-cookie-notification added to the DOM!");
        }
    }

    hideCookieNotification() {
        var elem = document.querySelector('ig-cookie-notification');
        elem.parentNode.removeChild(elem);
        console.log("hideCookieNotification called");
    }

    checkForCookie() {
        return document.cookie.indexOf(this._cookieName + '=');
    }

    writeCookie() {
        const domain = 'localhost';
        document.cookie = this._cookieName + "=true; max-age=31536000; "+ domain;
    }

    static get observedAttributes() {
        return ["demo"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log("Attribute changed!", name, oldValue, newValue);
    }

    disconnectedCallback() {
        console.log("ig-cookie-notification removed from the DOM!");
    }
}

window.customElements.define('ig-cookie-notification', IgCookieNotification);