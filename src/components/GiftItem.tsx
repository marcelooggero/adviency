import IgiftName from '../interfaces/giftName';
import './GiftItem.css'

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
        <div className='container_item'>
            <img className='input_image' src={props.image}/>
            <span className='input_gift'>{props.text}</span>
            <span className='input_quantity'>{props.quantity}</span>
            <button className="delete_button" onClick={onDelete} >X</button>
        </div>
    )
}

export default GiftItem

