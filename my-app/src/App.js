
import './App.css';
import axios from 'axios'
import {useState} from 'react'
function App() {

  const [url,setUrl] = useState("")

  const guardarDato = (event) =>{
    setUrl(event.target.value)
  }
  const descargar = (event) => {
    axios.post('http://localhost:5000/api/descargar/',{
      "canal":`${url}`
    })
  }

  return (
    <div className="App">
      <header className="App-header"> <label>
        <input
        type="text"
        value = {url} 
        onChange={guardarDato}></input>
        <button onClick={descargar}>DESCARGAR</button>
        </label>
      </header>
    </div>
  );
}

export default App;
