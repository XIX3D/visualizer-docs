# Embedding the Visualizer

**File 1: Using the iFrame in a React Project**  
**[View diagrams](#general-flow)**  

---

# Integrating the Visualizer iFrame in React  

This tutorial covers how to embed and manage a dynamic visualizer iFrame in a React application, including communication setup and performance optimizations.  

---

## 1. Project Setup  

### Dependencies  
Install `papaparse` for parsing data (colors, vehicles):  
```bash
npm install papaparse
```  

### File Structure  
Ensure your project includes these files (download from [GitHub](https://github.com/AamirMoBad/web-visualizer-2)):  
```plaintext
src/
├── components/
│   └── Iframe.jsx          # iFrame wrapper component
├── context/
│   └── iframeContext.js    # Communication logic
└── App.js                  # Context providers setup
```

---

## 2. iFrame Component  

### Key Props and Logic  
Use the `Iframe.jsx` component to embed the visualizer. Critical props:  
- `isMobile`: Toggle mobile/desktop layouts.  
- `vehicleUUID`: Unique identifier for the 3D model.  
- `showLoadingMenu`: Controls overlay states.  

**Code Implementation**:  
```javascript
// Iframe.jsx (simplified)
export function Iframe({ isMobile, vehicleUUID, showLoadingMenu }) {
  return (
    <iframe
      src={`${process.env.REACT_APP_VISUALIZER_URL}/?vehicle=${vehicleUUID}`}
      className="iframe-content"
      sandbox="allow-scripts allow-same-origin allow-pointer-lock"
      title="Wraps Visualizer"
    />
  );
}
```  

> **Important**: Memoize the component to prevent unnecessary re-renders that reset the iframe state.  

---

## 3. Context Setup  

### iframeContext.js  
This context provides the iframe reference and a `sendCommand` function to dispatch actions to the visualizer.  

```javascript
// iframeContext.js
export function IframeProvider({ children }) {
  const ref = useRef(null);

  const sendCommand = (command) => {
    ref.current.contentWindow.postMessage(
      command,
      process.env.REACT_APP_VISUALIZER_URL
    );
  };

  return (
    <IframeContext.Provider value={{ iframe: ref, sendCommand }}>
      {children}
    </IframeContext.Provider>
  );
}
```  

### App.js Configuration  
Wrap your app with the context providers:  
```javascript
// App.js
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
```  

---

## 4. Sending Commands  

Use `sendCommand` to trigger visualizer actions:  
```javascript
// Example: Changing car color
const { sendCommand } = useIframe();

const handleColorChange = (colorUUID) => {
  sendCommand({
    type: "Paint",
    UUID: colorUUID,
  });
};
```  

**Supported Commands**:  
- `Paint`: Apply a color/vinyl.  
- `Zoom`: Adjust camera zoom.  
- `Vehicle`: Switch 3D models.  
- Full list in [commands workflow](#commands-workflow).  

---

## 5. Performance Tips  
- Avoid re-rendering the iFrame by memoizing props.  
- Use `useRef` to persist the iframe reference across renders.  
- Preload vehicle data using `getCars.js` utility.  

---

![General Flow Diagram](/svg/general-flow.svg)  
*Fig 1. High-level communication flow between components*  

---
