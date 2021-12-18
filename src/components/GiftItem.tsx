import { FiEdit } from 'react-icons/fi';
import IgiftName from '../interfaces/giftName';
import styles from './GiftItem.module.css'
import GiftList from './GiftList';

interface GiftItemPropsI {
    id: number,
    text: string,
    quantity: number,
    image: string,
    owner: string,
    price: number,
    deleteGift: (gift: IgiftName) => void,
    setEditGift: (gift: IgiftName) => void,
    giftList: IgiftName[],
    setEdit: (aaa: boolean) => void,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const GiftItem = (props: GiftItemPropsI) => {

    const onDelete = (text: string) => {
        // props.deleteGift({ id:0,product: props.text, image: '', owner: '', quantity: 0 });
        props.deleteGift(props.giftList.filter(item => item.product === text)[0])

    }
    const onEdit = (text: string) => {
        let objeto = props.giftList.filter(item => item.product === text)
        props.setEditGift(objeto[0])
        props.setEdit(true)
        props.setOpenModal(true)

    }

    return (
        <div className={styles.container_item}>
            <img className={styles.input_image} src={props.image} />
            <div className={styles.group_gift_owner}>
                <span className={styles.input_gift}>{props.text}</span>
                <span className={styles.owner_gift}>{props.owner}</span>
            </div>
            <span className={styles.input_quantity}>x {props.quantity}</span>
            <span className={styles.input_quantity}>$ {props.quantity * props.price}</span>
            <FiEdit tabIndex={0} className={styles.edit_button} onClick={() => onEdit(props.text)} />
            <button className={styles.delete_button} onClick={() => onDelete(props.text)} >X</button>
        </div>
    )
}

export default GiftItem

