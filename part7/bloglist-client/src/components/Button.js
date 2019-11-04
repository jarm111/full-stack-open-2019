import styled from 'styled-components'

const Button = styled.button`
  background: ${props => props.primary ? 'Teal' : 'white'};
  color: ${props => props.primary ? 'white' : 'Teal'};

  font-size: 1em;
  margin: 0.4em;
  padding: 0.20em 1em;
  border: 2px solid Teal;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    filter: brightness(93%);
  }

  &:active {
    filter: brightness(96%);
  }
`

export default Button