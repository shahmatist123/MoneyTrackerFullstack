import TextInput from "../components/Input/TextInput";
import styled from "styled-components";
import {useEffect, useState} from "react";
import Input from "../components/Input/Input";
import {useSelector} from "react-redux";
import categorySlice, {
    addCalendarUser,
    calendarUserSelector,
    deleteCalendarUser,
    fetchCalendarUser,
} from "./calendarUserSlice";
import {useAppDispatch} from "../../store/store";
import {add} from "../api/CategoriesApi/CategoriesApi";

export const calendarUserPath = "calendar-user"

const Container = styled.div`
  width: 300px;
  margin: 0 auto;
`
const CatItem = styled.div`
  background: ${props => props.theme.bgLight};
  border-radius: 5px;
  padding: 10px 20px;
  color: #fff;
  text-align: start;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
`

const CatWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin-top: 50px;
`

const CatStatus = styled.div`
  margin-right: 10px;
  display: flex;align-items: center;
`

const CatIcons = styled.div`
  display: flex;align-items: center;
`
const CatDelete = styled.div`
  display: block;
  padding: 10px;
  cursor: pointer;
`

const formDefault = {is_positive: false, name: ""}

const CalendarUser = () => {
    const dispatch = useAppDispatch()
    const [form, setForm] = useState(formDefault)
    const allCats = useSelector(calendarUserSelector)
    useEffect(() => {
        dispatch(fetchCalendarUser())
    }, [])
    const onSubmit = () => {
        dispatch(addCalendarUser(form))
        setForm(formDefault)
    }

    const onDelete = (id: number) => {
        dispatch(deleteCalendarUser(id))
    }

    return <>
        <Container>
            <Input type="text" value={form.name} name="Category name" onChange={(e) => setForm({...form, name: e.target.value || ""})} placeholder="Put name Calendar User"/>
            <Input type="submit" name="Add Calendar User" value="Add Calendar User" onClick={onSubmit}/>
            <Input type="checkbox" placeholder="Is positive?" checked={form.is_positive} onChange={(e) => setForm({...form, is_positive: e.target.checked})}/>
        </Container>
        <CatWrapper>
        {allCats.map((cat: any) => <CatItem key={cat.id}>{cat.name}

            <CatIcons>
                <CatStatus>
                </CatStatus>
                <CatDelete onClick={() => onDelete(cat.id)}><svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.96378 5.00087L9.79926 1.16639C10.0677 0.897959 10.0661 0.467905 9.79926 0.200706C9.53202 -0.0677199 9.1019 -0.0644465 8.83507 0.200706L5 4.03519L1.16493 0.200706C0.896461 -0.0677199 0.46634 -0.066083 0.200737 0.200706C-0.0677303 0.469541 -0.0660931 0.899187 0.200737 1.16639L4.03622 5.00087L0.200737 8.83372C-0.0677303 9.10214 -0.0660931 9.5322 0.200737 9.79899C0.467977 10.0678 0.898097 10.0662 1.16493 9.79899L5 5.9645L8.83507 9.79899C9.10354 10.0678 9.53366 10.0662 9.79926 9.79899C10.0677 9.53056 10.0661 9.10051 9.79926 8.83372L5.96378 5.00087Z" fill="#516F90"/>
                </svg>
                </CatDelete>
            </CatIcons>
        </CatItem>)}
        </CatWrapper>
    </>
}
export default CalendarUser