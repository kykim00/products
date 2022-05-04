import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Product } from "../../types";

interface ItemProps extends Product {
  view: string;
}

const ProductItem = ({ club, leaders, partners, price, view }: ItemProps) => {
  return (
    <Link to={`/${club.id}`}>
      <ItemContainer view={view}>
        <img src={club.coverUrl} alt={club.name} />
        <ItemContent>
          <h3>{club.name}</h3>
          <h4>
            {leaders.map((leader) => leader.name)}{" "}
            {partners.map((partner) => partner.name)}
          </h4>
          <p>{club.description}</p>
          <p>{club.place}</p>
          <p>{price}</p>
          <p>{club.type}</p>
        </ItemContent>
      </ItemContainer>
    </Link>
  );
};

const gridCss = css`
  display: block;
  img {
    width: 100%;
  }
`;

const listCss = css`
  display: flex;
  min-width: 520px;
  img {
    width: 370px;
    @media (max-width: 768px) {
      width: 300px;
    }
    @media (max-width: 576px) {
      width: 230px;
    }
  }
`;

const ItemContainer = styled.div<{ view: string }>`
  ${({ view }) => {
    if (view === "grid") {
      return gridCss;
    } else if (view === "list") {
      return listCss;
    }
  }}
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  h3,
  h4,
  p {
    margin-bottom: 10px;
  }
  p:last-child {
    margin: 0;
  }
  img {
    aspect-ratio: 4/3;
  }
`;

const ItemContent = styled.div`
  padding: 20px;
`;

export default ProductItem;
