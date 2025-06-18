import { GestureResponderEvent } from "react-native"

export type BagdeModalProps = {
    visible: boolean,
    badges: string[],
    onClose: (event: GestureResponderEvent) => void

}

// TO DO 
// ver se precisa mudar o tipo de badges