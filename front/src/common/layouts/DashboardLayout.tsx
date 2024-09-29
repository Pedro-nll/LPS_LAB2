import React, { useState } from 'react';

import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BookIcon from '@mui/icons-material/Book';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import GradingIcon from '@mui/icons-material/Grading';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import PrimarySearchAppBar from '../components/Navbar';
import CustomSidebar, { SidebarItem } from '../components/Sidebar';
interface DashboardLayoutProps {
    children: React.ReactNode;
}

 type Data = { id: number; icon: React.JSX.Element; label: string; location: string; }

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [openNavBar, setOpenNavBar] = useState<boolean>(false);
    var data:Data[]= []

    const { user } = useSelector(state => state.userReducer);

    switch (user.userType) {
       case 'STUDENT':
               data  = [
                   { id: 1, icon: <FactCheckIcon />, label: 'Matricula', location: '/registration' },
               ]
           break;
           case 'TEACHER':
               data = [
                   { id: 1, icon: <GradingIcon />, label: 'Materias', location: '/teacherSubject' },
               ]
           break;
           case 'SECRETARY':
               data = [
                   { id: 1, icon: <SchoolIcon />, label: 'Cursos', location: '/course' },
                   { id: 2, icon: <BookIcon />, label: 'Curriculos', location: '/curriculum' },
                   { id: 3, icon: <PersonIcon />, label: 'Estudantes', location: '/student' },
                   { id: 4, icon: <AssignmentIndIcon />, label: 'Professores', location: '/teacher' },
                   { id: 5, icon: <BookIcon />, label: 'Disciplinas', location: '/disciplines' },
                   { id: 5, icon: <BookIcon />, label: 'Materias', location: '/subjects' },
               ]
           break;
       default:
           break;
    }

    return (
        <Box sx={{ minHeight: '100svh', display: 'flex', flexDirection: 'column' }}>
            <PrimarySearchAppBar openSideBar={openNavBar} setOpenSideBar={setOpenNavBar} />
            <Box display={'flex'} sx={{ backgroundColor: '#f3f4f6', flexGrow: 1 }}>
                <CustomSidebar openSideBar={openNavBar} setOpenSideBar={setOpenNavBar}>
                    {data.map((item) => (
                        <SidebarItem key={item.id} icon={item.icon} text={item.label} location={item.location} />
                    ))}
                </CustomSidebar>
                <main style={{ width: '100%', margin: '16px' }}>{children}</main>
            </Box>
        </Box>
    );
};
