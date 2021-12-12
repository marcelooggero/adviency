import { useState, ChangeEvent, FormEvent } from 'react'
import IgiftName from '../interfaces/giftName';
import './CreateGift.css'

interface IProps{
    addGift: (gift: IgiftName) => void,
    
}

const CreateGift = (props: IProps) => {

    
    const [quantity, setQuantity] = useState<string>('1')
    const [name, setName] = useState<string>('')
    const [image, setImage] = useState<string>('http://image')

    const onChange = (e:ChangeEvent<HTMLInputElement>) =>{
        setName(e.target.value)
    }
    const onSubmit = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if(name.length > 0){
            props.addGift({product:name, image: image ,quantity:parseInt(quantity)})
            setName('')
        }
    }
    const onChangeQuantity = (e:ChangeEvent<HTMLInputElement> ) => {
        setQuantity(e.target.value)
    }    
    const onChangeImage = (e:ChangeEvent<HTMLInputElement> ) => {
        setImage(e.target.value)
    }
    
    return (
        <form className='container_form' onSubmit={(e) => onSubmit(e)}>
            <input className='input_gift' onChange={onChange} value={name} placeholder='Agregar Regalo?' />
            <input className='input_image' type="url" value={image} onChange={onChangeImage}/>
            <input className='input_quantity' type="number" placeholder='Cantidad' onChange={onChangeQuantity} value={quantity} min={1} max={50}/>
            <button className="add_button" type="submit"  id="button">Agregar </button>
        </form>
    )
}

export default CreateGift
