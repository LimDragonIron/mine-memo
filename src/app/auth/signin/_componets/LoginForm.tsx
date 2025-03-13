'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { signInWithGoogle } from '@/actions/auth'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'

const LoginForm = () => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader className="flex items-center justify-center text-2xl font-bold">
        Login
      </CardHeader>
      <CardContent>
        <form action={signInWithGoogle}>
          <Button size="lg" className="w-full" variant="outline" type="submit">
            <FcGoogle className="h-5 w-5" /> Sign In with Google
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default LoginForm
