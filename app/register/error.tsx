'use client'

// Components
import Button from "../_components/Button"
  
export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string },
  reset: () => void
}) {
  return (
    <main className='page-layout text-center'>
      <h2 className="text-3xl">Something went wrong!</h2>
      <span>{error.message}</span><br />
      <Button label="Try Again" clickEvent={() => reset()} isDisabled={false}></Button>
    </main>
  )
}