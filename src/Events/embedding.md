# Embedding Visualizer in React Project

## Overview
A React implementation using context/hooks for communication between visualizer iframe and parent app. Includes two-way message passing and state management.

## Project Structure
```text
src/
├── App.js
├── index.js
├── assets/
├── components/
│   ├── Iframe.jsx          # Visualizer container
│   ├── LoadingButton.jsx   # New loading component
│   └── ...                 # Other UI components
├── context/
│   ├── iframeContext.js    # Communication channel
│   ├── colorContext.js     # Color state
│   └── wrapperContext.js   # Wrap configuration
├── hooks/
│   ├── useMessages.js      # Existing event handler
│   └── useLoading.js       # New loading hook
├── pages/
│   └── Visualizer.jsx      # Main visualizer page
└── utils/
```

## Core Dependencies
```bash
npm install react react-dom react-router-dom papaparse
```

## Implementation Guide

### 1. Base Setup
```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 2. Context Providers
```javascript
// App.js
import { BrowserRouter } from 'react-router-dom';
import { 
  IframeProvider, 
  ColorProvider, 
  WrapperProvider 
} from './context';

function App() {
  return (
    <IframeProvider>
      <ColorProvider>
        <WrapperProvider>
          <BrowserRouter>
            {/* Routes */}
          </BrowserRouter>
        </WrapperProvider>
      </ColorProvider>
    </IframeProvider>
  );
}
```

### 3. Iframe Component
```javascript
// components/Iframe.jsx
export function Iframe({vehicleUUID, isMobile}) {
  return (
    <iframe
      src={`${process.env.REACT_APP_VISUALIZER_URL}/?vehicle=${vehicleUUID}`}
      sandbox="allow-scripts allow-same-origin"
      allowFullScreen
    />
  );
}
```

## Communication System

### Command Flow (Parent → Iframe)
```javascript
// Using context to send commands
const { sendCommand } = useIframe();

// Example: Change color
sendCommand({
  type: 'Paint',
  UUID: colorID
});
```

### Event Flow (Iframe → Parent)
```javascript
// hooks/useMessages.js
window.addEventListener('message', (event) => {
  const msg = JSON.parse(event.data);
  
  // Existing events
  if(msg.Type === 'CarSpawned') {
    // Handle car load
  }
  
  // New loading events
  if(msg.Type === 'LoadingStarted') {
    setLoadingState(true);
  }
  
  if(msg.Type === 'LoadingFailed') {
    showError(msg.Value);
  }
});
```

## New Event Handling

### Loading Hook
```javascript
// hooks/useLoading.js
export function useLoading() {
  const [state, setState] = useState({loading: false, error: null});

  useEffect(() => {
    const handler = (event) => {
      const msg = JSON.parse(event.data);
      
      if(msg.Type === 'LoadingStarted') {
        setState({loading: true, error: null});
      }
      if(msg.Type === 'LoadingFinished') {
        setState({loading: false, error: null});
      }
      if(msg.Type === 'LoadingFailed') {
        setState({loading: false, error: msg.Value});
      }
    };

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  return state;
}
```

### Loading UI Component
```javascript
// components/LoadingButton.jsx
export function LoadingButton({ onClick, loading, error }) {
  return (
    <button onClick={onClick} disabled={loading}>
      {loading ? <Spinner /> : error ? error : "Wrap Vehicle"}
    </button>
  );
}
```

## Full Workflow
1. User selects configuration
2. Parent sends `Vehicle` command with UUID
3. Iframe emits `LoadingStarted` event
4. Show loading spinner using `LoadingButton`
5. On `LoadingFinished`:
   - Enable interaction controls
   - Show visualizer UI
6. On color selection:
   - Parent sends `Paint` command
   - Iframe updates material

## Critical Notes
1. Memoize iframe component to prevent unnecessary re-renders
2. Validate message origins for security
3. Use environment variables for visualizer URLs
4. Implement error boundaries for failed loads

## Troubleshooting
- If iframe resets: Check component memoization
- Missing events: Verify postMessage origin
- Stale state: Ensure proper dependency arrays in hooks
