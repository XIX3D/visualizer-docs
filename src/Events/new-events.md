# New Events

All the events will work as previous events worked
Here's an example of the format of the events

```javascript
{
	Type: "EventName",
	Value: "Payload"
}
```

### Loading States

- `LoadingStarted`
	- Loading the selected model car
	- The `Value` prop is empty
- `LoadingFinished`
	- The car loaded correctly, we can now show the wrap button
	- The `Value` prop is empty
- `LoadingFailed`
	- Something went wrong, the `Value` property sends a string with the error description

### Wrap Listener

```javascript
{
	type: "WrapCar"
}
```

Once the `WrapCar` event is sent it'll start the visualizer as before (Like when you clicked "Wrap Car" button)

### Examples

#### Loading Hook

Example on how to listen for the new events and expose them on a hook function

```javascript
export function useLoading() {

  const [loading, setLoading] = useState({
	status: false,
    message: "",
    error: null,
  });

  const handleMessage = (event) => {
	  const eventMessage = JSON.parse(event);
	
	  if (eventMessage.Type === "LoadingStarted") {
		setLoading({ status: true, message: "Loading Started" });
		return;
	  }
	
	  if (eventMessage.Type === "LoadingFinished") {
		setLoading({ status: false, message: "Success" });
		return;
	  }
	
	  if (eventMessage.Type === "LoadingFailed") {
		console.log("Loading failed", eventMessage);
		setLoading({ status: false, error: eventMessage.Value });
		return;
	  }
  }
  
  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return {
	  loading,
  }
}
```

#### LoadingButton component

LoadingButton component is an example of how to implement a loading component

```javascript
/*
 * LoadingButton component is a button that shows a loading spinner when the loading prop is true.
 * It accepts an onClick function, a loading boolean, and a text string.
 * @param {Object} props
 * @param {Function} props.onClick The function to call when the button is clicked
 * @param {Boolean} props.loading A boolean that determines if the loading spinner should be shown
 * @param {String} props.text The text to display on the button
 * @param {String} props.error The error message to display
 */
export function LoadingButton({ onClick, loading, text, error }) {
  return loading ? (
    <div className="loading-container">
      <div className="load"></div>
      <span>Loading...</span>
    </div>
  ) : error ? <ErrorMessage message={error} /> : (
    <button
      className="loading-button ford-button"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

function ErrorMessage({ message }) {
  return <div className="error-message">{message}</div>;
}
```
