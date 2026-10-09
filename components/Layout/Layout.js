import { Footer } from "@components/Footer";
import { Header } from "@components/Header";
import { Analytics } from "@vercel/analytics/react"

export const Layout = ({ children, className = "", careerPage = false }) => {
    return (
        <main
            className={`main relative overflow-hidden ${
                className && className
            }`}
        >
            <Header careerPage={careerPage} />
            {children}
            <Footer careerPage={careerPage} />
            <Analytics />
        </main>
    );
};
