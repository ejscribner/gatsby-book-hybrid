import styled from "styled-components"

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: .75rem;
  font-size: 1rem;
  margin-bottom: .5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  box-shadow: none;
  
  &focused, &active {
    border: 1px solid rebeccapurple;
  }
`;
