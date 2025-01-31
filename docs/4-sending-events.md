# Data Flow and Communication Architecture

---

# Understanding the Visualizer’s Data Flow  

This tutorial explains the end-to-end communication architecture between the React app and the visualizer iFrame, including diagrams and workflow examples.  

---

## 1. Overview  

The system uses a **bidirectional communication model**:  
- **Commands**: Sent from React → iFrame (e.g., changing colors, zooming).  
- **Events**: Sent from iFrame → React (e.g., loading status, errors).  

![General Data Flow](/svg/general-flow.svg)  
*Fig 1. High-level interaction between components*  

---

## 2. Command Flow  

### How Commands Work  
1. **Trigger**: User interaction (e.g., selecting a color).  
2. **Dispatch**: `sendCommand` from `iframeContext` sends a JSON payload to the iFrame.  
3. **Execution**: iFrame processes the command (e.g., applies a vinyl).  

**Command Structure**:  
```javascript
// Example: Change vehicle
{
  type: "Vehicle",
  UUID: 12345 // Unique ID for the 3D model
}
```  

### Command Workflow Diagram  
![Command Workflow](/svg/commands.svg)  
*Fig 2. Command execution sequence*  

---

## 3. Event Flow  

### How Events Work  
1. **Trigger**: iFrame detects a state change (e.g., model loaded).  
2. **Dispatch**: iFrame sends a `postMessage` to the parent React app.  
3. **Handling**: `useMessages` hook parses the event and updates UI state.  

**Event Structure**:  
```javascript
// Example: Loading failure
{
  Type: "LoadingFailed",
  Value: "Missing texture file"
}
```  

### Event Workflow Diagram  
![Event Workflow](/svg/events.svg)  
*Fig 3. Event handling sequence*  

---

## 4. User Interaction Loop  

### Key States and Transitions  
1. **Initialization**:  
   - iFrame loads with `vehicleUUID`.  
   - `useMessages` hooks start listening for `CarSpawned`.  

2. **User Action**:  
   - Example: Clicking "Wrap Car" → Sends `WrapCar` command.  

3. **Feedback**:  
   - iFrame emits `LoadingStarted` → UI shows spinner.  
   - On success: `LoadingFinished` → UI updates.  

![User Interaction Flow](/svg/user-flow.svg)  
*Fig 4. Complete user interaction cycle*  

---

## 5. Context and State Management  

### Critical Contexts  
| Context | Role |  
|---------|------|  
| `iframeContext` | Manages iframe ref and `sendCommand` |  
| `colorContext` | Tracks selected color/vinyl |  
| `wrapperContext` | Stores checkout data (price, error messages) |  

**Data Flow Example**:  
```plaintext
User selects color → colorContext updates → sendCommand("Paint") → iFrame renders color → iFrame sends "ColorSelected" → UI closes loading menu
```  

---

## 6. Best Practices  
1. **Memoization**: Cache the iFrame component to prevent re-renders.  
2. **Error Boundaries**: Wrap event handlers in try/catch blocks.  
3. **Security**: Validate `event.origin` in message listeners.  

---

## 7. Summary  

| Flow Type | Tools Used | Diagram |  
|-----------|------------|---------|  
| **Commands** | `sendCommand`, `iframeContext` | [Commands](#commands-workflow) |  
| **Events** | `useMessages`, `postMessage` | [Events](#events-workflow) |  
| **User Flow** | Contexts, Hooks | [User Flow](#user-interaction-flow) |  

---
