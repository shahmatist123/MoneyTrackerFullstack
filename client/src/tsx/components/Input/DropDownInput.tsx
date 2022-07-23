import React, {Dispatch, useEffect, useState} from 'react';
import styled from 'styled-components'
import {labels} from "../../../const/labels";
import {P} from "../../types/inputI";

interface LabelObjI {
    id: number,
    name: string
}

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 1px;
  transform: translateY(100%);
  z-index: 10;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  padding: 10px 20px;
  background: #fff;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
`
const Container = styled.div`
  position: relative;
`
const Input = styled.div`
  padding: 10px 20px;
  margin: 10px 0;
  display: block;
  width: 100%;
  height: 42px;
  border: 1px solid #282c34;
  text-align: start;
  cursor: pointer;
`
const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;
  width: 100%;
  cursor: pointer;
`

const DropDownInput = (props: P) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [checkboxState, setCheckboxState] = useState<Array<number>>([]);
    const getLabels = (): JSX.Element[] => {
        return labels[props.name].map((label: LabelObjI) => {
            return (
                <Label key={label.id}>
                    <span>
                        {label.name}
                    </span>
                    {props.type === "dropDownC" ? (
                        <input onChange={() => checkboxClick(label.id)} checked={!!checkboxState.find(item => item === label.id)} type="checkbox"/>
                    ) : (
                        <input onChange={() => radioClick(label.id)} checked={!!checkboxState.find(item => item === label.id)} type="radio"/>
                    )}

                </Label>
            )
        })
    }

    const getName = (): Array<string> => {
        if (checkboxState.length) {
            return checkboxState.map(item => {
                const label = labels[props.name].find((label: LabelObjI) => label.id === item);
                return label ? label.name + " " : "";
            })
        }
        return [props.placeholder];
    }

    const checkboxClick = (id: number) => {
        openModal();
        const isFind = checkboxState.find(item => item === id);
        if (isFind) {
            setCheckboxState(checkboxState.filter(item => item !== id))
            return;
        }
        setCheckboxState([...checkboxState, id]);
    }
    const radioClick = (id: number) => {
        openModal();
        setCheckboxState([id]);
    }

    const openModal = () => {
        setIsModalVisible(!isModalVisible);
    }
    useEffect(() => {
        props.onChangeInput && props.onChangeInput(props.name, checkboxState);
    }, [checkboxState])
    return (
        <Container>
            <Input onClick={openModal}>{getName()}</Input>
            {isModalVisible && (
                <Wrapper>
                    {getLabels()}
                </Wrapper>)
            }
        </Container>
    )
}

export default DropDownInput;
