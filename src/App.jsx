import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './pages/Login';

function App() {
  // const [count, setCount] = useState(0)
  const styles= {
    wrapper: { height:"100%", width:"100%" , display: 'flex', gap: '12px'},
}
  return (
    <div style={styles.wrapper}>
      <LoginPage />
      {/* <p>Helloooo</p> */}
    </div>
  )
}

export default App
