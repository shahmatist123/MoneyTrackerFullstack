import styled from "styled-components";
import React from "react"
const StyledPreloader = styled.div`
  opacity: 0.7;
  background: #fff;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`
const Preloader = () => {
    return (<StyledPreloader/>)
}
export default Preloader