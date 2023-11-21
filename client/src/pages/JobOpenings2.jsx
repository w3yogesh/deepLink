import React from 'react'
import { useParams } from 'react-router-dom';
import JobPostingForm from '../components/MyCompany/JobPostingForm';
import JobList from '../components/MyCompany/JobList';

const JobOpenings2 = ({companyId}) => {
  return (
    <div>
     
      <h1>Job Page</h1>
       <JobList companyId={companyId}/>
    </div>
  )
}

export default JobOpenings2;
