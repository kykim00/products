import styled from "@emotion/styled";

interface GridProps {
  children: React.ReactNode;
}

const GridViewLayout = ({ children }: GridProps) => {
  return <GridContainer>{children}</GridContainer>;
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;
export default GridViewLayout;
