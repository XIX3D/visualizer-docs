# Handling Events from the Visualizer iFrame

---

# Capturing and Responding to iFrame Events  

This tutorial explains how to listen for events from the visualizer iFrame (e.g., loading states, errors) and update your React UI dynamically.  

---

## 1. Event Listener Setup  

### useMessages Hook  
The `useMessages` hook (from `hooks/useMessages.js`) is the core of event handling. It attaches a `message` event listener to the window:  

```javascript
// Simplified example - Full code in colors.md
export function useMessages(vehicleUUID) {
  const [loadingState, setLoadingState] = useState("idle");
  
  useEffect(() => {
    const handleMessage = (event) => {
      const eventData = JSON.parse(event.data);
      
      // Handle loading events
      if (eventData.Type === "LoadingStarted") {
        setLoadingState("loading");
      }
      if (eventData.Type === "LoadingFinished") {
        setLoadingState("success");
      }
      if (eventData.Type === "LoadingFailed") {
        setLoadingState("error");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return { loadingState };
}
```  

---

## 2. Handling New Event Types  

### Loading States  
Events follow this structure:  
```javascript
// From new-events.md
{
  Type: "LoadingStarted" | "LoadingFinished" | "LoadingFailed",
  Value: "Error message (optional)"
}
```  

**Integration Example**:  
```javascript
// In your component
const { loadingState, error } = useMessages();

return (
  <div>
    {loadingState === "loading" && <Spinner />}
    {loadingState === "error" && <ErrorBanner message={error} />}
  </div>
);
```  

### WrapCar Event  
Trigger the visualizer’s wrap process by sending:  
```javascript
// From new-events.md
sendCommand({ type: "WrapCar" });
```  

---

## 3. UI Feedback Components  

### LoadingButton Implementation  
Use the `LoadingButton` component to reflect real-time states:  
```javascript
// From new-events.md
export function LoadingButton({ onClick, loading, text, error }) {
  return (
    <>
      {loading && <div className="loader" />}
      {error && <div className="error">{error}</div>}
      <button onClick={onClick} disabled={loading}>
        {text}
      </button>
    </>
  );
}

// Usage
<LoadingButton 
  onClick={() => sendCommand({ type: "WrapCar" })}
  loading={loadingState === "loading"}
  error={loadingState === "error"}
  text="Start Wrapping"
/>
```  

---

## 4. Error Handling  
Capture and display errors from `LoadingFailed` events:  
```javascript
// In useMessages.js
if (eventData.Type === "LoadingFailed") {
  console.error("Visualizer error:", eventData.Value);
  dispatchWrapper({ type: "SET_ERROR", payload: eventData.Value });
}
```  

---

![Event Workflow Diagram](/svg/events.svg)  
*Fig 2. Event communication sequence between app and iFrame*  

---
