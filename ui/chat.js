class ChatView extends ResponsiveElement {
    constructor() { super(); }
    connectedCallback() {
        this.theme = this.parentNode.theme;
        this.style.display = "flex";
        this.style.flexDirection = 'column';
        let top = this.getBoundingClientRect().top + window.scrollY;
        let height = window.innerHeight - top;
        this.style.height = height + 'px';
    }
}

class ScrollMessages extends ResponsiveElement {
    constructor() { super(); }
    connectedCallback() {
        this.theme = this.parentNode.theme;
        this.style.flex = '2';
        this.style.overflow = 'auto';
        this.style.display = 'flex';
        this.style.flexDirection = 'column';
    }
}

class MessageContainer extends CustomElement {
    constructor() { super(); }
    connectedCallback() {
        this.theme = this.parentNode.theme;
        this.style.width = "98%";
        this.style.maxWidth = "100%";
        this.style.borderBottom = "0.5pt solid rgba(50, 50, 50, 0.3)";
        this.style.padding = "1%";

        let messageHead = document.createElement('div');
        messageHead.style.width = '100%';
        messageHead.style.display = 'block';
        messageHead.style.marginBottom = '0.5em';

        let authorDisp = document.createElement('span');
        authorDisp.style.fontSize = '1.5em';
        let author = this.getAttribute('author');
        authorDisp.innerHTML = author;
        messageHead.appendChild(authorDisp);

        let timeDisp = document.createElement('span');
        timeDisp.style.margin = '2pt';
        timeDisp.style.fontSize = '0.9em';
        // timeDisp.style.margin = 'auto';
        // timeDisp.style.float = 'right';
        let time = this.getAttribute('time');
        timeDisp.innerHTML = time;
        messageHead.appendChild(timeDisp);

        this.appendChild(messageHead);
    }
}

// class MessageSent extends MessageContainer {
//     constructor() { super(); }
//     connectedCallback() {
//         this.theme = this.parentNode.theme;
//         this.style.float = 'right';
//         this.style.minWidth = '40%';
//         this.style.minHeight = '25pt';
//         this.style.marginTop = this.style.marginBottom = '0.5em';
//         this.style.padding = '1.5em';
//         this.style.fontSize = '1em';
//         this.style.borderRadius = '5pt 5pt 0pt 5pt';
//         this.style.background = this.theme.primaryVariant;
//         this.style.color = this.theme.onSurface;

//         let messageHead = document.createElement('div');
//         messageHead.style.width = '100%';
//         messageHead.style.display = 'block';
//         messageHead.style.marginBottom = '1em';

//         let authorDisp = document.createElement('span');
//         authorDisp.style.fontSize = '1.5em';
//         let author = this.getAttribute('author');
//         authorDisp.innerHTML = author;
//         messageHead.appendChild(authorDisp);

//         let timeDisp = document.createElement('span');
//         timeDisp.style.margin = '0pt';
//         timeDisp.style.fontSize = '0.9em';
//         timeDisp.style.margin = 'auto';
//         timeDisp.style.float = 'right';
//         let time = this.getAttribute('time');
//         timeDisp.innerHTML = time;
//         messageHead.appendChild(timeDisp);

//         this.appendChild(messageHead);
//     }
// }

// class MessageReceived extends MessageContainer {
//     constructor() { super(); }
//     connectedCallback() {
//         this.theme = this.parentNode.theme;
//         this.style.float = 'left';
//         this.style.minWidth = '40%';
//         this.style.minHeight = '25pt';
//         this.style.marginTop = this.style.marginBottom = '0.5em';
//         this.style.padding = '1.5em';
//         this.style.borderRadius = '5pt 5pt 5pt 0pt';
//         this.style.background = this.theme.secondaryVariant;
//         this.style.color = this.theme.onSurface;

//         let messageHead = document.createElement('div');
//         messageHead.style.width = '100%';
//         messageHead.style.display = 'block';
//         messageHead.style.marginBottom = '1em';

//         let authorDisp = document.createElement('span');
//         authorDisp.style.margin = '0pt';
//         authorDisp.style.fontSize = '1.5em';
//         let author = this.getAttribute('author');
//         authorDisp.innerHTML = author;
//         messageHead.appendChild(authorDisp);

//         let timeDisp = document.createElement('span');
//         timeDisp.style.margin = '0pt';
//         timeDisp.style.fontSize = '0.9em';
//         timeDisp.style.margin = 'auto';
//         timeDisp.style.float = 'right';
//         let time = this.getAttribute('time');
//         timeDisp.innerHTML = time;
//         messageHead.appendChild(timeDisp);

//         this.appendChild(messageHead);
//     }
// }

class MessageEntry extends ResponsiveElement {
    constructor() { super(); }
    connectedCallback() {
        this.theme = this.parentNode.theme;
    }
}
class ChatBox extends CustomElement {
    constructor() { super(); }
    connectedCallback() {
        this.theme = this.parentNode.theme;
        this.style.width = "100%";
        this.style.maxWidth = "98%";
        this.style.paddingLeft = this.style.paddingRight = "1%";
        this.style.paddingTop = this.style.paddingBottom = "5pt";
        this.style.overflow = "auto";
        this.contentEditable = true;
        this.style.wordWrap = 'break-word';
        this.style.display = "inline-block";
        this.style.visible = true;
        this.style.justifyContent = 'center';
        this.style.border = '1pt solid ' + this.theme.onPrimary;
        this.addEventListener('keydown', function (evt) {
            if (evt.keyCode == 13 && evt.shiftKey) {
                evt.preventDefault ? evt.preventDefault() : (evt.defaultPrevented = true);
                if (this.innerHTML.length > 0)
                    this.dispatchEvent(new Event('submit'));
            }
            if (evt.keyCode == 9) {
                evt.preventDefault ? evt.preventDefault() : (evt.defaultPrevented = true);
            }
        });
        this.addEventListener('input', function (evt) {
            if (evt.keyCode == 9) {
                evt.data = ' ' * 2;
            }
        });
    }
}
customElements.define('message-container', MessageContainer);
// customElements.define('message-received', MessageReceived);
// customElements.define('message-sent', MessageSent);
customElements.define('chat-box', ChatBox);
customElements.define('message-entry', MessageEntry);
customElements.define('scroll-messages', ScrollMessages);
customElements.define('chat-view', ChatView);

/**ContactButton
 * Button for displaying the contact info, such as username or number, last text brief, and last seen.
 * 
 * @author Supratik Chatterjee
 */
class ContactButton extends ResponsiveElement {
    constructor() { super(); }
    connectedCallback() {
        this.theme = this.parentNode.theme;

    }
    disconnectedCallback() { }
    static get observedAttributes() { }
    attributeChangedCallback(name, before, after) { }
    toString() { return "[object ContactButton]"; }
}
customElements.define('button-contact', ContactButton);