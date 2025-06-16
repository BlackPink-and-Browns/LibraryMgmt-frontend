import { useNavigate } from "react-router-dom";
import { Button, Header } from "../../components";


export default function BookCard (){


    return (<>
        <div className="bg-white w-1/4 rounded-lg shadow-lg mr-8 h-3/4">
            <div className="p-8 rounded-lg">
                <img 
                    src="../../../assets/battle.jpg" alt="battle" 
                    className="rounded-lg w-full h-full transition-transform duration-300 hover:scale-110"/>
            </div>
        </div>
    </>)
}