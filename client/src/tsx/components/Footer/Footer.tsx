import styled from "styled-components";
import React from 'react'
const StyledFooter = styled.div`
  background: #000;
  width: 100%;
  min-height: 60px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 100px;
`
const Footer = () => {
    return(
        <StyledFooter>
            <a rel="noreferrer" target="_blank" href="https://icons8.com/icon/1wlQtwbK1wSB/adobe-animate">Adobe Animate</a>
            icon by
            <a rel="noreferrer" target="_blank" href="https://icons8.com">Icons8</a>
        </StyledFooter>
    )
}
export default Footer
