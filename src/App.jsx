import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import Header from "./components/Header.js";
import Drawer from "./components/Drawer.js";

const arr = [
  { title: "Мужские Кроссовки Nike Blazer Mid Suede", price: 12999, imgUrl: "/img/sneakers/1.jpg", typeSneaker: "Кеды" },
  { title: "Мужские Кроссовки Nike Air Max 270", price: 12999, imgUrl: "/img/sneakers/2.jpg", typeSneaker: "Беговые" },
  { title: "Мужские Кроссовки Nike Blazer Mid Suede", price: 8499, imgUrl: "/img/sneakers/3.jpg", typeSneaker: "Кеды" },
  { title: "Кроссовки Puma X Aka Boku Future Rider", price: 8999, imgUrl: "/img/sneakers/4.jpg", typeSneaker: "Беговые" },
  { title: "Мужские Кроссовки Under Armour Curry 8", price: 15199, imgUrl: "/img/sneakers/5.jpg", typeSneaker: "Баскетбольные" },
  { title: "Мужские Кроссовки Nike Kyrie 7", price: 11299, imgUrl: "/img/sneakers/6.jpg", typeSneaker: "Баскетбольные" },
  { title: "Мужские Кроссовки Jordan Air Jordan 11", price: 10799, imgUrl: "/img/sneakers/7.jpg", typeSneaker: "Беговые" },
  { title: "Мужские Кроссовки Nike LeBron XVIII", price: 15499, imgUrl: "/img/sneakers/8.jpg", typeSneaker: "Баскетбольные" },
  { title: "Мужские Кроссовки Nike Lebron XVIII Low", price: 13999, imgUrl: "/img/sneakers/9.jpg", typeSneaker: "Баскетбольные" },
  { title: "Мужские Кроссовки Nike Blazer Mid Suede", price: 8499, imgUrl: "/img/sneakers/10.jpg", typeSneaker: "Кеды" },
  { title: "Кроссовки Puma X Aka Boku Future Rider", price: 8999, imgUrl: "/img/sneakers/11.jpg", typeSneaker: "Беговые" },
  { title: "Мужские Кроссовки Nike Kyrie Flytrap IV", price: 11299, imgUrl: "/img/sneakers/12.jpg", typeSneaker: "Баскетбольные" }
];

function App() {
  // Состояние для хранения фильтра и результата фильтрации
  const [filter, setFilter] = useState("");
  const [filteredArr, setFilteredArr] = useState(arr);
  const [searchQuery, setSearchQuery] = useState("");

  // Фильтрация массива при изменении фильтра
  useEffect(() => {
    let sortedArr = [...arr];

    switch (filter) {
      case "priceDown":
        sortedArr.sort((a, b) => b.price - a.price);
        break;
      case "priceUp":
        sortedArr.sort((a, b) => a.price - b.price);
        break;
      case "sneakerType":
        sortedArr.sort((a, b) => a.typeSneaker.localeCompare(b.typeSneaker));
        break;
      default:
        sortedArr = arr;
    }

    // Фильтр по поиску
    if (searchQuery) {
      sortedArr = sortedArr.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredArr(sortedArr);
  }, [filter, searchQuery]);

  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
      <div className="content">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>

          {/* Форма для фильтра */}
          <form className="customSelect">
            <select
              className="fieldFilter"
              name="filter"
              id="filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">Все</option>
              <option value="priceDown">Цена по убыванию</option>
              <option value="priceUp">Цена по возрастанию</option>
              <option value="sneakerType">Тип кроссовок</option>
            </select>
          </form>

          {/* Поле для поиска */}
          <div className="searchBlock">
            <img src="/img/search.svg" alt="searchIcon" />
            <input
              type="text"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Карточки с кроссовками */}
        <div className="sneakers">
          {filteredArr.map((obj, index) => (
            <Card key={index} title={obj.title} price={obj.price} imgUrl={obj.imgUrl} typeSneaker = {obj.typeSneaker} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
