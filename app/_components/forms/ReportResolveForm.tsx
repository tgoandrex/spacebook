'use client'

import { resolveReport } from '../../actions';

// Components
import Button from '../Button';

interface ReportFormProps {
  id: number;
}

const ReportResolveForm: React.FC<ReportFormProps> = (id) => {
  const handleSubmit = () => {
    const message = (document.getElementById('message') as HTMLTextAreaElement).value;
  
    const data = new FormData();
    data.append('message', message);
    data.append('reportId', id.toString());
  
    resolveReport(data);
  };

  return (
    <form className="flex flex-col text-center w-3/4 sm:w-1/2 m-auto mt-4">
      <label htmlFor="message" className="mb-3">
        Message
        <textarea id="message" name="message" className="border border-gray-800 rounded-lg w-full text-black" rows={4} required />
      </label>
      <Button label="Submit" isDisabled={true} clickEvent={() => handleSubmit} /> {/* Backend temporarily DISABLED: Usage has exceeded the resources included on the HOBBY  plan and no additional data can be written (10/04) */}
    </form>
  )
}

export default ReportResolveForm;