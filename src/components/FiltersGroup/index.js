import {BsSearch} from 'react-icons/bs'
// eslint-disable-next-line import/extensions
import ProfileDetails from '../ProfileDetails'

const FiltersGroup = props => {
  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event.target.value)
  }

  const onEnterSearchInput = event => {
    const {getJobs} = props
    if (event.key === 'Enter') {
      getJobs()
    }
  }

  const renderSearchInput = () => {
    const {getJobs, searchInput} = props
    return (
      <div className="search-input-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          value={searchInput}
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <button
          type="button"
          aria-label="filter-group"
          className="search-button-container"
          onClick={getJobs}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  const renderTypeOfEmployment = () => {
    const {employmentTypesList, changeEmployeeList} = props
    return (
      <div className="employment-type-container">
        <h1 className="employment-type-heading">Type of Employment</h1>
        <ul className="employee-type-list-container">
          {employmentTypesList.map(eachEmployeeType => (
            <li
              className="employee-item"
              key={eachEmployeeType.employmentTypeId}
            >
              <input
                type="checkbox"
                id={eachEmployeeType.employmentTypeId}
                className="check-input"
                value={eachEmployeeType.employmentTypeId}
                onChange={event => changeEmployeeList(event.target.value)}
              />
              <label
                htmlFor={eachEmployeeType.employmentTypeId}
                className="check-label"
              >
                {eachEmployeeType.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const renderSalaryRange = () => {
    const {salaryRangesList, changeSalary} = props
    return (
      <div className="salary-range-container">
        <h1 className="salary-range-heading">Salary Range</h1>
        <ul className="salary-range-list-container">
          {salaryRangesList.map(eachSalary => (
            <li
              className="salary-item"
              key={eachSalary.salaryRangeId}
              onClick={() => changeSalary(eachSalary.salaryRangeId)}
            >
              <input
                type="radio"
                id={eachSalary.salaryRangeId}
                name="salary"
                className="check-input"
              />
              <label htmlFor={eachSalary.salaryRangeId} className="check-label">
                {eachSalary.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="filters-group-container">
      {renderSearchInput()}
      <ProfileDetails />
      <hr className="horizontal-line" />
      {renderTypeOfEmployment()}
      <hr className="horizontal-line" />
      {renderSalaryRange()}
    </div>
  )
}

export default FiltersGroup
