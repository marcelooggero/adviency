import IgiftName from "../interfaces/giftName";
import styles from "./Comprar.module.css";


interface IComprar {
  giftList: IgiftName[] | undefined;
  openModal_prev: boolean;
  setOpenModal_prev: (value: boolean) => void;
}

const Comprar = (props: IComprar) => {

    const close=() => { 
        props.setOpenModal_prev(false)
    }


  if (props.giftList != undefined) {
    return (
      <div className={styles.container_item}>
        <h1>Comprar:</h1>
        {props.giftList.map((gift) => (
          <div className={styles.subcontainer}>
            <img className={styles.input_image} src={gift.image} />
            <div className={styles.group_gift_owner}>
              <span className={styles.input_gift}>{gift.product}</span>
              <span className={styles.owner_gift}>{gift.owner}</span>
            </div>
            <span className={styles.quantity}>{gift.quantity}</span>
          </div>
        ))}
        <button className={styles.close_button} onClick={close} >Cerrar:</button>
      </div>
    );
  } else {
    return <h1>No hay regalos todavía...</h1>;
  }
};

export default Comprar
