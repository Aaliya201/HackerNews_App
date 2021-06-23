import React from "react";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);

    React.useEffect(() => {
      fetch("/api")
        .then((res) => res.json())
        .then((data) => setData(data.message));
    }, []);

    return (
      <div className="App">
        <header className="App-header">
          <p>{!data ? "Loading..." : data}</p>
          <form action="../../post" method="post"
              className="form">
          <button type="submit">Connected?</button>
        </form>
        </header>
      </div>
    );
  }

export default App;
