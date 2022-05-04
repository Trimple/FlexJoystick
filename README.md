# FlexJoystick
**FlexJoystick** is a plain JavaScript ES6 class that is used to add interactable joysticks to the websites.

<details "><summary><b>What FlexJoystick is capable of</b></summary>
<div style="background:#F8F8F8;margin-top:5px;margin-left:1em;">

* 3 types of joysticks:
  1. Classic round Joysticks;
  2. Wide joysticks;
  3. Long joysticks;
* the type of joystick is determined automatically based on the parent container dimensions;
* multiple joysticks of different types can be used on the same page without interference;
* the type of the joystick is automatically determined by the size of the holding container;
* both touch and mouse events are supported;
* event listeners are specified by user which allows for a flexible control;
* joysticks size can be changed without page reload;
* joysticks design can be updated using JavaScript;
* by default stick returns to zero when not touched, but there is a flag to keep position;
* 4 different joystick coordinates are available to read at any given time:
  * X coordinate of the center of the stick;
  * Y coordinate of the center of the stick;
  * radius of trigger event position (mouse click or touch) from the center of the joystick;
  * radius angle;
* current stick direction can be read in a couple of different direction modes;
* programmable activation threshold prevents false direction signals on touch events; 
* there is a "return to center" animation for a stick that can be enabled by 3 lines of code.
</div>
</details><p></p>

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
<div style="background:#F8F8F8;margin-top:5px;margin-left:1em;">

If div's **height is bigger than width more than 1.4** times you will have a **"long"** joystick, if **opposite is true** you will have a **"wide"** one. **In all other cases** you will have a **"round"** joystick. **"Round"** Joystick will have the diameter equal to the smallest of parent dimensions and will be centered vertically and horizontally in the parent object.
</div>
</details><p></p>

### Enable mouse interactions

At this point joystick is a static object. To make it work as intended you will need to add event handlers.

<details "><summary><b>How joystick event handlers work</b></summary>
<div style="background:#F8F8F8;margin-top:5px;margin-left:1em;">

**Joystick Class** provides 6 event handle methods:

- handleMouseDown(event);
- handleMouseMove(event);
- handleMouseUp(event, returnToCenter);
- handleTouchStart(event);
- handleTouchMove(event);
- handleTouchEnd(event, returnToCenter).

If joystick need to handle mouse clicks you should enable first 3 handlers, if you need to work with touches - last 3. You can enable all 6 events at the same time if needed.

To enable handler you should call **addEventListener** function for a particular event type and call corresponding method inside. After that joystick should start working as intended.

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

It is **important to note that "mousedown" handler is registered only for tha parent object** - when we click on the joystick. To other handlers are registered for the whole document, so that we can control the stick even when we are out of boundaries of the parent object. If needed handlers can be registered for a different objects.

At this point you have a fully functional basic joystick that works with mouse. But it still doesn't give you any type of data to work with.

### Read the coordinates from the Joystick

Joystick coordinate system starts from the center of the parent object and has 4 different coordinates:
1. **X coordinate** of the center of the stick **in pixels**;
2. **Y coordinate** of the center of the stick **in pixels**;
3. **radius to the event source position** (mouse click or touch) from the center of coordinate system. It has **normalized value** - equal to 0 when stick is in the center, 1.0 when stick touches the border and higher than 1 when event source is outside of the parent object;
4. **radius angle** from **0 to 360 degrees**.

Visual representation of the coordinates:

<p align="center">
<img src="https://github.com/Trimple/FlexJoystick/blob/main/images/coordinateSystem.jpg" alt="coordinate system" width="60%">
</p>

**FlexJoystick class** provides methods to get all 4 coordinates:
```js
let currentX = joystick.getStickX();
let currentY = joystick.getStickY();
let currentRadius = joystick.getStickRadius();
let currentAngle = joystick.getStickAngle();
```
There is also a **getDirection(directionConfiguration)** method that returns current joystick direction as a string.

<details "><summary><b>Possible getDirection return values</b></summary>
<div style="background:#F8F8F8;margin-top:5px;margin-left:1em;">

- **С** - center (radius below the activation threshold);
- **U** - up;
- **UR** - up and right;
- **R** - right;
- **DR** - down and right;
- **D** - down;
- **DL** - down and left;
- **L** - left;
- **UL** - up and left;

</div>
</details><p></p>

FlexJoystick has a **direction activation threshold** - radius of the event below which joystick is believed to be in the center. This is useful for virtual joysticks because pointer can't be placed directly into the center of the object which sometimes triggers wrong direction read.

Default value of the activation threshold is 0.4. It can be updated in range of 0 to 1 with corresponding method:

```js
joystick.setActivationThreshold(newValue);
```

When called on the **"long"** object getDirection method will return either **"U"**, **"D"** or **"C"** independent on the parameter value.

When called on the **"wide"** object getDirection method will return either **"L"**, **"R"** or **"C"** independent on the parameter value.

There is a couple of options for the **directionConfiguration** parameter when method is called for the **"round"** joystick:


<p align="center">
<img src="https://github.com/Trimple/FlexJoystick/blob/main/images/directionConfiguration_8_4.jpg" alt="directionConfiguration_8_4" width="60%">
</p>

<p align="center">
<img src="https://github.com/Trimple/FlexJoystick/blob/main/images/directionConfiguration_2_2.jpg" alt="directionConfiguration_2_2" width="60%">
</p>

The default mode for round joystick is 8 directions.

### Disable content selection while holding the Joystick 


### Enable touch interactions


### Enable "return to center" animation


### Change Joystick design


## How it works

## How to contribute 

