import Link from "next/link"

function TLink({ name, route, page }: { name: string, route: string, page: string }) {
  return (
    <Link 
      href={`/${route}`} 
      className={`text-xl ${name == page ? 'font-bold' : 'font-normal'}`}
    >
      {name}
    </Link>
  )
}

export default function Nav({ auth, page }: { auth: boolean, page: string }) {

    return (
      <div className='ml-auto gap-8 items-start inline-flex pt-10 pr-10'>
          <TLink name='Home' route='' page={page} />
          <TLink name='Leaderboard' route='leaderboard' page={page} />
          <TLink name='Image Downloader' route='imagedownloader' page={page} />
          {auth && (
            <TLink route="profile" name="Profile"  page={page} />
          )}
          {!auth && (
            <TLink route="login" name="Login" page={page} />
          )}
      </div>
    )
  }