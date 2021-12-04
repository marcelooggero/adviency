import React from "react";

const GiftList: React.FC = ({children}) => {
  return (
    <section>
      <ul>{children}</ul>
    </section>
  );
};

export default GiftList;
