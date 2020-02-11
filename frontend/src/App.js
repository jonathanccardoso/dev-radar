import React, { useState, useEffect } from 'react';
// component: bloco isolado de h-c-j, o qual não interfere no restante da aplicação
// property: informações de um componente pai que é repassado ao filho
// state: informações mantidas pelo componente [lembrar: imutabilidade]

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

function App() {
  // working with the state
  const [github_username, setGithubUserName] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  // logic for rendering when the component is changed
  useEffect(()=> {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        // can pass parameters to the function
        timeout: 30000,
      },
    )
  }, []);

  async function handleAddDev(e){
    e.preventDefault(); // prevent action
    
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddDev}>

          <div className="input-block">
            <label htmlFor="github_username">Usuário do github</label>
            <input 
              name="github_username" 
              id="github_username" 
              required
              value={github_username}
              onChange={e => setGithubUserName(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Usuário do github</label>
            <input 
              name="techs" 
              id="techs" 
              required
              value={techs}
              onChange={e => setTechs(e.target.value)}
            />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input 
                type="number" 
                name="latitude" 
                id="latitude" 
                required 
                value={latitude}
                onChange={e => setLatitude(e.target.value)}
                />
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input 
                type="number" 
                name="longitude" 
                id="longitude" 
                required 
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
              />
            </div>
          </div>

          <button type="submit">Salvar</button>

        </form>
      </aside>

      <main>
        <ul>
          <li className="dev-item">
            <header>
              <img src="#" alt="user"/>
              <div className="user-info">
                <strong>Diego Fernandes</strong>
                <span>ReactJs, React Native</span>
              </div>
            </header>
            <p>loasdadsadasdsdasdasdas</p>
            <a href="">Acessar perfil do github</a>
          </li>
        </ul>
      </main>

    </div>
  );
}

export default App;
