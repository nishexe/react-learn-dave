import ItemList from "./ItemList";
const Content = ({ items, handleCheck, handleDelete, isLoading }) => {
  if (isLoading) {
    return <p>Loading items!</p>;
  } else {
    return (
      <>
        {items.length ? (
          <ItemList
            items={items}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        ) : (
          <p>NO ITEMS IN THE LIST</p>
        )}
      </>
    );
  }
};

export default Content;
