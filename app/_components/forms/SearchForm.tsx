"use client"

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

// Components
import Button from '../Button';

const SearchForm = ({ title } : { title: string; }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(Array.from(searchParams.entries()));

  const currentPage = parseInt(params.get('page') || '1', 10);

  const handleInput = useDebouncedCallback((term: string) => {
    if(term) {
      params.set('query', term);
      params.set('page', '1');
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 1000);

  const handleRadioButtons = useDebouncedCallback((term: string) => {
    if(term) {
      params.set('type', term);
      params.set('page', '1');
    } else {
      params.delete('type');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 1000);

  return (
    <form className="flex flex-col text-center w-3/4 sm:w-1/2 m-auto">
      <label htmlFor="query" className="mb-3">
        <span className="text-2xl">{title} Search</span><br />
        <input 
          type='text' 
          id="query" 
          name="query" 
          className="border border-gray-800 rounded-lg w-full  text-black"
          onChange={(e) => {
            handleInput(e.target.value);
          }}
          defaultValue={searchParams.get('query')?.toString()}
          required 
        />
      </label>
      <div className="flex justify-center">
        <label htmlFor="posts" className="mr-4">
          <input 
            type="radio" 
            id="posts" 
            name="searchType" 
            value="posts"
            onChange={(e) => {
              handleRadioButtons(e.target.value);
            }}
          />
          Posts
        </label>
        <label htmlFor="photos" className="mr-4">
          <input 
            type="radio" 
            id="photos" 
            name="searchType" 
            value="photos"
            onChange={(e) => {
              handleRadioButtons(e.target.value);
            }}
          />
          Photos
        </label>
        {title === "Admin" &&
          <label htmlFor="comments" className="mr-4">
            <input 
              type="radio" 
              id="comments" 
              name="searchType" 
              value="comments"
              onChange={(e) => {
                handleRadioButtons(e.target.value);
              }}
            />
            Comments
          </label>
        }
        <label htmlFor="users">
          <input 
            type="radio" 
            id="users" 
            name="searchType" 
            value="users"
            onChange={(e) => {
              handleRadioButtons(e.target.value);
            }}
          />
          Users
        </label>
      </div>
      <div className="flex justify-center mt-4">
        <Button
          label='Previous'
          clickEvent={() => {
            if (currentPage > 1) {
              params.set('page', (currentPage - 1).toString());
              replace(`${pathname}?${params.toString()}`);
            }
          }}
          isDisabled={currentPage === 1 ? true : false}
        />
        <Button
          label='Next'
          clickEvent={() => {
            params.set('page', (currentPage + 1).toString());
            replace(`${pathname}?${params.toString()}`);
          }}
          isDisabled={false}
        />
      </div>
    </form>
  )
}

export default SearchForm;