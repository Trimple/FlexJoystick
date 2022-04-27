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
    #currentAngle;
    #currentRadius;

    #parentWidth;
    #parentHeight;
    #outlineWidth;
    #outlineHeight;
    #stickWidth;
    #stickHeight;
    #heightOffset;
    #widthOffset;

    #animationId = -1;
    #animationStep = 0.15;
    #animationFrames = 0;

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

        this.updateObjectDimensions();

        this.#outlineObject.style.borderRadius = "100px";
        this.#outlineObject.style.border = "2px solid"
    }

    updateObjectDimensions() {
        this.#evaluateJoystickType();
        // center round border in case of rectangular Parent
        this.#outlineObject.style.top = this.#heightOffset + 'px';
        this.#outlineObject.style.left = this.#widthOffset + 'px';

        this.#centerX = this.#parentWidth / 2;
        this.#centerY = this.#parentHeight / 2;

        this.#outlineObject.style.width = this.#outlineWidth  + 'px';
        this.#outlineObject.style.height = this.#outlineHeight + 'px';
    }

    #evaluateJoystickType() {
        this.#parentWidth = this.#parentObject.clientWidth;
        this.#parentHeight = this.#parentObject.clientHeight;

        this.#outlineWidth = this.#parentWidth;
        this.#outlineHeight = this.#parentHeight;

        
        if (this.#parentWidth / this.#parentHeight > 1.4) {
            this.#joystickType = "wide";
        }
        else if (this.#parentHeight / this.#parentWidth > 1.4) {
            this.#joystickType = "long";
        }
        else {
            this.#joystickType = "round";
            this.#outlineWidth = Math.min(this.#parentWidth, this.#parentHeight);
            this.#outlineHeight = this.#outlineWidth;
        }

        this.#widthOffset = (this.#parentWidth - this.#outlineWidth) / 2;
        this.#heightOffset = (this.#parentHeight - this.#outlineHeight) / 2;
    }

    #createStickObject() {
        this.#stickObject = document.createElement("div");
        this.#stickObject.id = this.#parentObject.id + "Stick";
        this.#parentObject.appendChild(this.#stickObject);

        this.#stickObject.style.position = "absolute";
        if (this.#joystickType === "round") {
            this.#stickObject.style.width = Math.min(this.#outlineWidth, this.#outlineHeight) * this.#stickSizeFactor + "px";
            this.#stickObject.style.height = this.#stickObject.clientWidth + "px";
        } else {
            this.#stickObject.style.width = Math.min(this.#outlineWidth, this.#outlineHeight) * this.#stickSizeFactor * 2 + "px";
            this.#stickObject.style.height = this.#stickObject.clientWidth + "px";
        }

        this.#updateStickDimensions();

        this.#stickObject.style.borderRadius = "100px";
        this.#stickObject.style.background = "red";

        this.#moveStick(this.#centerX, this.#centerY);
    }

    #updateStickDimensions() {
        this.#stickWidth = this.#stickObject.clientWidth;
        this.#stickHeight = this.#stickObject.clientHeight;
    }

    #moveStick(targetX, targetY) {
        this.#currentX = targetX - this.#stickHeight / 2;
        this.#currentY = targetY - this.#stickWidth / 2;

        this.#stickObject.style.left = this.#currentX + "px";
        this.#stickObject.style.top = this.#currentY + "px";
    }

    #moveWide(targetX, targetY) {
        // if (targetX > this.#parentObject.clientWidth - this.#stickWidth / 2) {
        //     targetX = this.#parentObject.clientWidth - this.#stickWidth / 2;
        // }
        // else if (targetX < this.#stickWidth / 2) {
        //     targetX = this.#stickWidth / 2;
        // }
        // targetY = this.#height / 2;

        // this.#moveStick(targetX, targetY);

        // // this.#stickObject.style.left = targetX - this.#stickWidth/2 + "px";
        // // this.#stickObject.style.top = targetY - this.#stickHeight/2 + "px";
    }

    #moveLong(targetX, targetY) {

    }

    #moveRound(targetX, targetY) {
        this.#currentAngle = Math.atan2(-1 *( targetY - this.#centerY), targetX - this.#centerX) / (Math.PI) * 180 ;
        if(this.#currentAngle < 0)
        {
            this.#currentAngle += 360;
        }

        this.#currentRadius = Math.sqrt(Math.pow(targetY - this.#centerY ,2) + Math.pow(targetX - this.#centerX,2)) / ((this.#outlineWidth - this.#stickWidth)/2);

        if(this.#currentRadius > 1)
        {
            let angle = this.#currentAngle;
            if(angle > 180)
            {
                angle -= 360;
            }
            targetX = Math.cos(angle / 180 * Math.PI)*((this.#outlineWidth - this.#stickWidth)/2) + this.#centerX;
            targetY = -1*(Math.sin(angle / 180 * Math.PI)*((this.#outlineHeight - this.#stickHeight)/2)) + this.#centerY;
        }

        this.#moveStick(targetX, targetY);
    }

    handleMouseDown(event) {
        this.#isPressed = true;

        let clickX = event.pageX - this.#parentObject.offsetLeft;
        let clickY = event.pageY - this.#parentObject.offsetTop;

        if (this.#joystickType === "long") {
            this.#moveLong(clickX, clickY);
        }
        else if (this.#joystickType === "wide") {
            this.#moveWide(clickX, clickY);
        }
        else {
            this.#moveRound(clickX, clickY);
        }
    }

    handleMouseMove(event) {
        if (this.#isPressed === false) {
            return;
        }

        let clickX = event.pageX - this.#parentObject.offsetLeft;
        let clickY = event.pageY - this.#parentObject.offsetTop;

        if (this.#joystickType === "long") {
            this.#moveLong(clickX, clickY);
        }
        else if (this.#joystickType === "wide") {
            this.#moveWide(clickX, clickY);
        }
        else {
            this.#moveRound(clickX, clickY)
        }
    }

    handleMouseUp(event) {
        if (this.#isPressed === false) {
            return;
        }
        this.#isPressed = false;

        this.#moveStick(this.#centerX, this.#centerY);
    }

    enableAnimation(animationId) {
        this.#animationId = animationId;
        this.#animationFrames = 50;
    }

    handleAnimation() {
        if (this.#animationId === -1) {
            return;
        }

        if (this.#animationFrames === 0) {
            this.#moveStick(this.#centerX, this.#centerY);
        }
        else {
            this.#animationFrames -= 1;
            
        }


    }



    handleTouchStart(event) {

    }

    handleTouchMove(event) {

    }

    handleTouchEnd(event) {

    }

    getStickX() {
        return this.#currentX + this.#stickWidth / 2 - this.#parentWidth / 2;
    }

    getStickY() {
        return this.#currentY + this.#stickHeight / 2 - this.#parentHeight / 2;
    }

    getStickAngle() {
        return this.#currentAngle;
    }

    getStickRadius() {
        return this.#currentRadius;
    }

}