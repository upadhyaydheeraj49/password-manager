import './index.css'

const PasswordItem = props => {
  const {id, website, username, password, profileColor} = props.item
  const {showPassword, deleteSavedPassword} = props
  const onDeletePassword = () => {
    deleteSavedPassword(id)
  }
  return (
    <li>
      <div className="saved-datails">
        <div className="profile" style={{backgroundColor: `${profileColor}`}}>
          P
        </div>
        <div className="user-details">
          <p className="saved-website">{website}</p>
          <p className="saved-username">{username}</p>
          {showPassword && <p className="saved-password">{password}</p>}
          {!showPassword && (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
            />
          )}
        </div>
      </div>

      <button className="btn-delete" onClick={onDeletePassword} data-testid="delete">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}
export default PasswordItem
