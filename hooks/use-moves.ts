import { ChessGameContext } from "@/context/boardContext";
import { useContext } from "react";

const useMoves = () => {
    const { moves } = useContext(ChessGameContext);
    return moves
}

export default useMoves;