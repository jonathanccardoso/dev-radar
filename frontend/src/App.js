import React, { useState, useEffect } from 'react';
// component: bloco isolado de h-c-j, o qual não interfere no restante da aplicação
// property: informações de um componente pai que é repassado ao filho
// state: informações mantidas pelo componente [lembrar: imutabilidade]

import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

function App() {
  // working with the state
  const [devs, setDevs] = useState([]);

  useEfect(()=>{
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data){    
    const response = await api.post('/devs', data);
    
    // to add dev on list in react
    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>          
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>

    </div>
  );
}

export default App;
