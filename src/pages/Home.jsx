import './page-styles/Home.css'
import ToolBar from '../components/home-components/bar';

function Home() {
  // const [count, setCount] = useState(0)
  const styles= {
    wrapper: { height:"100%", width:"100%" , display: 'flex', gap: '12px'},
}
  return (
    <div style={styles.wrapper}>
      <ToolBar />
      {/* <p>Helloooo</p> */}
    </div>
  )
}

export default Home