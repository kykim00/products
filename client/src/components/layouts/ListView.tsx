import styled from "@emotion/styled";

interface ListProps {
  children: React.ReactNode;
}

const ListViewLayout = ({ children }: ListProps) => {
  return <ListContainer>{children}</ListContainer>;
};

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export default ListViewLayout;
