'use client'

import { createComment } from '../../actions';

// Components
import Button from '../Button';

const CommentForm = () => {
  return (
    <form action={createComment} className="flex flex-col text-center w-3/4 sm:w-1/2 m-auto mt-4">
      <label htmlFor="content" className="mb-3">
        New Comment<br />
        <textarea id="content" name="content" className="border border-gray-800 rounded-lg w-full text-black" rows={4} required />
      </label>
      <Button label="Add Comment" isDisabled={true} /> {/* Backend temporarily DISABLED: Usage has exceeded the resources included on the HOBBY  plan and no additional data can be written (10/04) */}
    </form>
  )
}

export default CommentForm;