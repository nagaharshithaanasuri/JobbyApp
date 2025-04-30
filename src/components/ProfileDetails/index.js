import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ProfileDetails extends Component {
  state = {
    personDetails: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/profile`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        personDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  onSucess = () => {
    const {personDetails} = this.state
    const {name, profileImageUrl, shortBio} = personDetails
    return (
      <div className="bgm">
        <img src={profileImageUrl} alt="profile" className="profile-logo" />
        <h1 className="heading">{name}</h1>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }
  onLoading = () => (
    <div className="failCont" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )
  onFailure = () => (
    <div className="failCont">
      <button
        type="button"
        data-testid="button"
        className="retry"
        onClick={this.getProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.onSucess()
      case apiStatusConstants.inProgress:
        return this.onLoading()
      case apiStatusConstants.inProgress:
        return this.onFailure()
      default:
        return null
    }
  }
}
export default ProfileDetails
