import React from "react";
import axios from "axios";
import Card from "../components/Card";
// import AppContext from "../context";

function Orders(){
	// const {} = React.useContext(AppContext);
	const [orders, setOrders] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get("https://3623f7b0d3e9456f.mokky.dev/orders");
				setOrders(data.reduce((prev, obj) => [...prev,...obj.items], []));
				setIsLoading(false);
			} catch (error) {
				alert("Ошибка при запросе заказов", error);
			}
		})();
	}, []);
	 
	return (
		<div className="content p-40">
			<div className="d-flex align-center justify-between mb-40">
				<h1>Мои заказы</h1> 
			</div>

			<div className="sneakers">
				{(isLoading ? [...Array(12)] : orders).map((item, index) => (
						<Card
							key={index}
							loading = {isLoading}
							{...item}
						/>
				))}
			</div>
		</div>
	)
}

export default Orders;