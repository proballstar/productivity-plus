import Link from "next/link"

export default function Nav({ auth }: { auth: boolean }) {
    return (
      <div className='ml-auto gap-8 items-start inline-flex pt-10 pr-10'>
        <Link href="/" className='text-xl font-bold'>
            Home
          </Link>
          <Link href="/leaderboard" className='text-xl'>
            Leaderboard
          </Link>
          {auth && (
            <Link href="/profile" className='text-xl'>
              Profile
            </Link>
          )}
          {!auth && (
            <Link href="/login" className='text-xl'>
              Login
            </Link>
          )}
          <h1>
            
          </h1>
      </div>
    )
  }