import ProfileDetails from '../ProfileDetails'
import './index.css'

const JobsFiltersGroup = props => {
  const getEmploymentTypeList = () => {
    
    const {employmentTypesList} = props
    return employmentTypesList.map(employ => {
      const {changeEmploymentType} = props
      const changeEmp = event => changeEmploymentType(event.target.value)

      return (
        <li className="li" key={employ.employmentTypeId} onChange={changeEmp}>
          <input
            type="checkbox"
            className="radio"
            id={employ.employmentTypeId}
            value={employ.employmentTypeId}
          />
          <label htmlFor={employ.employmentTypeId} className="label">
            {employ.label}
          </label>
        </li>
      )
    })
  }

  const renderEmploymentType = () => (
    <div className="salarycont">
      <h1 className="shead">Type of Employment</h1>
      <ul className="salarycontainer">{getEmploymentTypeList()}</ul>
    </div>
  )

  const getSalaryRangeList = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(each => {
      const {changeSalaryRange} = props
      const salaryChange = () => changeSalaryRange(each.salaryRangeId)

      return (
        <li className="li" key={each.salaryRangeId} onChange={salaryChange}>
          <input
            type="radio"
            id={each.salaryId}
            name="salary"
            className="radio"
          />
          <label htmlFor={each.salaryRangeId} className="label">
            {each.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRange = () => (
    <div className="salarycont">
      <h1 className="shead">Salary Range</h1>
      <ul className="salarycontainer">{getSalaryRangeList()}</ul>
    </div>
  )

  return (
    <div className="filterCont">
      <ProfileDetails />
      <hr className="hline" />
      {renderEmploymentType()}
      <hr className="hline" />
      {renderSalaryRange()}
    </div>
  )
}
export default JobsFiltersGroup
