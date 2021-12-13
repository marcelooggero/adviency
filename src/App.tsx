import { useState } from "react";
import GiftList from "./components/GiftList";
import GiftItem from "./components/GiftItem";
import DeleteAllGifts from './components/DeleteAllGifts'
import CreateGift from "./components/CreateGift";
import IgiftName from "../src/interfaces/giftName";
import {Modal} from './Modal'
import styles from './App.module.css'
import "./styles.css";

export default function App() {
  const localStorageGifts = localStorage.getItem('ADVIENCY');
  let parsedGifts: IgiftName[];

  if (!localStorageGifts) {
    localStorage.setItem('ADVIENCY', JSON.stringify([]));
    parsedGifts = [];
  } else {
    parsedGifts = JSON.parse(localStorageGifts);
  }

  const [giftList, setGiftList] = useState(parsedGifts);
  const [openModal, setOpenModal]= useState(false);

  const saveGifts = (gift: IgiftName) => {
    setGiftList(prevState => {return [...prevState, gift]});
    let array= giftList
    array.push(gift)
    localStorage.setItem('ADVIENCY', JSON.stringify(array));
    
  }

  const addGift = (gift: IgiftName) => {
    giftList.some(item => item.product.toLowerCase() === gift.product.toLowerCase()) 
    ? alert('El producto ya existe') 
    : saveGifts(gift);
    
    
  };
  const deleteGift = (gift: IgiftName) => {
    setGiftList(giftList.filter((item) => item.product !== gift.product));
    let array = giftList.filter((item) => item.product !== gift.product);
    localStorage.setItem('ADVIENCY', JSON.stringify(array));
    
  };
  const deleteAllGifts = () => {
    setGiftList([]);
    localStorage.setItem('ADVIENCY', JSON.stringify([]));
    
  }

    
  

  return (
    <div className="App">
      <div className={styles.container}>
        <h1 className={styles.text_title} >Regalos:</h1>
        <button className={styles.addGift_button} onClick={()=> {setOpenModal(prevState => !prevState) }}>Agregar Regalo</button>
      </div>
      {giftList.length ? (
        <div>
          <GiftList>
            {giftList.map((gift) => (
              <GiftItem
                deleteGift={deleteGift}
                key={gift.product}
                text={gift.product}
                image={gift.image}
                owner={gift.owner}
                quantity={gift.quantity}
              />
            ))}
          </GiftList>
          <DeleteAllGifts deleteAllGifts={deleteAllGifts} />
        </div>
      ) : (
        <div>
          <span>Papa Noel está aburrido,🎅</span>
          <br />
          <span>por favor agrega algo en la lista</span>
        </div>
      )}
      {openModal && (
        <Modal>
          <CreateGift addGift={addGift} setOpenModal={setOpenModal} />
        </Modal>

      )}
    </div>
  );
}
