import React from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";


function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
			try {
				const cartResponce = await axios.get("https://3623f7b0d3e9456f.mokky.dev/cart");
				const favoritesResponce = await axios.get("https://3623f7b0d3e9456f.mokky.dev/favorites");
				const itemsResponce = await axios.get("https://3623f7b0d3e9456f.mokky.dev/items");
				
				setIsLoading(false);

				setCartItems(cartResponce.data);
				setFavorites(favoritesResponce.data);
				setItems(itemsResponce.data);
			} catch (error) {
        alert('Ошибка при запросе данных ;(');
        console.error(error);
      }
		}
			fetchData()
		}, []);


  const onAddToCart = async (obj) => {
    try {
			if (cartItems.find((item) => Number(item.id) === Number(obj.id))){
				axios.delete(`https://3623f7b0d3e9456f.mokky.dev/cart/${obj.id}`);
				setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)));
			}
			else{
				axios.post("https://3623f7b0d3e9456f.mokky.dev/cart", obj);
      	setCartItems((prev) => [...prev, obj]);
			}} 
		catch (error) {
      console.error("Ошибка при добавлении в корзину:", error);
    }    
  };

  const onRemoveItem = async (id) => {
    try {
      axios.delete(`https://3623f7b0d3e9456f.mokky.dev/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении:", error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://3623f7b0d3e9456f.mokky.dev/favorites/${obj.id}`);
				setFavorites((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post("https://3623f7b0d3e9456f.mokky.dev/favorites", obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      console.error("Не удалось добавить в избранное", error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

	const isItemAdded = (id) => {
		return cartItems.some((obj) => Number(obj.id) === Number(id))
	};

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems }}>
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
        <Route
          path="/"
          element={
            <Home
              items={items}
							cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
							isLoading={isLoading}
            />
          }
          exact
        />
      </Routes>

      <Routes>
        <Route 
					path="/favorites" 
					element={<Favorites/>}
					exact
        />
      </Routes>
    </div>
		</AppContext.Provider>
  );
}
export default App;
