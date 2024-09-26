import '../css/fullscreen.css'
import PropTypes from 'prop-types'
import { useState } from 'react';
import { X } from 'lucide-react';

function FullScreenComponent({children}) {
    const [isActive, setIsActive] = useState(true);

    const visibility = () => isActive ? '' : 'fullscreen__invisible';
  return (
    <section className={`fullscreen ${visibility()}`}>
        <button onClick={() => setIsActive(false)}className="fullscreen--close"><X size={32} /></button>
        {children}
    </section>
  )
}

FullScreenComponent.propTypes = {
    children: PropTypes.node,
}

export default FullScreenComponent