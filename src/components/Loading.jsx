import styled from "styled-components";

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const LoadingContainer = styled.div`
  position: relative;
  width: ${6 * 40}px;
  height: ${6 * 40}px;
  div {
    position: absolute;
    width: ${3 * 16}px;
    height: ${3 * 16}px;
    border-radius: 50%;
    background: #ccc;
    animation: lds-grid 1.2s linear infinite;
  }

  @keyframes lds-grid {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

export default function Loading() {
  const range = (str, end) =>
    str === end ? [str] : [str, ...range(str + 1, end)];
  return (
    <CenteredContainer>
      <LoadingContainer>
        {range(0, 2).map((i) =>
          range(0, 2).map((j) => (
            <div
              key={i + "" + j}
              style={{
                top: 3 * (8 + 24 * i),
                left: 3 * (8 + 24 * j),
                animationDelay: -(0.4 * j + 0.4 * i) + "s",
              }}
            ></div>
          ))
        )}
      </LoadingContainer>
    </CenteredContainer>
  );
}
