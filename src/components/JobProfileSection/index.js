import './index.css'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import JobCard from '../JobCard'
import JobsFilterGroup from '../JobsFilterGroup'
import Loader from 'react-loader-spinner'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  in_progress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobProfileSection extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    employmentType: [],
    salaryRange: 0,
    searchInput: '',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.in_progress})

    const jwtToken = Cookies.get('jwt_token')
    const {salaryRange, employmentType, searchInput} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onchangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  enterKey = event => {
    if (event.key === 'Enter') {
      this.getJobDetails()
    }
  }

  changeSalaryRange = salary => {
    this.setState({salaryRange: salary}, this.getJobDetails)
  }

  changeEmploymentType = type => {
    this.setState(
      prveState => ({employmentType: [...prveState.employmentType, type]}),
      this.getJobDetails,
    )
  }

  jobSuccess = () => {
    const {jobsList} = this.state
    const displayJobs = jobsList.length > 0
    return displayJobs ? (
      <div className="deetsCont">
        <ul className="ulCont">
          {jobsList.map(each => (
            <JobCard key={each.id} jobDeets={each} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="failCont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="nojobsImg"
        />
        <h1 className="failhead">No Jobs Found</h1>
        <p className="failp">We could not find any jobs. Try other filters.</p>
      </div>
    )
  }

  jobFailure = () => (
    <div className="failCont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failImg"
      />
      <h1 className="failhead">Oops! Something Went Wrong</h1>
      <p className="failp">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        data-testid="button"
        className="failBtn"
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  loadingView = () => (
    <div className="loadCont" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobProfile = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.jobSuccess()
      case apiStatusConstants.failure:
        return this.jobFailure()
      case apiStatusConstants.in_progress:
        return this.loadingView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="jobDeetsCont">
        <div>
          <JobsFilterGroup
            salaryRangesList={salaryRangesList}
            employmentTypesList={employmentTypesList}
            searchInput={searchInput}
            changeEmploymentType={this.changeEmploymentType}
            changeSalaryRange={this.changeSalaryRange}
            changeSearchInput={this.changeSearchInput}
            getJobDetails={this.getJobDetails}
          />
        </div>

        <div className="renderItems">
          <div className="searchCont">
            <input
              type="search"
              className="search"
              placeholder="Search"
              value={searchInput}
              onChange={this.onchangeInput}
              onKeyDown={this.enterKey}
            />
            <button
              type="button"
              data-testid="searchButton"
              className="searchBtn"
              onClick={this.getJobDetails}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div className="new">{this.renderJobProfile()}</div>
        </div>
      </div>
    )
  }
}
export default JobProfileSection
