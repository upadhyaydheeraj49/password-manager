import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

class PasswordManager extends Component {
  state = {
    passwordsList: [],
    website: '',
    username: '',
    password: '',
    searchInput: '',
    showPassword: false,
  }

  profileColorList = [
    '#7683cb',
    '#f59e0b',
    '#10b981',
    '#f97316',
    '#14b8a6',
    '#b91c1c',
    '#0ea5e9',
    '#64748b',
  ]

  updateWebsite = event => {
    this.setState({
      website: event.target.value,
    })
  }

  updateUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  updatePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  addUsernamePassword = event => {
    event.preventDefault()
    this.setState(prevState => {
      const {website, username, password} = prevState
      const index = Math.floor(Math.random() * this.profileColorList.length)
      const profileColor = this.profileColorList[index]
      const detailsToSave = {
        id: uuidv4(),
        website,
        username,
        password,
        profileColor,
      }
      return {
        passwordsList: [...prevState.passwordsList, detailsToSave],
        username: '',
        password: '',
        website: '',
      }
    })
  }

  makePasswordVisible = event => {
    this.setState({
      showPassword: event.target.checked,
    })
  }

  deleteSavedPassword = detailId => {
    this.setState(prevState => {
      const {passwordsList} = prevState
      const updatedList = passwordsList.filter(item => item.id !== detailId)
      return {
        passwordsList: updatedList,
      }
    })
  }

  updateSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  render() {
    const {
      passwordsList,
      website,
      username,
      password,
      searchInput,
      showPassword,
    } = this.state
    // console.log(passwordsList)
    const filteredList = passwordsList.filter(item =>
      item.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const isListEmpty = filteredList.length === 0
    return (
      <div className="main-container">
        <img
          className="app-logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="top-userinput-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manager-img"
          />
          <form className="input-form" onSubmit={this.addUsernamePassword}>
            <h1>Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                type="text"
                placeholder="Enter Website"
                onChange={this.updateWebsite}
                value={website}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                type="text"
                placeholder="Enter Username"
                onChange={this.updateUsername}
                value={username}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                type="password"
                placeholder="Enter Password"
                onChange={this.updatePassword}
                value={password}
              />
            </div>
            <button className="btn add-btn" type="submit">
              Add
            </button>
          </form>
        </div>
        <div className="bottom-card">
          <div className="bottom-card-top-row">
            <div className="your-pass-heading-count-container">
              <h1>Your Passwords</h1>
              <p className="password-count">{filteredList.length}</p>
            </div>

            <div className="search-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                type="search"
                placeholder="Search"
                onChange={this.updateSearchInput}
              />
            </div>
          </div>
          <hr />
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="showPassword"
              onClick={this.makePasswordVisible}
            />
            <label htmlFor="showPassword">Show passwords</label>
          </div>
          <ul className="passwords-container">
            {filteredList.map(item => (
              <PasswordItem
                key={item.id}
                item={item}
                showPassword={showPassword}
                deleteSavedPassword={this.deleteSavedPassword}
              />
            ))}
          </ul>
          {isListEmpty && (
            <img
              className="no-password-img"
              src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              alt="no passwords"
            />
          )}
          {isListEmpty && <p className="no-passwords-caption">No Passwords</p>}
        </div>
      </div>
    )
  }
}
export default PasswordManager
