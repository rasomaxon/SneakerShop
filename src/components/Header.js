function Header() {
  return (
<header>
	<div className="headerLeft">
		<img width={40} height={40} src="/img/logo.png" alt="logoSneakerShop" />
		<div className="headerInfo">
			<h3>React Sneakers</h3>
			<p>Магазин лучших кроссовок</p>
		</div>
	</div>
	<ul className="headerRight">
		<li>
			<img width={18} height={18} src="/img/cart.svg" alt="iconCart" />
			<span>1205 руб.</span>
		</li>
		<li>
			<img width={18} height={18} src="/img/user.svg" alt="iconUser" />
		</li>
	</ul>
</header>
	);
}
export default Header;