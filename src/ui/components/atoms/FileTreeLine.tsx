import styled from 'styled-components'

const FileTreeLine = styled.div`
  display: flex;
  height: 25px;
  line-height: 25px;
  background-color: white;
  color: black;
  cursor: pointer;
  &:hover {
    background-color: black; 
    color: white;
  }
`

export default FileTreeLine
