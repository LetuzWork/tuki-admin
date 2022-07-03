import styled from "styled-components";

const HeaderCont = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  * {
    font-family: "Open Sans", sans-serif !important;
  }
  background: #009879;
  color: #eee;

  padding: 10px 20px;
  margin: 0;
`;
const Title = styled.div`
  font-size: 30px;
`;
const NavCont = styled.nav`
  width: 50%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
export default function Header() {
  return (
    <HeaderCont>
      <Title>Tuki</Title>
      <NavCont>
        <div>Cursos</div>
        <div>Agenda</div>
        <div>Config</div>
      </NavCont>
    </HeaderCont>
  );
}
