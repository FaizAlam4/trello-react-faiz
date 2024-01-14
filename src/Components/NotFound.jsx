import nofound from '../assets/nofound.jpg'

function NotFound() {
  return (
    <div style={{
        width:'100vw',height:'100vh', backgroundColor:'white'
    }}>
        <img src={`${nofound}`} alt="Not Found"  style={{width:'100%', objectFit:'cover'}} />
    </div>
  )
}

export default NotFound