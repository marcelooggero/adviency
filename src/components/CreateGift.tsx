import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import IgiftName from '../interfaces/giftName';
import styles from './CreateGift.module.css'

interface IProps {
    addGift: (gift: IgiftName) => void,
    setOpenModal: (state: boolean) => void,
    edit: boolean;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>,
    editGift: IgiftName,
    giftList: IgiftName[],
    setGiftList: (gift: IgiftName[]) => void,
    index: number,
    surprise: IgiftName[]
}

const CreateGift = (props: IProps) => {


    const [name, setName] = useState<string>('')
    const [image, setImage] = useState<string>('http://image')
    const [owner, setOwner] = useState<string>('')
    const [quantity, setQuantity] = useState<string>('1')
    const [price, setPrice] = useState<number>(0)


    if (props.edit) {
        useEffect(() => {
            if (props.editGift) {
                setName(props.editGift.product)
                setOwner(props.editGift.owner)
                setImage(props.editGift.image)
                setQuantity(props.editGift.quantity.toString())
                setPrice(props.editGift.price)
            }
        }, [])
    }


    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (props.edit) {
            let gift = props.giftList.filter(item => item.id === props.editGift.id)
            const index = props.giftList.indexOf(gift[0])
            let editedGiftList = [...props.giftList.slice(0, index), {
                id: props.editGift.id,
                product: name,
                image: image,
                owner: owner,
                quantity: parseInt(quantity),
                price: price
            }, ...props.giftList.slice(index + 1)]
            props.setGiftList(editedGiftList)
            // localStorage.setItem('ADVIENCY', JSON.stringify(editedGiftList));
            props.setEdit(false)
        } else if (name.length > 0) {
            props.addGift({ id: props.giftList.length + 1, product: name, image: image, owner: owner, quantity: parseInt(quantity), price:price })
            setName('')
        }
        props.setOpenModal(false)
    }
    const onChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
        setQuantity(e.target.value)
    }
    const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        setImage(e.target.value)
    }
    const onChangeOwner = (e: ChangeEvent<HTMLInputElement>) => {
        setOwner(e.target.value)
    }

    const OnClickSurpriseme = () => {
        let number = Math.floor(Math.random() * props.surprise.length)
        console.log(props.surprise[number])
        setName(props.surprise[number].product)
        setOwner(props.surprise[number].owner)
        setImage(props.surprise[number].image)
        setQuantity(props.surprise[number].quantity.toString())
        setPrice(props.surprise[number].price)
    }

    const onChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
        setPrice(parseInt(e.target.value))
    }

    return (
        <form className={styles.container_form} onSubmit={(e) => onSubmit(e)} accessKey='down' >
            <button className={styles.surpriseme_button} type="button" onClick={OnClickSurpriseme}  >Sorpréndeme!!</button>
            <div className={styles.group_text} >
                <input className={styles.input_gift} onChange={onChange} value={name} placeholder='Agregar Regalo?' autoFocus />
                <input className={styles.input_owner} onChange={onChangeOwner} value={owner} placeholder='Para quién es?' />
                <input className={styles.input_image} onChange={onChangeImage} type="url"  value={image} />
                <label className={styles.label_quantity} htmlFor="quantity">Cantidad:</label>

                <input className={styles.input_quantity} id="quantity" onChange={onChangeQuantity} type="number"  value={quantity} min={1} max={50} />
                <label className={styles.label_quantity} htmlFor="price">Precio:</label>
                <input className={styles.input_quantity} id="price" onChange={onChangePrice} type="number"  value={price} min={0} />
            </div>
            <div className={styles.group_buttons}>
                <button className={styles.cancel_button} type="button" id="button" onClick={() => { props.setOpenModal(false); props.setEdit(false) }}>Cancelar </button>
                <button className={styles.add_button} type="submit" id="button">{props.edit ? 'Modificar' : 'Agregar'} </button>
            </div>
        </form>
    )
}

export default CreateGift
