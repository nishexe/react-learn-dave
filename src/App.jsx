import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import "./App.css";
import { useState, useEffect } from "react";
function App() {
  const API_URL = "http://localhost:3500/items";
  const [fetchError, setFetchError] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not reciveve the data!");
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000);
  }, []);

  const [newItem, setNewItem] = useState("");

  const [search, setSearch] = useState("");

  const handleCheck = (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  };

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);
  };
  return (
    <>
      <Header title="Groceries" />
      <SearchItem search={search} setSearch={setSearch} />
      <AddItem
        newItem={newItem}
        handleSubmit={handleSubmit}
        setNewItem={setNewItem}
      />
      <main>
        {fetchError ? (
          <p style={{ color: "red" }}>Did not recive the data!</p>
        ) : (
          <>
            <Content
              items={items.filter((item) =>
                item.item.toLowerCase().includes(search.toLowerCase())
              )}
              handleCheck={handleCheck}
              handleDelete={handleDelete}
              isLoading={isLoading}
            />
          </>
        )}
      </main>
      <Footer length={items.length} isLoading={isLoading} />
    </>
  );
}

export default App;
