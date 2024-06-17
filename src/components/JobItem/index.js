import {Component} from 'react'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'

class JobItem extends Component {
  render() {
    const {jobData} = this.props
    const {
      companyLogoUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobData

    return (
      <li className="job-item">
        <div className="job-item-header">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="job-item-logo"
          />
          <div>
            <h2 className="job-item-title">{title}</h2>
            <div className="job-item-rating">
              <AiFillStar className="job-item-star-icon" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-item-info">
          <div className="job-item-location">
            <MdLocationOn />
            <p>{location}</p>
          </div>
          <p>{employmentType}</p>
          <p>{packagePerAnnum}</p>
        </div>
        <p>{jobDescription}</p>
      </li>
    )
  }
}

export default JobItem
