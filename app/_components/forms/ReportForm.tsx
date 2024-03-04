'use client'

import { report } from '../../actions';

// Components
import Button from '../Button';

const ReportForm = () => {
  return (
    <form action={report} className="flex flex-col text-center w-3/4 sm:w-1/2 m-auto mt-4">
      Please do not abuse the report function<br />
      <div className="flex justify-center">
        <label htmlFor="offensiveContent" className="mr-4">
          <input 
            type="radio" 
            id="offensiveContent" 
            name="reportType" 
            value="offensiveContent"
          />
          Offensive Content
        </label>
        <label htmlFor="threatsOrViolence" className="mr-4">
          <input 
            type="radio" 
            id="threatsOrViolence" 
            name="reportType" 
            value="threatsOrViolence"
          />
          Threats or Violence
        </label>
        <label htmlFor="other">
          <input 
            type="radio" 
            id="other" 
            name="reportType" 
            value="Other"
          />
          Other
        </label>
      </div>
      <label htmlFor="message" className="mb-3">
        Message
        <textarea id="message" name="message" className="border border-gray-800 rounded-lg w-full text-black" rows={4} required />
      </label>
      <Button label="Submit" isDisabled={true} /> {/* Backend temporarily DISABLED: Usage has exceeded the resources included on the HOBBY  plan and no additional data can be written (10/04) */}
    </form>
  )
}

export default ReportForm;