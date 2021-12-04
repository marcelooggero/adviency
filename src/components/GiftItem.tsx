import IgiftName from '../interfaces/giftName';
import './GiftItem.css'

interface GiftItemPropsI {
    text: string,
    deleteGift: (gift: IgiftName) => void
}

const GiftItem = (props:GiftItemPropsI) => {

    const onDelete = () =>{
        props.deleteGift({product:props.text});
    }



    return (
        <div>
            {props.text}
            <button className="delete_button" onClick={onDelete} >X</button>
        </div>
    )
}

export default GiftItem

