import styled from 'styled-components'
import { brandColor } from '../../../lib/colors'

const Input = styled.input`
  outline: none;
  border: none;
  border-radius: 2px;
  &:focus {
    box-shadow: 0 0 0 0.2rem ${brandColor};
  }
`

export default Input
