import React from 'react';
import Card from "./components/Card";
import Header from "./components/Header.js";
import Drawer from "./components/Drawer.js";

function App() {
	const [items, setItems] = React.useState([]);
	const [cartItems, setCartItems] = React.useState([]);
	const [searchValue, setsearchValue] = React.useState('');
	const [cartOpened, setCartOpened] = React.useState(false);

	React.useEffect(() => {
		fetch ("https://67e2d5ba97fc65f53537cada.mockapi.io/items")
		.then((res) => {
			return res.json();
		})
		.then((json) => {
			setItems(json);
		});
	}, [])
	
	const onAddToCart = (obj) => {
		setCartItems([...cartItems, obj]);
	}

  return (
		<div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)}/>}
      <Header onClickCart = {() => setCartOpened(true)} />
      <div className="content">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
					<div className="search-block d-flex">
						<img src="/img/search.svg" alt="iconSearch" />
						<input placeholder='Поиск...' />
					</div>
        </div>
   
        <div className="sneakers">
          {items.map((item, index) => (
            <Card 
							key={index}
							title={item.title} 
							price={item.price} 
							imgUrl={item.imgUrl} 
							onFavorite={()  => console.log("Добавили в закладки")}
							onPlus={(obj)  => onAddToCart(item)} 
						/>
          ))}
        </div>
      </div>
		</div>
  );
}export default App;