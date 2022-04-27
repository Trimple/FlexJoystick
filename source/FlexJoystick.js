class FlexJoystick {
    #parentId;

    #parentObject;
    outlineObject;
    stickObject;

    #internalRadius;
    #externalRadius;

    #joystickType;

    #width;
    #height;


    constructor(parentId) {
        this.#parentId = parentId;
        this.#parentObject = document.getElementById(parentId);
        if (this.#parentObject.tagName != "DIV") {
            return;
        }

        this.#createOutlineObject();

        this.#createStickObject();
    }

    #createOutlineObject() {
        this.outlineObject = document.createElement("div");
        // this.outlineObject.style.opacity = "50%"
        this.outlineObject.style.position = "relative";
        this.outlineObject.style.margin = "auto";
        this.outlineObject.style.left = "0px";

        this.updateObjectDimensions();

        this.outlineObject.style.borderRadius = "100px";
        // this.outlineObject.style.background = "red";
        this.outlineObject.style.border = "2px solid"

        this.#parentObject.appendChild(this.outlineObject);
    }

    #createStickObject() {

    }

    #evaluateJoystickType() {
        this.#width = this.#parentObject.clientWidth;
        this.#height = this.#parentObject.clientHeight;

        if (this.#parentObject.clientWidth / this.#parentObject.clientHeight > 1.4) {
            this.#joystickType = "wide";
        }
        else if (this.#parentObject.clientHeight / this.#parentObject.clientWidth > 1.4) {
            this.#joystickType = "long";
        }
        else {
            this.#width = Math.min(this.#parentObject.clientWidth, this.#parentObject.clientHeight);
            this.#height = this.#width;
            this.#joystickType = "round";
        }
    }

    updateObjectDimensions() {
        this.#evaluateJoystickType();
        this.outlineObject.style.top = (this.#parentObject.clientHeight - this.#height) / 2 + 'px';

        this.outlineObject.style.width = this.#width + 'px';
        this.outlineObject.style.height = this.#height + 'px';
    }

}