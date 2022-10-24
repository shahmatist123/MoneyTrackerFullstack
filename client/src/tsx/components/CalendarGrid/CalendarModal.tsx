import React, {useState} from "react";
import styled from "styled-components";
import {moneyItem, ticketItem, tickets} from "../../types/moneyI";
import {getTickets} from "../../api/MoneyApi/MoneyApi";
const ModalBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgb(0 0 0 / 46%);
`
const Modal = styled.div`
  background: #fff;
  border-radius: 20px;
  padding:20px 30px 30px 30px;
  box-shadow: 12px 12px 2px 1px rgba(138, 134, 134, 0.2);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
const ModalContent = styled.div`
  position: relative;
`
const ModalExitSvg = styled.svg`
  position: absolute;
  top: -28px;
  right: -28px;
  cursor: pointer;
`
const ModalTicket=styled.div`
    background: darkgrey;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 10px;
`
interface ModalI {
    setModalData:(data:moneyItem)=>void
    modalData:moneyItem
}
const CalendarModal=({setModalData,modalData}:ModalI)=>{
    const [modalProducts, setModalProducts]=useState<tickets | null>(null)
    const [ticketItems,setTicketItems]=useState<ticketItem[] | null>(null)
    const modalPurchases =():JSX.Element[]=>{
        if (modalData.purchases) {
            return modalData.purchases?.map((purchases, i)=>{
                return(
                    <ModalTicket key={i}>
                        {purchases.name}{purchases.market}{purchases.summ}
                    </ModalTicket>
                )
            })
        }
        return [<></>]
    }

    const loadTicketItems = (ticket: tickets) => {
        getTickets(ticket).then(result => {
            console.log(result.data.values)
            setTicketItems(result.data.values)
        })
        setModalProducts(ticket)
    }

    const modalTickets =():JSX.Element[]=> {
        if (modalData.tickets) {
            return modalData.tickets?.map((ticket, i) => {
                return (
                    <ModalTicket onClick={() => loadTicketItems(ticket)} key={i}>
                        {ticket.market}{ticket.summ}
                    </ModalTicket>
                )
            })
        }
        return [<></>]
    }
    const modalProductsOpen=():JSX.Element[]=>{

        return [<></>]
    }
    return(
        <>
            <ModalBg onClick={() => setModalData({})}></ModalBg>
            <Modal>
                {!modalProducts ?
                (<ModalContent>
                    <ModalExitSvg onClick={() => setModalData({})} fill="#000000" viewBox="0 0 50 50"
                                  width="30px" height="30px">
                        <path
                            d="M 11.5 11 C 11.372 11 11.243984 11.048984 11.146484 11.146484 C 11.049484 11.244484 11 11.372 11 11.5 C 11 11.628 11.048484 11.755516 11.146484 11.853516 L 24.292969 25 L 11.146484 38.146484 C 10.951484 38.341484 10.951484 38.658516 11.146484 38.853516 C 11.244484 38.950516 11.372 39 11.5 39 C 11.628 39 11.755516 38.951516 11.853516 38.853516 L 25 25.707031 L 38.146484 38.853516 C 38.341484 39.048516 38.658516 39.048516 38.853516 38.853516 C 39.048516 38.657516 39.049516 38.342484 38.853516 38.146484 L 25.707031 25 L 38.853516 11.853516 C 39.048516 11.658516 39.048516 11.341484 38.853516 11.146484 C 38.657516 10.951484 38.342484 10.950484 38.146484 11.146484 L 25 24.292969 L 11.853516 11.146484 C 11.756016 11.048984 11.628 11 11.5 11 z"/>
                    </ModalExitSvg>
                        {modalPurchases()}{modalTickets()}
                </ModalContent>) : (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>название</th>
                                    <th>кол-во</th>
                                    <th>цена</th>
                                    <th>сумма</th>
                                </tr>
                            </thead>
                        <tbody>
                        {ticketItems?.map((item,i)=>{
                            return(
                                <tr key={i}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                    <td>{item.summ}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                        </table>

                    </>
                    )
                }
            </Modal>
        </>
    )
}
export default CalendarModal