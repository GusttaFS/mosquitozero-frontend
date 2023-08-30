import { IonApp, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import Register from './pages/register/Register';
import './app-style.css'

function App() {
  return (
    <IonApp className='app'>
      <Register></Register>
    </IonApp>
  );
}

export default App;
