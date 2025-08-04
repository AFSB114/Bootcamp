import {useContext} from "react";
import CardContext from "@/context/CardContext";

export default function useCard() {
    const context = useContext(CardContext);
    if (!context) throw new Error("You must use a card provider");
    return context;
}