// ./src/components/footer.js

const Footer = () => {
  const imageStyle = {
    height: "20px", // or any other size
    width: "70px",
    marginLeft: "10px", // or any other size
  };

  return (
    <footer className="bg-dark text-light p-3 text-center mt-auto">
      &copy; {new Date().getFullYear()}
      <img src="/dw1.png" style={imageStyle} alt="Digitson Logo" />
    </footer>
  );
};

export default Footer;
