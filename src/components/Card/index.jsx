import styles from "./Card.module.scss";

function Card(props) {
const onClickButton = () => {
	alert(props.title)
}

  return (
	<div className={styles.card}>
		<div className={styles.favorite}>
			<img src="/img/heart-unliked.svg" alt="Unliked" />
		</div>
		<img width={133} height={112} src={props.imgUrl} alt="" />
		<h5>{props.title}</h5>
		<span className={styles.typeSneaker}>{props.typeSneaker}</span>
		<div className={styles.cardBottom}>
			<div className='price'>
				<span>Цена:</span>
				<b>{props.price}</b>
			</div>
			<button className='button' onClick={onClickButton}>
				<img width={11} height={11} src="/img/plus.svg" alt="" />
			</button>
		</div>	
	</div>
	);
}
export default Card;
