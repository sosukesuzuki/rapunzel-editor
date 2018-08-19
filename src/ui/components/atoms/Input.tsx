import styled from 'styled-components'
import { brandColor } from '../../../lib/colors'

const Input = styled.input`
  outline: none;
  border: none;
  border-radius: 2px;
  &:focus {
    outline: 2px solid ${brandColor};
  }
`

export default Input
