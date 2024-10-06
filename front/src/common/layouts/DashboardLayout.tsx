import React, { useState } from 'react';

import PrimarySearchAppBar from '../components/Navbar';
interface DashboardLayoutProps {
    children: React.ReactNode;
}

type Data = { id: number; icon: React.JSX.Element; label: string; location: string; }

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [openNavBar, setOpenNavBar] = useState<boolean>(false);



    return (
        <div style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column' }}>
            <PrimarySearchAppBar openSideBar={openNavBar} setOpenSideBar={setOpenNavBar} />
            <div style={{ display: "flex", backgroundColor: '#f3f4f6', flexGrow: 1 }}>

                <main style={{ width: '100%', margin: '16px' }}>{children}</main>
            </div>
        </div>
    );
};
