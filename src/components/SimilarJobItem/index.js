import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker, HiMail} from 'react-icons/hi'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    id,
    rating,
    location,
    title,
  } = jobDetails

  return (
    <li className="job-list-item">
      <div className="company-container">
        <img src={companyLogoUrl} alt= "similar job company logo" className="logo-url" />
        <div>
          <h1 className="company-titl">{title}</h1>
          <div className="star-icon-container">
            <AiFillStar className="star-icon" />
            <p className="rating-count">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="desc-heading">Description</h1>
      <p className="job-description">{jobDescription}</p>
      <div className="location-desc">
        <div className="star-icon-container">
          <HiLocationMarker className="location-icon" />
          <p className="location-desc description">{location}</p>
        </div>
        <div className="star-icon-container">
          <HiMail className="location-icon left-icon" />
          <p className="emp-type description">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobItem
