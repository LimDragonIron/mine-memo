import { FC, ReactNode } from 'react'
import Header from '@/components/Header'
import { Separator } from '@/components/ui/separator'
import { DesktopSidebar } from '@/components/Sidebar'

export interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <DesktopSidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <Header />
        <Separator />
        <div className="overflow-auto">
          <div className="flex-1 container py-4 text-accent-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainLayout
