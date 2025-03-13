'use client'

import { signOutWithForm } from '@/actions/auth'

interface LogoutButtonProps {
  children?: React.ReactNode
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = async () => {
    await signOutWithForm()
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}
