"use client"

import { revalidatePath } from 'next/cache';
import prisma from "../../../prisma/lib/prisma";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const SearchForm = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  /* 
  Backend temporarily DISABLED: Usage has exceeded the resources included on the HOBBY  plan and no additional data can be written (10/04)

  const searchPosts = async (formData: FormData) => {
    'use server'
    
    const query = formData.get("query") as string;

    try {
      await prisma.post.findMany({
        where: {
          content: query
        }
      });
    } catch (e) {
      console.log('Failed to get post search results');
    }
  }

  const searchPhotos = async (formData: FormData) => {
    'use server'
    
    const query = formData.get("query") as string;

    try {
      await prisma.photo.findMany({
        where: {
          content: query
        }
      });
    } catch (e) {
      console.log('Failed to get photo search results');
    }
  }

  const searchUsers = async (formData: FormData) => {
    'use server'
    
    const query = formData.get("query") as string;

    try {
      await prisma.user.findMany({
        where: {
          email: query
        }
      });
    } catch (e) {
      console.log('Failed to get user search results');
    }
  }
  */

  const params = new URLSearchParams(Array.from(searchParams.entries()));

  const searchClient = (term: string) => {
    if(term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const handleRadioButtons = (term: string) => {
    if(term) {
      params.set('type', term);
    } else {
      params.delete('type');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <form className="flex flex-col text-center w-3/4 sm:w-1/2 m-auto">
      <label htmlFor="query" className="mb-3">
        Search<br />
        <input 
          type='text' 
          id="query" 
          name="query" 
          className="border border-gray-800 rounded-lg w-full  text-black"
          onChange={(e) => {
            searchClient(e.target.value);
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
    </form>
  )
}

export default SearchForm;