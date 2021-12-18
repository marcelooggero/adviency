import { useState, useEffect } from "react";
import GiftList from "./components/GiftList";
import GiftItem from "./components/GiftItem";
import DeleteAllGifts from './components/DeleteAllGifts'
import CreateGift from "./components/CreateGift";
import IgiftName from "../src/interfaces/giftName";

import { Modal } from './Modal'
import { api } from './api'
import styles from './App.module.css'
import "./styles.css";

export default function App() {
  const [giftList, setGiftList] = useState<IgiftName[]>([]);


  // const localStorageGifts
  let parsedGifts: IgiftName[];
  // if (!localStorageGifts) {
  //   localStorage.setItem('ADVIENCY', JSON.stringify([]));
  parsedGifts = [];
  // } else {
  //   parsedGifts = JSON.parse(localStorageGifts);
  // }

  const [openModal, setOpenModal] = useState(false);
  const [editGift, setEditGift] = useState<IgiftName>(parsedGifts[0]);
  const [edit, setEdit] = useState(false)
  const [loading, setLoading] = useState(true)
  let index = giftList.length


  const surprise: IgiftName[] = [
    { id: 10000, product: 'anana', quantity: 5, owner: 'Paula', price:2, image: 'https://http2.mlstatic.com/D_NQ_NP_955920-MLA43554051071_092020-O.webp' },
    { id: 10001, product: 'manzana', quantity: 4, owner: 'Carla', price:3, image: 'https://http2.mlstatic.com/D_NQ_NP_774924-MLA47764225403_102021-O.webp' },
    { id: 10002, product: 'pera', quantity: 3, owner: 'Andrea', price:1, image: 'https://http2.mlstatic.com/D_NQ_NP_941407-MLA47917971975_102021-O.webp' },
    { id: 10003, product: 'durazno', quantity: 2, owner: 'Angela', price:2, image: 'https://http2.mlstatic.com/D_NQ_NP_916403-MLA45796277848_052021-O.webp' },
    { id: 10004, product: 'banana', quantity: 1, owner: 'Maria', price:1, image: 'https://http2.mlstatic.com/D_NQ_NP_945966-MLA47821163482_102021-O.webp' },
    { id: 10005, product: 'ciruela', quantity: 3, owner: 'Juana', price:2, image: 'https://http2.mlstatic.com/D_NQ_NP_820274-MLA47150250726_082021-W.webp' },
    { id: 10006, product: 'uva', quantity: 4, owner: 'Juana', price:3,  image: 'https://http2.mlstatic.com/D_NQ_NP_663891-MLA47233449429_082021-O.webp' },

    
  ]





  useEffect(() => {
    api.gifts()
      .then(gifts => setGiftList(gifts.data))
      .catch(console.log)
      .finally(() => { setLoading(false) })
  }, [])

  useEffect(() => {
    api.save(giftList)
      .then(console.log).catch(console.log)
      .catch(console.log)
  }, [giftList])
















  const saveGifts = (gift: IgiftName) => {
    setGiftList(prevState => { return [...prevState, gift] });
    let array = giftList
    array.push(gift)
    // localStorage.setItem('ADVIENCY', JSON.stringify(array));

  }

  const addGift = (gift: IgiftName) => {
    giftList.some(item => item.product.toLowerCase() === gift.product.toLowerCase())
      ? alert('El producto ya existe')
      : saveGifts(gift);


  };
  const deleteGift = (gift: IgiftName) => {
    setGiftList(giftList.filter((item) => item.product !== gift.product));
    let array = giftList.filter((item) => item.product !== gift.product);
    // localStorage.setItem('ADVIENCY', JSON.stringify(array));

  };
  const deleteAllGifts = () => {
    setGiftList([]);
    // localStorage.setItem('ADVIENCY', JSON.stringify([]));

  }




  return (
    <div className="App">

      <div className={styles.container}>
        <h1 className={styles.text_title} >Regalos:</h1>
        <button autoFocus className={styles.addGift_button} onClick={() => { setOpenModal(prevState => !prevState) }} >Agregar Regalo</button>
      </div>
      {loading ? <h1>Loading...</h1> :
        giftList.length ? (
          <div>
            <GiftList>
              {giftList.map((gift) => (
                <GiftItem
                  id={gift.id}
                  deleteGift={deleteGift}
                  key={gift.id}
                  text={gift.product}
                  image={gift.image}
                  owner={gift.owner}
                  quantity={gift.quantity}
                  price={gift.price}
                  setEditGift={setEditGift}
                  giftList={giftList}
                  setEdit={setEdit}
                  setOpenModal={setOpenModal}
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
          <CreateGift
            addGift={addGift}
            setOpenModal={setOpenModal}
            edit={edit}
            setEdit={setEdit}
            editGift={editGift}
            giftList={giftList}
            setGiftList={setGiftList}
            index={index}
            surprise={surprise}
          />
        </Modal>

      )}
      {/* {console.log(editGift)} */}
    </div>
  );
}
