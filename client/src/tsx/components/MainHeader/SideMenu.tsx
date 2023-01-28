import React from 'react';
import headerLinks from "../../../const/headerLinks";
import SideLink from "./SideLink";
import styled from 'styled-components'
const Header = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  text-align: start;
  background: #007a6f;
  background: ${props => props.theme.bgLight};
  width: 158px;
`
const Footer = styled.div`
`
const SideMenu = () => {
    const linkList = headerLinks.map((link, i) => {
        return (
            <SideLink key={i} name={link.name} url={link.url}/>
        )
    })
    return (
        <Header>
            {linkList}
            <Footer>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20Z" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M27.758 10.366L26.758 8.634C26.206 7.677 24.983 7.35 24.026 7.902L23.5 8.206C21.5 9.36 19 7.917 19 5.608V5C19 3.895 18.105 3 17 3H15C13.895 3 13 3.895 13 5V5.608C13 7.917 10.5 9.361 8.5 8.206L7.974 7.902C7.017 7.35 5.794 7.677 5.242 8.634L4.242 10.366C3.69 11.323 4.017 12.546 4.974 13.098L5.5 13.402C7.5 14.557 7.5 17.443 5.5 18.598L4.974 18.902C4.017 19.454 3.69 20.677 4.242 21.634L5.242 23.366C5.794 24.323 7.017 24.65 7.974 24.098L8.5 23.794C10.5 22.639 13 24.083 13 26.392V27C13 28.105 13.895 29 15 29H17C18.105 29 19 28.105 19 27V26.392C19 24.083 21.5 22.639 23.5 23.794L24.026 24.098C24.983 24.65 26.206 24.323 26.758 23.366L27.758 21.634C28.31 20.677 27.983 19.454 27.026 18.902L26.5 18.598C24.5 17.443 24.5 14.557 26.5 13.402L27.026 13.098C27.983 12.546 28.311 11.323 27.758 10.366Z" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </Footer>
        </Header>
    );
}

export default SideMenu;
