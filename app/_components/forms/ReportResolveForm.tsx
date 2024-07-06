import { redirect } from "next/navigation";
import prisma from "../../../prisma/lib/prisma";

// Components
import Button from '../Button';

interface ReportFormProps {
  id: number;
}

const ReportResolveForm: React.FC<ReportFormProps> = async ({ id }) => {

  const resolveReport = async (formData: FormData) => {
    "use server"

    const message = formData.get("message") as string;

    try {
      await prisma.report.update({
        where: {
          id: id
        },
        data: {
          resolved: true,
          adminAction: message
        }
      });
    } catch {
      throw new Error('Failed to resolve report');
    }
    redirect('/admin/reports/search?type=resolved');
  }

  return (
    <form action={resolveReport} className="flex flex-col text-center w-3/4 sm:w-1/2 m-auto mt-4">
      <label htmlFor="message" className="mb-3">
        Explain briefly what action was took
        <textarea 
          id="message" 
          name="message" 
          className="border border-gray-800 rounded-lg w-full text-black" 
          rows={4} 
          maxLength={300} 
          required 
        />
      </label>
      <Button label="Resolve Report" isDisabled={false} />
    </form>
  )
}

export default ReportResolveForm;