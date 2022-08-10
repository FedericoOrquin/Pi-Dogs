import React from 'react'
import {Link} from 'react-router-dom'
import './styles.css';
import bgImg from '../../Assets/backgroundImage.jpg'

const LandingPage = () => {
  return (
    <div>
        <img className='bgImage' src={bgImg} alt='backGroundImage'/>
        <Link to='/home'>
            <button className='botonLanding'>Ingresar</button>
        </Link>
    </div>
  )
}

export default LandingPage;