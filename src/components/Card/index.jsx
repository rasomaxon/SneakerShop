import styles from "./Card.module.scss";
import React from 'react';

function Card({title, imgUrl, price, onFavorite, onPlus}) {
	const [isAdded, setIsAdded] = React.useState();

	const onClickPlus = () => {
		onPlus(title, imgUrl, price);
		setIsAdded(!isAdded);
	}

  return (
	<div className={styles.card}>
		<div className={styles.favorite} onClick={onFavorite}>
			<img src="/img/heart-unliked.svg" alt="Unliked" />
		</div>
		<img width={133} height={112} src={imgUrl} alt="" />
		<h5>{title}</h5>
		<div className={styles.cardBottom}>
			<div className='d-flex flex-column'>
				<span>Цена:</span>
				<b>{price}</b>
			</div>
			<img 
				className={styles.plus} 
				onClick={onClickPlus} 
				src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} 
				alt="" />
		</div>	
	</div>
	);
}
export default Card;