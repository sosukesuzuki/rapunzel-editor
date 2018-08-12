import React from 'react'
import styled from 'styled-components'
import { grey } from '../../../lib/colors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

interface HeaderProps {}

const Container = styled.div`
  background: white;
  grid-column: 1 / 4;
  color: black;
  border-bottom: 0.5px solid ${grey[3]};
  display: flex;
  h1 {
    margin: 0;
    line-height: 40px;
    font-size: 20px;
    padding-left: 30px;
    flex: 1;
  }
  .icons {
    display: flex;
    line-height: 40px;
    padding-right: 30px;
    a {
      font-size: 30px;
      cursor: pointer;
      svg {
        color: black;
        &:hover {
          color: ${grey[6]}
        }
      }
    }
  }
`

export default class Header extends React.Component<HeaderProps> {
  render () {
    return (
      <Container>
        <h1>Rapunzel</h1>
        <div className='icons'>
          <a href='https://github.com/sosukesuzuki/rapunzel-editor' target='_blank'>
            <FontAwesomeIcon icon={ faGithub } />
          </a>
        </div>
      </Container>
    )
  }
}
