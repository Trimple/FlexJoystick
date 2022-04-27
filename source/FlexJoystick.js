class FlexJoystick {
    #parentObject;
    #outlineObject;
    #stickObject;

    #stickSizeFactor = 0.4;
    #joystickType;

    #centerX;
    #centerY;

    #currentX;
    #currentY;

    #width;
    #height;
    #stickWidth;
    #stickHeight;

    #isPressed = false;
    #touchId = -1;

    constructor(parentId) {
        this.#parentObject = document.getElementById(parentId);
        if (this.#parentObject.tagName != "DIV") {
            return;
        }

        

        this.#createOutlineObject();

        this.#createStickObject();
    }

    #createOutlineObject() {
        this.#outlineObject = document.createElement("div");
        this.#outlineObject.id = this.#parentObject.id + "Outline";
        this.#parentObject.appendChild(this.#outlineObject);

        this.#outlineObject.style.position = "absolute";
        this.#outlineObject.style.margin = "auto";

        this.updateObjectDimensions();

        this.#outlineObject.style.borderRadius = "100px";
        this.#outlineObject.style.border = "2px solid"

    }

    #createStickObject() {
        this.#stickObject = document.createElement("div");
        this.#stickObject.id = this.#parentObject.id + "Stick";
        this.#parentObject.appendChild(this.#stickObject);

        this.#stickObject.style.position = "absolute";
        if(this.#joystickType === "round")
        {
            this.#stickObject.style.width = Math.min(this.#width, this.#height) * this.#stickSizeFactor + "px";
            this.#stickObject.style.height = this.#stickObject.clientWidth + "px";
        }else{
            this.#stickObject.style.width = Math.min(this.#width, this.#height) * this.#stickSizeFactor*2 + "px";
            this.#stickObject.style.height = this.#stickObject.clientWidth + "px";
        }

        this.#updateStickDimensions();

        this.#stickObject.style.borderRadius = "100px";
        this.#stickObject.style.background = "red";
        
        this.#currentX = this.#centerX - this.#stickHeight/2;
        this.#currentY = this.#centerY - this.#stickWidth/2;

        this.#stickObject.style.left = this.#currentX + "px";
        this.#stickObject.style.top = this.#currentY + "px";
    }
    
    #updateStickDimensions()
    {
        this.#stickWidth = this.#stickObject.clientWidth;
        this.#stickHeight = this.#stickObject.clientHeight;
    }



    updateObjectDimensions() {
        this.#evaluateJoystickType();
        // center round border in case of rectangular Parent
        this.#outlineObject.style.top = (this.#parentObject.clientHeight - this.#height) / 2 + 'px';

        this.#outlineObject.style.width = this.#width + 'px';
        this.#outlineObject.style.height = this.#height + 'px';
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

    handleMouseDown(event) {
        this.#isPressed = true;
        let clickX = event.pageX - this.#parentObject.offsetLeft;
        let clickY = event.pageY - this.#parentObject.offsetTop;

        this.#stickObject.style.top = clickY - this.#stickHeight/2 + "px";
        this.#stickObject.style.left = clickX - this.#stickWidth/2 + "px";

    }

    handleMouseMove(event) {
        if(this.#isPressed === false)
        {
            return;
        }
        let clickX = event.pageX - this.#parentObject.offsetLeft;
        let clickY = event.pageY - this.#parentObject.offsetTop;

        if(clickX < this.#stickWidth/2)
        {
            clickX = this.#stickWidth/2;
        }
        if(clickX > this.#width - this.#stickWidth/2)
        {
            clickX = this.#width - this.#stickWidth/2;
        }

        if(clickY < this.#stickWidth/2)
        {
            clickY = this.#stickWidth/2;
        }
        if(clickY > this.#height - this.#stickHeight/2)
        {
            clickY = this.#height - this.#stickHeight/2;
        }

        this.#stickObject.style.top = clickY - this.#stickHeight/2 + "px";
        this.#stickObject.style.left = clickX - this.#stickWidth/2 + "px";
    }

    handleMouseUp(event) {
        if(this.#isPressed === false)
        {
            return;
        }
        this.#isPressed = false;

        this.#stickObject.style.left = this.#centerX - this.#stickWidth/2 + "px";
        this.#stickObject.style.top = this.#centerY - this.#stickHeight/2 + "px";
    }

    handleTouchStart(event) {

    }

    handleTouchMove(event) {

    }

    handleTouchEnd(event) {

    }

    getStickX() {
        return this.#centerX;
    }

    getStickY(){
        return this.#currentY;
    }
}