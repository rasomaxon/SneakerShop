import React from 'react'
import { Link } from 'react-router-dom';

import {useCart} from "../hooks/useCart"
function Header(props) {

	const { totalPrice } = useCart();
	
  return (
		<header>
			<Link to="/">
				<div className="headerLeft">
					<img width={40} height={40} src="/img/logo.png" alt="logoSneakerShop"/>
					<div className="headerInfo">
						<h3>React Sneakers</h3>
						<p>Магазин лучших кроссовок</p>
					</div>
				</div>
			</Link>
			<ul className="d-flex">
				<li onClick = {props.onClickCart} className='mr-30 cu-p'>
					<img width={18} height={18} src="/img/cart.svg" alt="Корзина" />
					<span>{totalPrice} руб.</span>
				</li>
				<li className='mr-20 cu-p'>
					<Link to="/favorites">
						<img width={20} height={20} src="/img/heart.svg" alt="Закладки" />
					</Link>
				</li>
				<li className='cu-p'>
					<Link to="/orders">
						<img width={20} height={20} src="/img/user.svg" alt="Пользователь" />
					</Link>
				</li>
			</ul>
		</header>
	);
}
export default Header;