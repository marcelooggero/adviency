import { useState, ChangeEvent, FormEvent } from 'react'
import IgiftName from '../interfaces/giftName';
import './CreateGift.css'

interface IProps{
    addGift: (gift: IgiftName) => void
}

const CreateGift = (props: IProps) => {

    const [name, setName] = useState<string>('')

    const onChange = (e:ChangeEvent<HTMLInputElement>) =>{
        setName(e.target.value)
    }
    const onSubmit = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if(name.length > 0){
            props.addGift({product:name})
            setName('')
        }
    }

    
    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <input onChange={onChange} value={name}  />
            <button className="add_button" type="submit"  id="button">Agregar </button>
        </form>
    )
}

export default CreateGift
