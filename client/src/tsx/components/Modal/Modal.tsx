import {ReactNode, useEffect, useState} from "react";
import styled from "styled-components";

interface ModalI {
    // isOpen: boolean,
    children: ReactNode,
    isOpenP?: boolean
}

const Bg = styled.div`
  background: rgba(0,0,0,0.5);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 900;
`
const ModalDiv = styled.div`
  background: ${props => props.theme.bgLight};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  max-width: 1200px;
  z-index: 1000;
`
const Modal = ({children, isOpenP}: ModalI) => {
    const [isOpen,setIsOpen] = useState(isOpenP)
    useEffect(() => {
        setIsOpen(isOpenP)
    }, [isOpenP])
    if (!isOpen) return <></>
    return (
        isOpen &&
            <>
                <ModalDiv>
                    {children}
                </ModalDiv>
                <Bg onClick={() => setIsOpen(false)}></Bg>
            </>

    )
}
export default Modal