import IgiftName from '../interfaces/giftName';
import styles from './GiftItem.module.css'

interface GiftItemPropsI {
    text: string,
    quantity: number,
    image: string,
    deleteGift: (gift: IgiftName) => void
}

const GiftItem = (props:GiftItemPropsI) => {

    const onDelete = () =>{
        props.deleteGift({product:props.text, image:'', quantity:0});
        
    }

    return (
        <div className={styles.container_item}>
            <img className={styles.input_image} src={props.image}/>
            <span className={styles.input_gift}>{props.text}</span>
            <span className={styles.input_quantity}>{props.quantity}</span>
            <button className={styles.delete_button} onClick={onDelete} >X</button>
        </div>
    )
}

export default GiftItem

