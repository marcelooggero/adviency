import IgiftName from '../interfaces/giftName';
import './GiftItem.css'

interface GiftItemPropsI {
    text: string,
    quantity: number,
    deleteGift: (gift: IgiftName) => void
}

const GiftItem = (props:GiftItemPropsI) => {

    const onDelete = () =>{
        props.deleteGift({product:props.text, quantity:0});
        // console.log("deletinggggg")
    }



    return (
        <div className='container_item'>
            <span className='input_gift'>{props.text}</span>
            <span className='input_quantity'>{props.quantity}</span>
            <button className="delete_button" onClick={onDelete} >X</button>
        </div>
    )
}

export default GiftItem

