
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type SidebarProps = {
    children: ReactNode;
    setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
    openSideBar: boolean;
};

type SidebarItemProps = {
    icon: ReactNode;
    text: string;
    active?: boolean;
    alert?: boolean;
    location: string;
};

type SidebarContextType = {
    expanded: boolean;
};

const SidebarContext = createContext<SidebarContextType>({
    expanded: true,
});

const StyledBox = styled(Box)(({ theme }) => ({
    // backgroundColor: theme.palette.secondary.dark,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    height: '100%',
}));

export default function CustomSidebar({ children, openSideBar }: SidebarProps): JSX.Element {
    const [expanded, setExpanded] = useState(openSideBar);
    useEffect(() => {
        setExpanded(openSideBar);
    }, [openSideBar]);
    return (
        <>
            <aside>
                <StyledBox>
                    <SidebarContext.Provider value={{ expanded }}>
                        <ul className="flex-1 px-3 pt-5">{children}</ul>
                    </SidebarContext.Provider>
                </StyledBox>
            </aside>
        </>
    );
}

export function SidebarItem({ icon, text, active, alert, location }: SidebarItemProps): JSX.Element {
    const { expanded } = useContext(SidebarContext);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    if (pathname === location) {
        active = true;
    }

    return (
        <li
            onClick={() => {
                navigate(location);
            }}
            className={`relative flex items-center py-2 px-3 my-1 font-medium rounded cursor-pointer group hover:outline outline-2 outline-neutral-500 hover:text-white
        ${active ?
                    'bg-gradient-to-tr text-neutral-100 bg-neutral-800 hover:bg-neutral-700 ' :
                    'hover:bg-neutral-900 text-neutral-200   '
                }`}
        >
            {icon}
            <span className={`overflow-hidden ${expanded ? 'w-52 ml-3' : 'w-0'}`}
                style={{
                    transitionProperty: 'width, margin-left',
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    transitionDuration: '150ms'
                }}>
                {text}
            </span>
            {alert && <div className={`absolute right-2 w-2 h-2 rounded bg-neutral-400 ${expanded ? '' : 'top-2 '}`} />}

            {!expanded && (
                <div
                    className={`absolute left-full rounded px-2 py-1 ml-6 bg-neutral-900 z-50 text-white text-sm invisible opacity-20
                    -translate-x-3 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
                >
                    {text}
                </div>
            )}
        </li>
    );
}
