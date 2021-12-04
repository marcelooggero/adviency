
import { useState } from 'react';
import GiftList from './components/GiftList';
import GiftItem from './components/GiftItem';
import CreateGift from './components/CreateGift';
import IgiftName from '../src/interfaces/giftName';
import "./styles.css";

export default function App() {


  const giftListArray: IgiftName[] = [
    { product: 'Cerveza'},
    { product: 'Sidra' },
    { product: 'Champagne' },
  ]
  const [giftList, setGiftList] = useState(giftListArray);

  const addGift = (gift: IgiftName) => {
    setGiftList((prevState) => {
     return [gift, ...prevState];
    })
  }
  const deleteGift = (gift: IgiftName) => {
    setGiftList(giftList.filter(item=> item.product!==gift.product))
  }
  
  return (
    <div className="App">
      <h1>Regalos:</h1>
      <CreateGift addGift={addGift} />
      {giftList.length 
      ?
      <GiftList>
        {giftList.map(gift => <GiftItem deleteGift={deleteGift} key={gift.product} text={gift.product} />)}
      </GiftList>
      :(
        <div>
      <span>Papa Noel está aburrido,🎅</span><br/>
      <span>por favor agrega algo en la lista</span>
      </div>)
    }
    </div>
  );
}
