class FlexJoystick {
    #parentObject;
    outlineObject;
    stickObject;

    #stickSizeFactor = 0.8;
    #internalRadius;
    #externalRadius;

    #joystickType;

    #centerX;
    #centerY;

    #width;
    #height;
    #stickWidth;
    #stickHeight;

    constructor(parentId) {
        this.#parentObject = document.getElementById(parentId);
        if (this.#parentObject.tagName != "DIV") {
            return;
        }

        

        this.#createOutlineObject();

        this.#createStickObject();
    }

    #createOutlineObject() {
        this.outlineObject = document.createElement("div");
        this.outlineObject.id = this.#parentObject.id + "Outline";
        this.outlineObject.style.position = "relative";
        this.outlineObject.style.margin = "auto";

        this.updateObjectDimensions();

        this.outlineObject.style.borderRadius = "100px";
        this.outlineObject.style.border = "2px solid"

        this.#parentObject.appendChild(this.outlineObject);
    }

    #createStickObject() {
        this.stickObject = document.createElement("div");
        this.stickObject.style.position = "absolute";
        this.stickObject.style.width = Math.min(this.#width, this.#height) * this.#stickSizeFactor;
        this.stickObject.style.height = this.stickObject.style.clientWidth;

        this.stickObject.style.background = "red";

        this.#updateStickDimensions();

        this.outlineObject.appendChild(this.stickObject);
    }
    
    #updateStickDimensions()
    {
        this.#stickWidth = this.stickObject.clientWidth;
        this.#stickHeight = this.stickObject.clientHeight;
    }



    updateObjectDimensions() {
        this.#evaluateJoystickType();
        // center round border in case of rectangular Parent
        this.outlineObject.style.top = (this.#parentObject.clientHeight - this.#height) / 2 + 'px';

        this.outlineObject.style.width = this.#width + 'px';
        this.outlineObject.style.height = this.#height + 'px';
        this.#centerX = this.#width/2;
        this.#centerY = this.#height/2;
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


}