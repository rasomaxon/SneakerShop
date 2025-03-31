import styles from "./Card.module.scss";
import React from 'react';

function Card({id, title, imgUrl, price, onFavorite, onPlus, favorited = false}) {
	const [isAdded, setIsAdded] = React.useState(false);
	const [isFavorite, setIsFavorite] = React.useState(favorited);

	const onClickPlus = () => {
		onPlus({id, title, imgUrl, price});
		setIsAdded(!isAdded);
	}

	const onClickFavorite = () => {
		onFavorite({id, title, imgUrl, price});
		setIsFavorite(!isFavorite);
	}

  return (
	<div className={styles.card}>
		<div className={styles.favorite} onClick={onClickFavorite}>
			<img 
				src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"} 
			 	alt="Unliked" />
		</div>
		<img width={133} height={112} src={imgUrl} alt="Liked" />
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