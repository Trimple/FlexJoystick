# FlexJoystick
**FlexJoystick** is a plain JavaScript ES6 class that is used to add interactable joysticks to the websites.

The class supports 3 types of joysticks:
1. Classic round Joysticks;
2. Wide joysticks;
3. Long joysticks;

This is the default Joysticks design you can expect (it can be changed using JS):

<p align="center">
<img src="https://github.com/Trimple/FlexJoystick/blob/main/images/defaultJoysticksDesignExample.jpg" alt="default design" width="60%">
</p>

You can play around with live examples [here](https://trimple.github.io/FlexJoystick/).

This project is open to use and improve by anyone.

## How to use
### Add joystick to the web page

To do that you need to have a div object that will be a parent to the joystick. These lines will add the joysticks visuals to the page:
```js
    let joystick = new FlexJoystick("parentDivName");
```
This will draw the joystick on the screen. **Joystick will inherit dimensions of the parent** object so don't forget to specify desired height and width when creating a parent div. Joystick type will be chosen automatically based on the parent dimensions.


<details "><summary><b>How joystick type is determined</b></summary>
<div style="background:#F8F8F8;margin-top:5px;">

If div's **height is bigger than width more than 1.4** times you will have a **"long"** joystick, if **opposite is true** you will have a **"wide"** one. **In all other cases** you will have a **"round"** joystick. **"Round"** Joystick will have the diameter equal to the smallest of parent dimensions and will be centered vertically and horizontally in the parent object.
</div>
</details><p></p>

### Enable mouse interactions

At this point joystick is a static object. To make it work as intended you will need to add event handlers.

<details "><summary><b>How joystick event handlers work</b></summary>
<div style="background:#F8F8F8;margin-top:5px;">
Joystick Class provides 6 event handle methods:

- handleMouseDown(event);
- handleMouseMove(event);
- handleMouseUp(event, returnToCenter);
- handleTouchStart(event);
- handleTouchMove(event);
- handleTouchEnd(event, returnToCenter).

If joystick should handle mouse clicks you should enable first 3 handlers, if you need to work with touches - last 3. You can enable all 6 events at the same time if needed.

 To enable handler you should call **addEventListener** function for a particular event type and call corresponding method inside.

</div>
</details><p></p>

Here is the most basic example of mouse handling:

```js
document.getElementById("parentDivName").addEventListener("mousedown", function(event){
    joystick.handleMouseDown(event);
}, false);

document.addEventListener("mousemove", function(event){
    joystick.handleMouseMove(event);
}, false);

document.addEventListener("mouseup", function(event){
    joystick.handleMouseUp(event, true);
},false);
```

It is important to note that "mousedown" handler is registered only for tha parent object - when we click on the joystick. To other handlers are registered for the whole document, so that we can control the stick even when we are out of boundaries of the parent object.

At this point you have a fully functional basic joystick that works with mouse. But Joystick  still does not give you any type of data to work with.

### Read the coordinates from the Joystick




* multiple joysticks of different types can be used on the same page without interference;
* the type of the joystick is automatically determined by the size of the holding container;
* both touch and mouse events are supported;
* event listeners are specified by user which allows for a flexible control;
* joysticks size can be changed without page reload;
* joysticks design can be updated using JavaScript;
* by default stick returns to zero when not touched, but there is a flag to keep position;
* 5 different joystick coordinates are available to read at any given time:
  * local X coordinate;
  * local Y coordinate;
  * radius of trigger event (mouse click or touch) from the center of the joystick;
  * angle of the 
* there is a return to center animation for a stick that can be enabled by 3 lines of code.

<p align="center">
<img src="https://github.com/Trimple/FlexJoystick/blob/main/images/coordinateSystem.jpg" alt="coordinate system" width="60%">
</p>





### How to add joystick to the page

### How to enable the basic joystick controls

### How to change joystick design

### How to animate return to zero

###

## How it works

## How to contribute 

