import { Product } from "../../types";

const ProductItem = ({ club, leaders, partners, price }: Product) => {
  return (
    <div>
      <img src={club.coverUrl} alt={club.name} />
      <h3>{club.name}</h3>
      <h4>
        {leaders.map((leader) => leader.name)}
        {partners.map((partner) => partner.name)}
      </h4>
      <p>{club.description}</p>
      <p>{club.place}</p>
      <p>{price}</p>
    </div>
  );
};

export default ProductItem;
