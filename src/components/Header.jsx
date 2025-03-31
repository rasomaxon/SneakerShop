import { Link } from 'react-router-dom';
function Header(props) {
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
					<span>1205 руб.</span>
				</li>
				<li className='mr-20 cu-p'>
					<Link to="/favorites">
						<img width={18} height={18} src="/img/heart.svg" alt="Закладки" />
					</Link>
				</li>
				<li>
					<img width={18} height={18} src="/img/user.svg" alt="Пользователь" />
				</li>
			</ul>
		</header>
	);
}
export default Header;