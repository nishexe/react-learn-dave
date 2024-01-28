const Footer = ({ length, isLoading }) => {
  const today = new Date();
  return (
    <footer>
      {isLoading ? (
        <p>Loading items!</p>
      ) : (
        <p>
          You have {length} {length > 1 ? "items" : "item"} in the list
        </p>
      )}
    </footer>
  );
};

export default Footer;
