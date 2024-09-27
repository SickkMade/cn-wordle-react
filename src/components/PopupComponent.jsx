import PropTypes from "prop-types"
import '../css/popup.css'

function PopupComponent({message}) {
  return (
    <div className="popup">{message}</div>
  )
}


PopupComponent.propTypes = {
    message: PropTypes.string,
}
export default PopupComponent