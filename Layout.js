import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

export default function Layout({ children, toggleTheme, currentTheme }) {
  return (
    <div className="scroll-smooth md:scroll-auto" id="fullpage">
      <div className="static">
        <div className="">
          <video className="videoTag" autoPlay loop muted>
            <source src="./bannerbg.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute" style={{ top: "0rem", left: "0", width: "100%", zIndex: 100 }}>
          <Navbar toggleTheme={toggleTheme} currentTheme={currentTheme} />
        </div>
      </div>

      {children}
      <Footer currentTheme={currentTheme} />
    </div>
  );
}
