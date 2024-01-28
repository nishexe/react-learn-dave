const Footer = ({ length, isLoading, fetchError }) => {
  if (fetchError) {
    return <footer></footer>;
  } else {
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
  }
};

export default Footer;
