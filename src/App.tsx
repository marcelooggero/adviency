import { useState } from "react";
import GiftList from "./components/GiftList";
import GiftItem from "./components/GiftItem";
import DeleteAllGifts from './components/DeleteAllGifts'
import CreateGift from "./components/CreateGift";
import IgiftName from "../src/interfaces/giftName";
import "./styles.css";

export default function App() {
  const giftListArray: IgiftName[] = [
    { product: "Cerveza", quantity:1 },
    { product: "Sidra", quantity:1 },
    { product: "Champagne", quantity:1 },
  ];
  const [giftList, setGiftList] = useState(giftListArray);

  const addGift = (gift: IgiftName) => {
    giftList.some(item=> item.product.toLowerCase() === gift.product.toLowerCase()) 
    ? alert('El producto ya existe') 
    : setGiftList((prevState) => {
      return [gift, ...prevState];
    });
  };
  const deleteGift = (gift: IgiftName) => {
    setGiftList(giftList.filter((item) => item.product !== gift.product));
  };
  const deleteAllGifts = () => {
    setGiftList([]);
  }

    
  

  return (
    <div className="App">
      <h1>Regalos:</h1>
      <CreateGift addGift={addGift}  />
      {giftList.length ? (
        <div>
          <GiftList>
            {giftList.map((gift) => (
              <GiftItem
                deleteGift={deleteGift}
                key={gift.product}
                text={gift.product}
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
    </div>
  );
}
