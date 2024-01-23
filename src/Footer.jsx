const Footer = ({ length }) => {
  const today = new Date();
  return (
    <footer>
      <p>
        You have {length} {length > 1 ? "items" : "item"} in the list
      </p>
    </footer>
  );
};

export default Footer;
