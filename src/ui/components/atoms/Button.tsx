import styled from 'styled-components'
import { brandColor, grey } from '../../../lib/colors'

const Button = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  color: black;
  border-radius: 2px;
  &:hover {
    color: ${grey[5]};
  }
  &:focus {
    box-shadow: 0 0 0 0.2rem ${brandColor};
  }
`

export default Button
