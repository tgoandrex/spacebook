"use client"

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const SearchReportsForm = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(Array.from(searchParams.entries()));

  const handleRadioButtons = useDebouncedCallback((term: string) => {
    if(term) {
      params.set('type', term);
    } else {
      params.delete('type');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 1000);

  return (
    <form className="flex flex-col text-center w-3/4 sm:w-1/2 m-auto">
      <div className="flex justify-center">
        <label htmlFor="posts" className="mr-4">
          <input 
            type="radio" 
            id="posts" 
            name="searchType" 
            value="resolved"
            onChange={(e) => {
              handleRadioButtons(e.target.value);
            }}
          />
          Resolved
        </label>
        <label htmlFor="photos" className="mr-4">
          <input 
            type="radio" 
            id="photos" 
            name="searchType" 
            value="unresolved"
            onChange={(e) => {
              handleRadioButtons(e.target.value);
            }}
          />
          Unresolved
        </label>
      </div>
    </form>
  )
}

export default SearchReportsForm;