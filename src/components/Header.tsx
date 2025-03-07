import Link from 'next/link'
import { getSession, signOutWithForm } from '@/serverAction/auth'
import { UserButton } from './UserButton'
import BreadcrumbHeader from './BreadcrumbHeader'
import { ModeToggle } from './ThememodeToggle'

export default async function Header() {
  const session = await getSession()
  return (
    <header className="flex items-center justify-between px-6 py-4 h-[50px] container">
      <BreadcrumbHeader />
      <nav className="gap-2 flex items-center">
        <ModeToggle />
        {session?.user ? (
          <UserButton />
        ) : (
          <Link href="/auth/signin" className="dark:text-white text-black hover:text-gray-400">
            로그인
          </Link>
        )}
      </nav>
    </header>
  )
}
