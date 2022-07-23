import React from 'react';
import headerLinks from "../../../const/headerLinks";
import HeaderLink from "./HeaderLink";

import styled from 'styled-components'

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 20px 20px 60px;
  background: #007a6f;
`
const MainHeader = () => {
    const linkList = headerLinks.map((link, i) => {
        return (
            <HeaderLink key={i} name={link.name} url={link.url}/>
        )
    })
    return (
        <Header>
            {linkList}
        </Header>
    );
}

export default MainHeader;
