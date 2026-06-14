import { useEffect, useState } from "react";
import "./App.css";
import type { Item } from "./type";
import Summary from "./components/Summary";
import FilterBar from "./components/FilterBar";
import AddForm from "./components/AddForm";
import ItemList from "./components/ItemList";

const defaultItems: Item[] = [
  {
    id: 1,
    title: "Cyberpunk",
    type: "game",
    status: "done",
    rating: 4,
    coverUrl: "/covers/cyberpunk.jpg",
    year: 2021,
    note: "",
  },
  {
    id: 2,
    title: "EVA",
    type: "anime",
    status: "done",
    rating: 5,
    coverUrl: "",
    year: 1998,
    note: "",
  },
];

function App() {
  const [items, setItems] = useState<Item[]>(() => {
    const savedItems = localStorage.getItem("react-book-tracker-items");
    if (savedItems === null) {
      return defaultItems;
    }
    return JSON.parse(savedItems);
  });
  const [title, setTitle] = useState("");
  const [type, setType] = useState("book");
  const [status, setStatus] = useState("want");
  const [rating, setRating] = useState(3);
  const [year, setYear] = useState(2016);
  const [note, setNote] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [coverUrl, setCoverUrl] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [editingId, setEditingId] = useState<number | null>(null);

  const filteredItems = items.filter((item) => {
    const searchKey = searchText.trim().toLowerCase();
    const matchSearch = item.title.toLowerCase().includes(searchKey);
    const matchType = item.type === filterType || filterType === "all";
    const matchStatus = item.status === filterStatus || filterStatus === "all";
    return matchSearch && matchType && matchStatus;
  });

  function handleAddItem() {
    if (title.trim() === "") {
      return;
    }
    const newItem: Item = {
      id: editingId === null ? Date.now() : editingId,
      title: title.trim(),
      type,
      status,
      rating,
      year,
      note,
      coverUrl: coverUrl.trim(),
    };

    if (editingId === null) {
      setItems([...items, newItem]);
    } else {
      const newItems = items.map((item) => {
        if (item.id === editingId) {
          return newItem;
        }
        return item;
      });
      setItems(newItems);
    }

    setEditingId(null);
    setTitle("");
    setType("book");
    setStatus("want");
    setRating(3);
    setCoverUrl("");
    setNote("");
    setYear(2016);
  }

  const displayItems = [...filteredItems];
  if (sortBy === "rating") {
    displayItems.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "year") {
    displayItems.sort((a, b) => b.year - a.year);
  } else if (sortBy === "title") {
    displayItems.sort((a, b) => a.title.localeCompare(b.title));
  }

  function handleDeleteItem(id: number): void {
    const newItems: Item[] = items.filter(
      (currentItem) => currentItem.id !== id,
    );
    setItems(newItems);
  }

  function handleStartEdit(item: Item) {
    setEditingId(item.id);
    setTitle(item.title);
    setType(item.type);
    setStatus(item.status);
    setRating(item.rating);
    setYear(item.year);
    setNote(item.note);
    setCoverUrl(item.coverUrl);
  }

  function handleCancelEdit() {
    setEditingId(null);
    setTitle("");
    setType("book");
    setStatus("want");
    setRating(3);
    setYear(2016);
    setNote("");
    setCoverUrl("");
  }

  const totalCount = items.length;
  const showingCount = displayItems.length;

  useEffect(() => {
    localStorage.setItem("react-book-tracker-items", JSON.stringify(items));
  }, [items]);

  return (
    <div className="app">
      <h1>Book Tracker</h1>
      <FilterBar
        searchText={searchText}
        setSearchText={setSearchText}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterType={filterType}
        setFilterType={setFilterType}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <AddForm
        title={title}
        setTitle={setTitle}
        type={type}
        setType={setType}
        status={status}
        setStatus={setStatus}
        note={note}
        setNote={setNote}
        year={year}
        setYear={setYear}
        rating={rating}
        setRating={setRating}
        coverUrl={coverUrl}
        setCoverUrl={setCoverUrl}
        onAdd={handleAddItem}
        isEditing={editingId !== null}
        onCancelEdit={handleCancelEdit}
      />
      <ItemList
        items={displayItems}
        onDeleteItem={handleDeleteItem}
        onEditItem={handleStartEdit}
      />
      <Summary totalCount={totalCount} showingCount={showingCount} />
    </div>
  );
}

export default App;
