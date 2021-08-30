import {init} from './services/AblyBrokerService'
import { useEffect } from 'react';
import { RoutesView } from './Routes';

function App() {
  //inicializa broker do ably
  useEffect(()=>{
    init();
  });

  return (
    <RoutesView/>
  );
}

export default App;
