import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import {MdLocationOn} from 'react-icons/md'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import SkillsCard from '../SkillsCard'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobData: {},
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  // Method to format data for similar jobs
  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  getFormattedSimilarData = data => ({
    companyLogoUrl: data.company_logo_url,

    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,

    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  // Method to fetch job data from API
  getJobData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = this.getFormattedData(data.job_details)
      const updatedSimilarJobsData = data.similar_jobs.map(eachSimilarJob =>
        this.getFormattedSimilarData(eachSimilarJob),
      )
      this.setState({
        jobData: updatedData,
        similarJobsData: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  // Method to render failure view
  renderFailureView = () => (
    <div className="job-item-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-item-failure-img"
      />
      <h1 className="job-item-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="job-item-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="job-item-failure-button"
        onClick={this.getJobData}
      >
        Retry
      </button>
    </div>
  )

  // Method to render job details view
  renderJobDetailsView = () => {
    const {jobData, similarJobsData, apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return (
          <div className="loader-container">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        )
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success: {
        const {
          title,
          companyLogoUrl,
          location,
          employmentType,
          rating,
          packagePerAnnum,
          jobDescription,
          companyWebsiteUrl,
          skills,
          lifeAtCompany,
        } = jobData
        const {description, imageUrl} = lifeAtCompany

        return (
          <div className="job-details-container">
            <div className="job-header">
              <div className="company-logo-container">
                <img
                  src={companyLogoUrl}
                  alt="company logo"
                  className="company-logo"
                />
              </div>
              <div className="job-info">
                <h1 className="job-title">{title}</h1>
                <div className="employee-type-container">
                  <BsStarFill className="rating-icon" />
                  <p className="rating-heading">{rating}</p>
                </div>
                <div className="location-employee-container">
                  <div className="location-container">
                    <MdLocationOn className="location-icon" />
                    <p className="location-heading">{location}</p>
                  </div>
                  <div className="employee-type-container">
                    <BsFillBriefcaseFill className="brief-case-icon" />
                    <p className="employee-type-heading">{employmentType}</p>
                  </div>
                </div>
                <p className="package-heading">{packagePerAnnum}</p>
              </div>
            </div>
            <hr className="line" />
            <div className="description-visit-container">
              <h1 className="description-heading">Description</h1>
              <div className="visit-container">
                <a href={companyWebsiteUrl} className="visit-heading">
                  Visit
                </a>
                <BiLinkExternal className="visit-icon" />
              </div>
            </div>
            <p className="description-text">{jobDescription}</p>
            <h1 className="skills-heading">Skills</h1>
            <ul className="skills-list-container">
              {skills.map(eachSkill => (
                <SkillsCard skillDetails={eachSkill} key={eachSkill.name} />
              ))}
            </ul>
            <h1 className="life-at-company-heading">Life at Company</h1>
            <div className="life-at-company-description-image-container">
              <p className="life-at-company-description">{description}</p>
              <img
                src={imageUrl}
                alt="life at company"
                className="life-at-company-image"
              />
            </div>
            <h1 className="similar-jobs-heading">Similar Jobs</h1>
            <ul className="similar-jobs-list">
              {similarJobsData.map(eachSimilarJob => (
                <SimilarJobItem
                  jobDetails={eachSimilarJob}
                  key={eachSimilarJob.id}
                />
              ))}
            </ul>
          </div>
        )
      }
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          {this.renderJobDetailsView()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
