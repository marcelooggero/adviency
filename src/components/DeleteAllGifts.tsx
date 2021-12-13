import IgiftName from '../interfaces/giftName';
import styles from './DeleteAllGifts.module.css';

interface IProps{
    deleteAllGifts: () => void
}

const DeleteAllGifts = (props: IProps) => {

    const deleteGifts = () => {
        props.deleteAllGifts();
    }
    
    return (
        <div>
            <button className={styles.deleteAll_button} type="button" onClick={deleteGifts}>Borrar Todos los regalos</button>
        </div>
    )
}

export default DeleteAllGifts
