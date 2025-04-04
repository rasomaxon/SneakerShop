import React from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import AppContext from "./context";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";


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
				const [cartResponce, favoritesResponce, itemsResponce] = await Promise.all([
					await axios.get("https://3623f7b0d3e9456f.mokky.dev/cart"),
					await axios.get("https://3623f7b0d3e9456f.mokky.dev/favorites"),
          await axios.get("https://3623f7b0d3e9456f.mokky.dev/items")]);
				
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
			const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
			if (findItem){
				setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
				await axios.delete(`https://3623f7b0d3e9456f.mokky.dev/cart/${findItem.id}`);
			}
			else{
				setCartItems((prev) => [...prev, obj]);
				const {data} = await axios.post("https://3623f7b0d3e9456f.mokky.dev/cart", obj);
      	setCartItems((prev) => [...prev, prev.map(item => {
					if (item.parentId === data.parentId) {
						return {
							...item,
							id: data.id
						};}
					return item;
				})]);
			}} 
		catch (error) {
      console.error("Ошибка при добавлении в корзину:", error);
    }    
  };

  const onRemoveItem = async (id) => {
    try {
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
      await axios.delete(`https://3623f7b0d3e9456f.mokky.dev/cart/${id}`);
    } catch (error) {
      console.error("Ошибка при удалении:", error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
				setFavorites((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)));
        axios.delete(`https://3623f7b0d3e9456f.mokky.dev/favorites/${obj.id}`);
      } else {
        setFavorites((prev) => [...prev, data]);
        const { data } = await axios.post("https://3623f7b0d3e9456f.mokky.dev/favorites", obj);
      }
    } catch (error) {
      console.error("Не удалось добавить в избранное", error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

	const isItemAdded = (id) => {
		return cartItems.some((obj) => Number(obj.parentId) === Number(id))
	};

  return (
    <AppContext.Provider 
			value={{ 
				items, 
				cartItems, 
				favorites, 
				isItemAdded, 
				onAddToFavorite, 
				onAddToCart,
				setCartOpened, 
				setCartItems 
			}}>
			<div className="wrapper clear">
				<Drawer
						items={cartItems}
						onClose={() => setCartOpened(false)}
						onRemove={onRemoveItem}
						opened={cartOpened}
        	/>
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

			<Routes>
        <Route 
					path="/orders"  
					element={<Orders/>}
					exact
        />
      </Routes>

    </div>
		</AppContext.Provider>
  );
}
export default App;
