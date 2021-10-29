import { NavLink } from 'react-router-dom'
import './Footer.css';

export default function Footer() {

    return (
        <div className="Footer_ctnr">
            <div className='aboutMe_container'>
                <li className='ownerName' >Trevin Woods</li>
                <span><a className='github' href='https://github.com/Woods-Trevin' target="_blank" rel="noreferrer">Github</a></span>
                <span><a className='linkedIn' href='https://www.linkedin.com/in/trevinwoods4778661aa/' target="_blank" rel="noreferrer">LinkedIn</a></span>
            </div>
            <div className="quickNav_container">
            </div>
        </div>
    )
}