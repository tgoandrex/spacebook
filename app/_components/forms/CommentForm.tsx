'use client'

import { createComment } from '../../actions';

// Components
import Button from '../Button';

interface CommentFormProps {
  type: string;
  id: number;
}

const CommentForm: React.FC<CommentFormProps> = ({ type, id }) => {
  const handleSubmit = () => {
    const content = (document.getElementById('content') as HTMLTextAreaElement).value;
  
    const data = new FormData();
    data.append('entityType', type);
    data.append('entityId', id.toString());
    data.append('content', content);
  
    createComment(data);
  };

  return (
    <form className="flex flex-col text-center w-3/4 sm:w-1/2 m-auto mt-4">
      <label htmlFor="content" className="mb-3">
        New Comment<br />
        <textarea id="content" name="content" className="border border-gray-800 rounded-lg w-full text-black" rows={4} required />
      </label>
      <Button label="Add Comment" isDisabled={true} clickEvent={() => handleSubmit} /> {/* Backend temporarily DISABLED: Usage has exceeded the resources included on the HOBBY  plan and no additional data can be written (10/04) */}
    </form>
  )
}

export default CommentForm;