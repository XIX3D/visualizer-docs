Essentially we want to make use of a context or some some sort of communication between
The visualizer and the UI section.

This is Achieved by using a context to send data and a hook to react with data

We use a context to maintain state of the application and `useMessage` hook to get
and sent from the visualizer events

### General Flow

![General Flow](/svg/general-flow.svg)
### User Interaction Loop


![User Interaction Flow](/svg/user-flow.svg)

### Usage Guide

To use the visualizer tools there's a series of required and recommended steps to get
the tool going.

For this I'm going to separate the entire components into different usage sections:

- **Layout and User Interaction**: Small Tutorial on which and what files to use  to recreate the visualizer as we have it on the test site
- **Logic and Communication** (A General summary on how the communication system works),

**[Layout and User Interaction](#layout-and-user-interaction)**

1. [#Setup the visualizer communication tools](#setup-the-visualizer-communication-tools)
	1. [Index.js](#Index.js)
	2. [App.js](#App.js)
	3. [Dependencies](#Dependencies)
	
**[#Logic and Communication](#logic-and-communication)**

1. [#Setup an iFrame component to hold the iframe](#setup-an-iframe-component-to-hold-the-iframe)
2. [#Add an iframe context to hold the communication tool between client -> iframe](#add-an-iframe-context-to-hold-the-communication-tool-between-client-->-iframe)
3. [#Setup a hook to interact with the different events from the iframe on the client](#setup-a-hook-to-interact-with-the-different-events-from-the-iframe-on-the-client)

### Layout and User Interaction

#### Setup the visualizer communication tools

**Disclaimer: This part of the tutorial will assume the following setup is present on your system. All the files should be identical except for:** 
- Index.js
- App.js

To get All the following files you can download them via:
- [GitHub]([https://github.com/AamirMoBad/web-visualizer-2](https://github.com/AamirMoBad/web-visualizer-2/tree/main/src))
- Or directly download the zip file

```javascript
src:
	- App.js
	- index.js
	- assets:
		- All assets
	- components:
		- footer-tabs:
			- All footer tabs
		- visualizer-states:
			- Loading.jsx
		- FloatingFeatures.jsx
		- FooterVisualizer.jsx
		- Iframe.jsx
		- Navbar.jsx
		- ButtonIconRounded.jsx
		- ZoomControls.jsx
		- ColorPicker.jsx
		- SelectedColor.jsx
		- TagChooser.jsx
	- context:
		- iframeContext.js
		- colorContext.js
		- wrapperContext.js
	- hooks:
		- mobileHook.js
		- useGetCar.js
		- useMessages.js
	- pages:
		- Visualizer.jsx
	- styles:
		- index.css
		- App.css
		- Visualizer.css
		- FloatingFeatures.css
		- FooterVisualizer.css
		- CheckoutTabComponent.css
	- utils:
		- getCars.js
		- formatPrice.js
		- getKpmfColors.js
		- getUUIDNumericValue.js
		- scrollLeft.js
```

##### Index.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```

##### App.js

```javascript
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import Visualizer from "./pages/Visualizer";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import { ColorProvider } from "context/colorContext";
import { WrapperProvider } from "context/wrapperContext";
import { IframeProvider } from "context/iframeContext";

function App() {
  return (
    <IframeProvider>
      <ColorProvider>
        <WrapperProvider>
          <Router>
            <Routes>
              <Route path="/visualizer" element={<Visualizer />} />
            </Routes>
          </Router>
        </WrapperProvider>
      </ColorProvider>
    </IframeProvider>
  );
}

export default App;
```

##### Dependencies

Install the following dependencies to parse the different csv files (Mostly for colors and cars)

```sh
npm install papaparse
```

### Logic and Communication

This is a general summary on how we are doing the communication between the
visualizer and the client code

#### Schemas

**Commands Workflow**

![[Commands]](/svg/commands.svg)

**Events Workflow**

![[Events]](/svg/events.svg)
#### Setup an iFrame component to hold the iframe 

The iFrame component should be straightforward and should only contain a couple
props to prevent it from re-rendering every time something changes

**IMPORTANT: If the iframe re-renders it'll reset all the selection but if you memoise it that could also prevent it from working correctly**

##### Code Snippet

```javascript
import { FloatingFeatures } from "./FloatingFeatures"; // Wrapper picker and checkout controls
import { ZoomControls } from "./ZoomControls"; // Overlay controls (Zoom, fullscreen, etc)

export function Iframe({isMobile, iframe, menuIsOpen, showLoadingMenu, vehicleUUID, firstView}) {
  const showUI = ( !firstView && !showLoadingMenu );
  return (
    isMobile 
      ? (
        <iframe
          ref={iframe}
          id="visualizer-iframe"
          className={`iframe-content ${
            isMobile ? "mobile-view" : "desktop-view"
          } ${
            menuIsOpen ? "menu-open" : ""
          } ${
            showLoadingMenu ? "loading-menu-open" : ""
          }`}
          src={`${process.env.REACT_APP_VISUALIZER_URL}/?vehicle=${vehicleUUID}`}
          allow="fullscreen"
          allowfullscreen
          sandbox="allow-scripts allow-same-origin allow-pointer-lock"
          title="Wraps Visualizer"
        ></iframe>
      ) : (
        <div className="iframe-container-wrapper">
          { showUI && <ZoomControls /> }
          <iframe
            ref={iframe}
            id="visualizer-iframe"
            className={`iframe-content ${
              isMobile ? "mobile-view" : "desktop-view"
            } ${
              menuIsOpen ? "menu-open" : ""
            } ${
              showLoadingMenu ? "loading-menu-open" : ""
            }`}
            src={`${process.env.REACT_APP_VISUALIZER_URL}/?vehicle=${vehicleUUID}`}
            allow="fullscreen"
            allowfullscreen
            sandbox="allow-scripts allow-same-origin allow-pointer-lock"
            title="Wraps Visualizer"
          ></iframe>
          { showUI && <FloatingFeatures /> }
        </div>
      )
  ) 

}
```

**Things to keep in mind:**
- `isMobile` mobile hook to make sure we are either on a desktop or a mobile screen
- `iframe` iframe reference to keep consistent with the iframe
- `menuIsOpen` use to change iframe's size
- `showUI` used to check if the overlay UI is visible yet (Loading screen)
- `showLoadingMenu` similar to show UI, this is used to check if we need to show the loading screen or not


#### Add an iframe context to hold the communication tool between client -> iframe

The iframe context is used to provided the `iFrame` reference to use through all the 
application

This also expose the `sendCommand` function to call `postMessage` on the iframe

`sendCommand` is used to send any command from the [#Send Command Examples](#send-command-examples) list

```Javascript
const { createContext, useContext, useRef } = require("react");

const IframeContext = createContext();

export function useIframe() {
  return useContext(IframeContext);
}

export function IframeProvider({ children }) {
  const ref = useRef(null);

  return (
    <IframeContext.Provider value={{
      iframe: ref,
      sendCommand: (command) => {
        ref.current.contentWindow.postMessage(command, process.env.REACT_APP_VISUALIZER_URL);
      }
    }}>
        {children}
    </IframeContext.Provider>
  );
}
```

##### Send Command Examples

Change Color

```javascript
  import { useIframe } from 'iframeContext.ts';
  const { sendCommand } = useIframe();

  const handleColorSelected = (newColor) => {
    sendCommand({
      type: 'Paint',
      UUID: newColor.id,
    });
```

Available Commands

```javascript
// change oem (ford) vinyl, car should exists
{
  "type": "Paint",
  "UUID": <number>
}

// zooms in or out
{
  "type": "Zoom",
  "Amount": <number>
}

// toggle cinematics in car, car should exists
{
  "type": "ToggleCinematic",
  "Toggle": <true|false>
}

// toggle door animations in car, car should exists
{
  "type": "ToggleAnimation",
  "Toggle": <true|false>
}

// will send a response with the current car status
// for this to work the car needs to call first 'paint' and 'vinyl' at least once before
{
  "type": "Checkout"
}

// changes car
{
  "type": "Vehicle",
  "UUID": <number>
}
 
// changes kpmf vinyl, car should exists
{
  "type": "Vinyl",
  "UUID": <number>
}

======================
send from the visualizer
======================

// sent when the car have been spawned, can be launch multiple times same session if the car is change
{
  "type": "CarSpawned"
}

// when you request a 'checkout' event visualizer responds with this
{
  "vinyl_name": str,
  "vinyl_price": int,
  "vinyl_type": str,
  "oem_paint": str
}
```

#### Setup a hook to interact with the different events from the iframe on the client

To communicate back and forth with the iFrame, we need to setup a communication
channel.

This communication channel needs to act as 2 way communication bus

_The iframe sends events to the client with relevant information_
`iframe` -Events-> `Ford Client`

_The client sends commands to the iframe with actions to execute_
`Ford Client` -Commands-> `iframe`

To achieve this we created `useMessage` hook and `useIframe` context
(Change of Color, Change of Vinyl, Zoom in/out,  Full-screen)

And the `useMessage` hook to received data (With a clear exception to this rule)
(Car Spawned, Checkout Event, Loading state, Reset event)

We achieve this by creating a hook function to interact with the events raised by the iframe. 

```javascript
import { useColor, useDispatchColor } from "context/colorContext";
import { useIframe } from "context/iframeContext";
import { useDispatchWrapper } from "context/wrapperContext";
import { useEffect, useState } from "react";
import { getCars } from "uitils/getCars";

export function useMessages(vehicleUUID) {
  const [vehicle, setVehicle] = useState(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [carIsLoading, setCarIsLoading] = useState(true);
  const [showLoadingMenu, setShowLoadingMenu] = useState(false);
  const [firstView, setFirstView] = useState(true);

  const {sendCommand} = useIframe(); // Send Commands to the iframe
  const dispatchWrapper = useDispatchWrapper();
  const dispatchColor = useDispatchColor();
  const color = useColor();

  useEffect(() => {
    getCars().then((cars) => {
      const vehicle = cars.find((car) => car.UUID === vehicleUUID);
      setVehicle(vehicle);
    });

    // Reset vinyl and color data
    dispatchColor({ type: "SELECT_COLOR", payload: null });
    dispatchWrapper({ type: "SELECT_COLOR", payload: null });
  }, []);

  useEffect(() => {
    // This is the entry-point of the events listener
    const handleMessage = (event) => {
      if (event.origin !== process.env.REACT_APP_VISUALIZER_URL) return;

      const eventMessage = JSON.parse(event.data);

      if (eventMessage === undefined) {
        return;
      }

	  // Car appeared
      if(eventMessage.Type === "CarSpawned") {
        setCarIsLoading(false);
        setMenuIsOpen(true);

		// Car appeared and we already have a selected color
        if (color.selectedColor) {
          console.log("Painting " + color.selectedColor.id);
          sendCommand({
            type: 'Paint',
            UUID: color.selectedColor.id,
          });
        }

        return;
      }

	  // Checkout event
      if(eventMessage.vinyl_name) {
        checkoutEvent(eventMessage, dispatchWrapper);
        return;
      }

	  // Loading complete
      if(eventMessage.Type === "Launch") {
        setShowLoadingMenu(true);
        setFirstView(false);
        return;
      }

	  // Something happened and we need to restart (Error Handling)
      if(eventMessage.Type === "Reset") {
        console.log("Resetting");
        setShowLoadingMenu(false);
        setMenuIsOpen(false);
        setCarIsLoading(true);
        return;
      }

	  // New color selected
      if(eventMessage.Type === "ColorSelected") {
        setShowLoadingMenu(false);
        setCarIsLoading(false);
        setMenuIsOpen(true);
        return;
      }

    }
	// Receive events from the iFrame
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [color.selectedColor]);

  useEffect(() => {
    // This is needed to refresh the iframe when the menu is open
    if (menuIsOpen) {
      console.log("Menu is open");
    }
  }, [menuIsOpen]);

  return {
    vehicle,
    menuIsOpen,
    carIsLoading,
    setMenuIsOpen,
    showLoadingMenu,
    setShowLoadingMenu,
    firstView,
  };
}

/**
  * 
  * @param {Object} event 
  * @param {String} event.vinyl_name
  * @param {String} event.vinyl_price
  * @param {String} event.vinyl_type
  * @param {String} event.vehicle
 */
function checkoutEvent(event, dispatchWrapper) {
  if (!event) {
    return;
  }
  
  dispatchWrapper({
    type: "SELECT_PRICE",
    payload: event.vinyl_price,
  });

  localStorage.setItem("checkoutData", JSON.stringify(event));
}
```
