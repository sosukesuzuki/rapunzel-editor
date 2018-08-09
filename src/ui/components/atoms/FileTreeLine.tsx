import styled from 'styled-components'
import { grey } from '../../../lib/colors'

const FileTreeLine = styled.div`
  padding: 0 10px;
  margin: 0 auto;
  display: flex;
  height: 25px;
  line-height: 25px;
  background-color: white;
  color: black;
  cursor: pointer;
  &:hover {
    background-color: ${grey[1]}; 
    color: black;
  }
`

export default FileTreeLine
