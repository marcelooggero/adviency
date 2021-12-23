import { useState, useEffect } from "react";
import GiftList from "./components/GiftList";
import GiftItem from "./components/GiftItem";
import DeleteAllGifts from "./components/DeleteAllGifts";
import CreateGift from "./components/CreateGift";
import IgiftName from "../src/interfaces/giftName";
import Comprar from "./components/Comprar";
import { BiVolumeFull, BiVolumeMute } from "react-icons/bi";

import { Modal } from "./Modal";
import { api } from "./api";
import styles from "./App.module.css";
import "./styles.css";

export default function App() {
  const [giftList, setGiftList] = useState<IgiftName[]>([]);
  let parsedGifts: IgiftName[];
  parsedGifts = [];
  
  const [openModal, setOpenModal] = useState(false);
  const [openModal_prev, setOpenModal_prev] = useState(false);
  const [editGift, setEditGift] = useState<IgiftName>(parsedGifts[0]);
  const [edit, setEdit] = useState(false);
  const [duplicateGift, setDuplicateGift] = useState<IgiftName>(parsedGifts[0]);
  const [duplicate, setDuplicate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sound, setSound] = useState<HTMLAudioElement>();
  const [pause, setPause] = useState(false);

  let index = giftList.length;

  const surprise: IgiftName[] = [
    {
      id: 10000,
      product: "anana",
      quantity: 5,
      owner: "Paula",
      price: 2,
      image:
        "https://http2.mlstatic.com/D_NQ_NP_955920-MLA43554051071_092020-O.webp",
    },
    {
      id: 10001,
      product: "manzana",
      quantity: 4,
      owner: "Carla",
      price: 3,
      image:
        "https://http2.mlstatic.com/D_NQ_NP_774924-MLA47764225403_102021-O.webp",
    },
    {
      id: 10002,
      product: "pera",
      quantity: 3,
      owner: "Andrea",
      price: 1,
      image:
        "https://http2.mlstatic.com/D_NQ_NP_941407-MLA47917971975_102021-O.webp",
    },
    {
      id: 10003,
      product: "durazno",
      quantity: 2,
      owner: "Angela",
      price: 2,
      image:
        "https://http2.mlstatic.com/D_NQ_NP_916403-MLA45796277848_052021-O.webp",
    },
    {
      id: 10004,
      product: "banana",
      quantity: 1,
      owner: "Maria",
      price: 1,
      image:
        "https://http2.mlstatic.com/D_NQ_NP_945966-MLA47821163482_102021-O.webp",
    },
    {
      id: 10005,
      product: "ciruela",
      quantity: 3,
      owner: "Juana",
      price: 2,
      image:
        "https://http2.mlstatic.com/D_NQ_NP_820274-MLA47150250726_082021-W.webp",
    },
    {
      id: 10006,
      product: "uva",
      quantity: 4,
      owner: "Juana",
      price: 3,
      image:
        "https://http2.mlstatic.com/D_NQ_NP_663891-MLA47233449429_082021-O.webp",
    },
  ];

  useEffect(() => {
    api
      .gifts()
      .then((gifts) => setGiftList(gifts.data))
      .catch(console.log)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    api.save(giftList).then(console.log).catch(console.log).catch(console.log);
  }, [giftList]);

  useEffect(()=>{
    const audio = new Audio("./Christmas.mp3");
    audio.loop = true;
    setSound(audio);
  },[])

  const saveGifts = (gift: IgiftName) => {
    setGiftList((prevState) => {
      return [...prevState, gift];
    });
    let array = giftList;
    array.push(gift);
  };

  const addGift = (gift: IgiftName) => {
    giftList.some(
      (item) => item.product.toLowerCase() === gift.product.toLowerCase()
    ) &&
    giftList.some(
      (item) => item.owner.toLowerCase() === gift.owner.toLowerCase()
    )
      ? alert("Ya existe ese producto para ese destinatario")
      : saveGifts(gift);
  };

  const deleteGift = (gift: IgiftName) => {
    setGiftList(giftList.filter((item) => item.product !== gift.product));
    let array = giftList.filter((item) => item.product !== gift.product);
  };

  const deleteAllGifts = () => {
    setGiftList([]);
  };

  const handleTotal = () => {
    const reducer = (accumulator: number, currentValue: IgiftName) =>
      accumulator + currentValue.price * currentValue.quantity;
    const sum = giftList.reduce(reducer, 0);
    return sum;
  };

  const previsualize = () => {
    setOpenModal_prev(true);
  };


  const soundOnOff = () => {
    if(pause && sound){
      sound.pause()
      
    }else if(sound){
      sound.play()  
    }
    setPause(pause => !pause);
  }

  return (
    <div className="App">
      <div className={styles.container}>
        <h1 className={styles.text_title}>Regalos:</h1>
        
          {pause
          ?<BiVolumeFull tabIndex={0} onClick={soundOnOff} className={styles.sound_button_on}/>
          :<BiVolumeMute tabIndex={0} onClick={soundOnOff} className={styles.sound_button_off}/>
          }
        
      </div>

      <button
        autoFocus
        className={styles.addGift_button}
        onClick={() => {
          setOpenModal((prevState) => !prevState);
        }}
      >
        Agregar Regalo
      </button>
      {loading ? (
        <h1>Loading...</h1>
      ) : giftList.length ? (
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
                giftList={giftList}
                setEditGift={setEditGift}
                setEdit={setEdit}
                setDuplicateGift={setDuplicateGift}
                setDuplicate={setDuplicate}
                setOpenModal={setOpenModal}
              />
            ))}
          </GiftList>
          {giftList.length > 0 && (
            <div className={styles.total}>
              <h3>{`Total: $ ${handleTotal()}`}</h3>
            </div>
          )}
          <DeleteAllGifts deleteAllGifts={deleteAllGifts} />
          <button className={styles.previsualize_button} onClick={previsualize}>
            Previsualizar
          </button>
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
            giftList={giftList}
            setGiftList={setGiftList}
            addGift={addGift}
            setOpenModal={setOpenModal}
            editGift={editGift}
            edit={edit}
            setEdit={setEdit}
            index={index}
            surprise={surprise}
            duplicateGift={duplicateGift}
            duplicate={duplicate}
            setDuplicate={setDuplicate}
          />
        </Modal>
      )}
      {openModal_prev && (
        <Modal>
          <Comprar
            giftList={giftList}
            openModal_prev={openModal_prev}
            setOpenModal_prev={setOpenModal_prev}
          />
        </Modal>
      )}
      {/* {console.log(openModal)}

      {console.log(duplicate)}
      {console.log(editGift)} */}
    </div>
  );
}
