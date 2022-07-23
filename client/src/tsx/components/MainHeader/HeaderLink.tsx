import React from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components'

interface P {
    name: string,
    url: string
}

const Wrapper = styled.div`
  color: #fff;
  font-weight: 700;
  margin: 0 20px;
  font-size: 18px;
`
const HeaderLink = (props: P) => {
    return (
        <Wrapper>
            <Link to={props.url}>{props.name}</Link>
        </Wrapper>
    );
}

export default HeaderLink;
