export default class Alert {
    constructor(filePath) {
        this.filePath = filePath;
        this.data = null;
        this.loadData();
    }

    async loadData() {
        try {
            const response = await fetch(this.filePath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.data = await response.json();
            console.log("Alert Class Data:");
            console.log(this.data);
        } catch (error) {
            console.error("Failed to load JSON data:", error);
            this.data = {};
        }

        if (this.data && this.data.messages) {
            const sectionElement = document.createElement('section');
            sectionElement.classList.add('alert-list');
            createElement(this.data.messages, sectionElement);

            const main = document.querySelector('main');
            if (main) {
                main.prepend(sectionElement);
            } else {
                console.warn("<main> element not found. Appending to body as fallback.");
                document.body.prepend(sectionElement);
            }
        }
    }
}

function createElement(messages, sectionElement) {
    console.log("Creating Element");

    for (const key in messages) {
        if (messages.hasOwnProperty(key)) {
            const message = messages[key];

            const messageLine = document.createElement('p');
            messageLine.innerText = message.template || "No template text";
            messageLine.style.background = message.background || "lightgray";
            messageLine.style.color = message.color || "black";

            sectionElement.appendChild(messageLine);
        }
    }
}