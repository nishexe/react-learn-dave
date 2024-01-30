import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Content from "./Content";
import AddItem from "./AddItem";
import apiRequest from "./apiRequest";
import SearchItem from "./SearchItem";
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

  const handleCheck = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
    // console.log("inside handlecheck");
  };

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    const deleteOptions = { method: "DELETE" };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  };

  const addItem = async (item) => {
    // const id = items.length ? items[items.length - 1].id + 1 : 1;
    const id = items.length ? parseInt(items[items.length - 1].id) + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myNewItem),
    };
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
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
      <Footer
        length={items.length}
        isLoading={isLoading}
        fetchError={fetchError}
      />
    </>
  );
}

export default App;
