import React, {useState} from 'react';
import Axios from 'axios';

import './App.css';

function App() {
  const [files, setFiles] = useState(null);
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", text);
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append("files[]", files[i]);
      }
    }
    Axios.post(
      "http://thomklauke.ddns.net:3000/print",
      formData,
      {
        headers:
          {
            'Content-Type': 'multipart/form-data'
          }
        }
    ).then((res) => {
      alert(res.message);
    }).catch((err) => {
      alert(err.message);
    });
  }

  return (
    <div className="App">
      <fieldset className="fieldset">
        <legend className="legend">Drucken</legend>
        <form className="form">
          <label className="label" htmlFor="file">Dateien</label>
          <input className="formelement" type="file" id="file" name="file" multiple onChange={(e) => setFiles(e.target.files)} />
          <label className="label" htmlFor="text">Text</label>
          <textarea className="formelement" id="text" name="text" placeholder="Text hier eingeben" value={text} onChange={(e) => setText(e.target.value)} />
          <button className="submit" type="submit" id="submit" name="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </fieldset>
    </div>
  );
}

export default App;
