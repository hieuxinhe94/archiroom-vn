import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

export default function Layout ({children, toggleTheme, currentTheme}) {
    return (
        <div>
            <Navbar toggleTheme={toggleTheme} currentTheme={currentTheme}/>
            {children}
            <Footer currentTheme={currentTheme}/>
        </div>
    )
}
