import { createContext, useContext } from "react";


const ListSlice = createContext({
    data: null,
    setData: ()=>{}
}) 

export const useData = () =>{
    return useContext(ListSlice)
}

export default ListSlice