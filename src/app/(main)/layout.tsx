import { FC, ReactNode } from 'react';
import Header from "@/components/Header";

export interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout:FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className='flex flex-col h-screen'>
            <Header />
            {children}
        </div>
    );
}

export default MainLayout;