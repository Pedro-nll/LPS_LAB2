interface RegisterAndLoginLayoutProps {
    children: React.ReactNode;
}


export const RegisterAndLoginLayout: React.FC<RegisterAndLoginLayoutProps> = ({ children }) => {



    return (
        <div style={{ height: "100vh", backgroundColor: "#2b2e3b" }}>
            <img src="/logo.png" alt="Top Centered Image" style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", height: "20%", zIndex: 1, objectFit: "cover" }} />
            {children}
        </div>
    );
};