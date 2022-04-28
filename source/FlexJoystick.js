class FlexJoystick {
    #parentObject;
    #outlineObject;
    #stickObject;

    #returnCanceled;

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
    #animationStep = 0.1;
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

        this.#updateOutlineDimensions();

        this.#outlineObject.style.borderRadius = "100px";
        this.#outlineObject.style.background = "lightgrey";
        this.#outlineObject.style.opacity = "30%";
    }

    #updateOutlineDimensions() {
        this.#evaluateJoystickType();
        // center round border in case of rectangular Parent
        this.#outlineObject.style.top = this.#heightOffset + 'px';
        this.#outlineObject.style.left = this.#widthOffset + 'px';

        this.#centerX = this.#parentWidth / 2;
        this.#centerY = this.#parentHeight / 2;

        this.#outlineObject.style.width = this.#outlineWidth + 'px';
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
            this.#stickObject.style.width = Math.min(this.#outlineWidth, this.#outlineHeight) * 0.4 + "px";
            this.#stickObject.style.height = this.#stickObject.clientWidth + "px";
        } else {
            this.#stickObject.style.width = Math.min(this.#outlineWidth, this.#outlineHeight) * 0.8 + "px";
            this.#stickObject.style.height = this.#stickObject.clientWidth + "px";
        }

        this.#currentRadius = 0;
        this.#currentAngle = 0;

        this.#updateStickDimensions();

        this.#stickObject.style.borderRadius = "1000px";
        this.#stickObject.style.background = "grey";

        this.#moveStick(this.#centerX, this.#centerY);
    }

    #updateStickDimensions() {
        this.#stickWidth = this.#stickObject.clientWidth;
        this.#stickHeight = this.#stickObject.clientHeight;
    }

    #moveStick(targetX, targetY) {
        this.#currentX = targetX;
        this.#currentY = targetY;

        this.#stickObject.style.left = this.#currentX - this.#stickWidth / 2 + "px";
        this.#stickObject.style.top = this.#currentY - this.#stickHeight / 2 + "px";
    }

    #moveWide(targetX, targetY) {
        let beautyOffset = (this.#parentHeight - this.#stickWidth) / 2;

        this.#currentRadius = (targetX - this.#centerX) / ((this.#outlineWidth - this.#stickWidth - beautyOffset * 2) / 2);

        if (targetX > this.#parentWidth - this.#stickWidth / 2 - this.#widthOffset - beautyOffset) {
            targetX = this.#parentWidth - this.#stickWidth / 2 - this.#widthOffset - beautyOffset;
        }
        else if (targetX < this.#widthOffset + this.#stickWidth / 2 + beautyOffset) {
            targetX = this.#widthOffset + this.#stickWidth / 2 + beautyOffset;
        }

        targetY = this.#centerY;

        if (targetX < this.#centerX) {
            this.#currentAngle = 180;
        }
        else {
            this.#currentAngle = 0;
        }

        this.#moveStick(targetX, targetY);
    }

    #moveLong(targetX, targetY) {
        let beautyOffset = (this.#parentWidth - this.#stickHeight) / 2;

        this.#currentRadius = -1 * (targetY - this.#centerY) / ((this.#outlineHeight - this.#stickHeight - beautyOffset * 2) / 2);

        if (targetY > this.#parentHeight - this.#stickHeight / 2 - this.#heightOffset - beautyOffset) {
            targetY = this.#parentHeight - this.#stickHeight / 2 - this.#heightOffset - beautyOffset;
        }
        else if (targetY < this.#heightOffset + this.#stickHeight / 2 + beautyOffset) {
            targetY = this.#heightOffset + this.#stickHeight / 2 + beautyOffset;
        }

        targetX = this.#centerX;

        if (targetY < this.#centerY) {
            this.#currentAngle = 90;
        }
        else if (targetY > this.#centerY) {
            this.#currentAngle = 270;
        }
        else {
            this.#currentAngle = 0;
        }

        this.#moveStick(targetX, targetY);
    }

    #moveRound(targetX, targetY) {
        this.#currentAngle = Math.atan2(-1 * (targetY - this.#centerY), targetX - this.#centerX) / (Math.PI) * 180;
        if (this.#currentAngle < 0) {
            this.#currentAngle += 360;
        }

        this.#currentRadius = Math.sqrt(Math.pow(targetY - this.#centerY, 2) + Math.pow(targetX - this.#centerX, 2)) / ((this.#outlineWidth - this.#stickWidth) / 2);

        if (this.#currentRadius > 1) {
            let angle = this.#currentAngle;
            if (angle > 180) {
                angle -= 360;
            }
            targetX = Math.cos(angle / 180 * Math.PI) * ((this.#outlineWidth - this.#stickWidth) / 2) + this.#centerX;
            targetY = -1 * (Math.sin(angle / 180 * Math.PI) * ((this.#outlineHeight - this.#stickHeight) / 2)) + this.#centerY;
        }

        this.#moveStick(targetX, targetY);
    }

    updateJoystickDimensions()
    {
        this.#updateStickDimensions();

        this.#updateOutlineDimensions();

        this.#moveStick(this.#centerX, this.#centerY);
    }
    
    resetJOystickDimensions()
    {
        
        this.#moveStick(this.#centerX, this.#centerY);
    }


    handleMouseDown(event) {
        this.#isPressed = true;
        this.#returnCanceled = false;

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

        if (this.#animationId > 0) {
            clearInterval(this.#animationId);
            this.#animationId = -1;
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

    handleMouseUp(event, returnToCenter) {
        if (this.#isPressed === false) {
            return;
        }
        this.#isPressed = false;

        this.#returnCanceled = !returnToCenter;
        if(this.#returnCanceled === true)
        {
            return;
        }

        if (this.#animationFrames === 0) {
            if (this.#joystickType === "long") {
                this.#moveLong(this.#centerX, this.#centerY);
            }
            else if (this.#joystickType === "wide") {
                this.#moveWide(this.#centerX, this.#centerY);
            }
            else {
                this.#moveRound(this.#centerX, this.#centerY)
            }
        }
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
            clearInterval(this.#animationId);
        }
        else {
            this.#animationFrames -= 1;
            let targetX = this.#currentX + (this.#centerX - this.#currentX) * this.#animationStep;
            let targetY = this.#currentY + (this.#centerY - this.#currentY) * this.#animationStep;

            if (targetX > this.#centerX) {
                targetX = Math.floor(targetX);
            }
            else {
                targetX = Math.ceil(targetX);
            }
            if (targetY > this.#centerY) {
                targetY = Math.floor(targetY);
            }
            else {
                targetY = Math.ceil(targetY);
            }

            if (Math.abs(targetX - this.#centerX) < 1 && Math.abs(targetY - this.#centerY) < 1) {
                this.#animationFrames = 0;
                return;
            }


            if (this.#joystickType === "long") {
                this.#moveLong(targetX, targetY);
            }
            else if (this.#joystickType === "wide") {
                this.#moveWide(targetX, targetY);
            }
            else {
                this.#moveRound(targetX, targetY)
            }

        }
    }


    handleTouchStart(event) {

    }

    handleTouchMove(event) {

    }

    handleTouchEnd(event) {

    }

    getStickX() {
        if (this.#isPressed === false && this.#touchId === -1 && this.#returnCanceled === false) {
            return 0;
        }
        return this.#currentX - this.#parentWidth / 2;
    }

    getStickY() {
        if (this.#isPressed === false && this.#touchId === -1 && this.#returnCanceled === false) {
            return 0;
        }
        return -1 * (this.#currentY - this.#parentHeight / 2);
    }

    getStickAngle() {
        if (this.#isPressed === false && this.#touchId === -1 && this.#returnCanceled === false) {
            return 0;
        }
        return this.#currentAngle;
    }

    getStickRadius() {
        if (this.#isPressed === false && this.#touchId === -1 && this.#returnCanceled === false) {
            return 0;
        }
        return this.#currentRadius;
    }

}