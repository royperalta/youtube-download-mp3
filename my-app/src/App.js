
import './App.css';
import axios from 'axios'
import { useState } from 'react'
function App() {

  const [url, setUrl] = useState("")
  const [urlMore, setUrlMore] = useState("");

  const guardarDato = (event) => {
    setUrl(event.target.value)
  }
  const saveUrl = (event) => {
    setUrlMore(event.target.value)
    console.log(event.target.value)
  }

  const descargarMoreViews = (event) => {
    console.log(urlMore)
    axios.post('http://localhost:5000/api/masvisto/', {
      "canal": `${urlMore}`
    })
  }

  const descargar = (event) => {

    axios.post('http://localhost:5000/api/descargar/', {
      "canal": `${url}`
    })
  }

  return (
    <div className="App">
      <header className="App-header"> <label>
        <label>Descargar las últimas canciones</label>
        <br></br>
        <input
          type="text"
          value={url}
          onChange={guardarDato}></input>
        <button onClick={descargar}>DESCARGAR</button>
      </label>
        <br></br>
        <label>Descargar las mas vistas</label>
        <input
          type="text"
          value={urlMore}
          onChange={saveUrl}
        ></input>
        <button onClick={descargarMoreViews}>DESCARGAR</button>
      </header>
    </div>
  );
}

export default App;
