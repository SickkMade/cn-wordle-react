import PopupComponent from "./PopupComponent"
import PropTypes from "prop-types"

function HolderOfPopups({popups}) {


  return (
    <section className="popups--holder">
        {popups && popups.map((popupMessage) => {
            return <PopupComponent key={popupMessage.id} message={popupMessage.message} />
        })}
    </section>
  )
}

HolderOfPopups.propTypes = {
    popups: PropTypes.array,
}

export default HolderOfPopups