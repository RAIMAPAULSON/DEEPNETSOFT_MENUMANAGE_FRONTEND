import FooterMain from "./FooterMain";
import FooterBottom from "./FooterBottom";

const Footer = () => {
  return (
    <footer>
      <div className="bg-dark text-white">
        <FooterMain />
        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;
