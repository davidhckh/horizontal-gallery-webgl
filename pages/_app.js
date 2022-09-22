import "../shared/styles.scss";
import styled from "styled-components";

const App = ({ Component, pageProps }) => {
  return (
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  min-height: 100vh;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;
