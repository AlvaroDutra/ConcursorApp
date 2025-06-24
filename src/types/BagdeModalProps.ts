import { GestureResponderEvent } from "react-native"
import { BadgeDatabase } from "./BadgeDatabase"

export type BagdeModalProps = {
    visible: boolean,
    badges: BadgeDatabase[],
    onClose: (event: GestureResponderEvent) => void

}

// TO DO 
// ver se precisa mudar o tipo de badges