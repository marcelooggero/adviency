import IgiftName from '../interfaces/giftName';

interface IProps{
    deleteAllGifts: () => void
}

const DeleteAllGifts = (props: IProps) => {

    const deleteGifts = () => {
        props.deleteAllGifts();
    }
    
    return (
        <div>
            <button className="delete_button" type="button" onClick={deleteGifts}>Borrar Todos los regalos</button>
        </div>
    )
}

export default DeleteAllGifts
