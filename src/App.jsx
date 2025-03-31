import React from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from './pages/Favorites';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios
      .get("https://3623f7b0d3e9456f.mokky.dev/items")
      .then((res) => {
        setItems(res.data);
      });
    axios
      .get("https://3623f7b0d3e9456f.mokky.dev/cart")
      .then((res) => {
        setCartItems(res.data);
      });
		axios
      .get("https://3623f7b0d3e9456f.mokky.dev/favorites")
      .then((res) => {
        setFavorites(res.data);
      });
  }, []);

  const onAddToCart = async (obj) => {
		try {
			const { data } = await axios.post("https://3623f7b0d3e9456f.mokky.dev/cart", obj);
			setCartItems((prev) => [...prev, data]);
		} catch (error) {
			console.error("Ошибка при добавлении в корзину:", error);
		}
	};

  const onRemoveItem = async (id) => {
  try {
    await axios.delete(`https://3623f7b0d3e9456f.mokky.dev/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
		} catch (error) {
			console.error("Ошибка при удалении:", error);
		}
	};

  const onAddToFavorite = async (obj) => {
		try {if (favorites.find((favObj) => favObj.id === obj.id)) {
			axios.delete(`https://3623f7b0d3e9456f.mokky.dev/favorites/${obj.id}`);
		
		} else {
			const { data } = await axios.post("https://3623f7b0d3e9456f.mokky.dev/favorites", obj);
    	setFavorites((prev) => [...prev, data]);
		}}
		catch {
			alert('Не удалось добавить в избранное')
		}
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />
      )}
      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route path="/" element={
					<Home
						items={items}
						searchValue={searchValue}
						setSearchValue={setSearchValue}
						onChangeSearchInput={onChangeSearchInput}
						onAddToFavorite={onAddToFavorite}
						onAddToCart={onAddToCart}
					/>
        } exact/>
      </Routes>

			<Routes>
        <Route path="/favorites" element={
					<Favorites items={favorites} onAddToFavorite={onAddToFavorite}/>
        } exact/>
      </Routes>
    </div>
  );
}
export default App;
