/* eslint-disable react/prop-types */
import './ListView.css'

function ListView({element}) {
  return (
    <div className='wrap-item'>{element.name}</div>
  )
}

export default ListView