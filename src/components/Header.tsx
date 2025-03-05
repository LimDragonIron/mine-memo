import Link from 'next/link'
import { getSession, signOutWithForm } from "@/serverAction/auth"

export default async function Header() {
  const session = await getSession()
  return (
    <header className="bg-gray-800 p-4">
      {session?.user && <div className="text-white text-center mb-2">{session.user.name}</div>}
      <nav className="flex justify-center gap-4 md:gap-6 lg:gap-8">
        <Link href="/" className="text-white hover:text-gray-400">메인</Link>
        {session?.user ? (
          <form action={signOutWithForm}>
            <button type="submit" className="text-white hover:text-gray-400">로그아웃</button>
          </form>
        ) : (
          <Link href="/auth/signin" className="text-white hover:text-gray-400">로그인</Link>
        )}
      </nav>
    </header>
  )
}