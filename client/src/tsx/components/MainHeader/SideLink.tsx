import React from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components'

interface P {
    name: string,
    url: string
}

const Wrapper = styled(Link)`
  color: ${props => props.theme.textColor};
  font-weight: 700;
  padding: 13px 0 13px 22px;
  font-size: 18px;
  transition: ease-out 0.3s;
  display: block;
  &:hover, &:active{
    background: ${props => props.theme.bgColor};
  }
`
const SideLink = (props: P) => {
    return (
        <Wrapper to={props.url}>
            {props.name}
        </Wrapper>
    );
}

export default SideLink;
