'use client'

import { createReport } from '../../actions';

// Components
import Button from '../Button';

interface ReportFormProps {
  type: string;
  id: number;
}

const ReportCreateForm: React.FC<ReportFormProps> = ({ type, id }) => {
  const handleSubmit = () => {
    const reportTypeElement = document.querySelector('input[name="reportType"]:checked') as HTMLInputElement;
    const reportType = reportTypeElement ? reportTypeElement.value : '';
    const message = (document.getElementById('message') as HTMLTextAreaElement).value;
  
    const data = new FormData();
    data.append('entityType', type);
    data.append('entityId', id.toString());
    data.append('reportType', reportType);
    data.append('message', message);
  
    createReport(data);
  };

  return (
    <form className="flex flex-col text-center w-3/4 sm:w-1/2 m-auto mt-4">
      <span className='my-4'>Please do not abuse the report function. Repeated misuse will result in action against the reporter.</span>
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
        Explain briefly why this needs to be reported
        <textarea 
          id="message" 
          name="message" 
          className="border border-gray-800 rounded-lg w-full text-black" 
          rows={4} 
          maxLength={300} 
          required 
        />
      </label>
      <Button label="Submit" isDisabled={true} clickEvent={() => handleSubmit} /> {/* Backend temporarily DISABLED: Usage has exceeded the resources included on the HOBBY  plan and no additional data can be written (10/04) */}
    </form>
  )
}

export default ReportCreateForm;