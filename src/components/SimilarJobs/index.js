import {Component} from 'react'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'

class SimilarJobs extends Component {
  render() {
    const {similarJobData} = this.props
    const {
      companyLogoUrl,
      employmentType,
      id,
      jobDescription,
      location,
      rating,
      title,
    } = similarJobData

    return (
      <li className="similar-job-item">
        <div className="similar-job-item-header">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="similar-job-item-logo"
          />
          <div>
            <h2 className="similar-job-item-title">{title}</h2>
            <div className="similar-job-item-rating">
              <AiFillStar className="similar-job-item-star-icon" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="similar-job-item-info">
          <div className="similar-job-item-location">
            <MdLocationOn />
            <p>{location}</p>
          </div>
          <p>{employmentType}</p>
        </div>
        <p>{jobDescription}</p>
      </li>
    )
  }
}

export default SimilarJobs
