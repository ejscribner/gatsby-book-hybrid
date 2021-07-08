import styled from "styled-components"


export const Button = styled.button`
  padding: .5rem 1.5rem;
  background: rebeccapurple;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  ${props => props.block ? 'display: block; width: 100%;' : ''}
  
  &:hover {
    background: indigo;
  }
`;
