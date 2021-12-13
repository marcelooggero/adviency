import { useState, ChangeEvent, FormEvent } from 'react'
import IgiftName from '../interfaces/giftName';
import styles from  './CreateGift.module.css'

interface IProps{
    addGift: (gift: IgiftName) => void,
    setOpenModal: (state:boolean) => void,
    
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
        props.setOpenModal(false)
    }
    const onChangeQuantity = (e:ChangeEvent<HTMLInputElement> ) => {
        setQuantity(e.target.value)
    }    
    const onChangeImage = (e:ChangeEvent<HTMLInputElement> ) => {
        setImage(e.target.value)
    }
    
    return (
        <form className={styles.container_form} onSubmit={(e) => onSubmit(e)}>
            <div className={styles.group_text} >
                <input className={styles.input_gift} onChange={onChange} value={name} placeholder='Agregar Regalo?' />
                <input className={styles.input_image} type="url" value={image} onChange={onChangeImage}/>
                <input className={styles.input_quantity} type="number" placeholder='Cantidad' onChange={onChangeQuantity} value={quantity} min={1} max={50}/>
            </div>
            <div className={styles.group_buttons}>
                <button className={styles.cancel_button} type="submit"  id="button" onClick={()=>props.setOpenModal(false)}>Cancelar </button>
                <button className={styles.add_button} type="submit"  id="button">Agregar </button>
            </div>
        </form>
    )
}

export default CreateGift
