import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

function ResidentCard({url}){
    const [resident, setResident] = useFetch();

    useEffect(()=>{
        setResident(url)
    },[url])

    if(!resident) return null;

    return(
        <div className="resident__card">
            <div className="resident__identity">
                <img src={resident?.image} alt={resident?.name} className="resident__picture"/>
                <span className="resident__status">
                    <FontAwesomeIcon 
                        icon={faCircle} 
                        className={`status-dot ${resident?.status.toLowerCase()}`} 
                    />
                    {resident?.status}
                </span>
            </div>
            <h2 className="resident__name">{resident?.name}</h2>
            <div className="resident__data">
                <span className="resident__info">
                    <span><b>• Specie:</b> </span>
                    {resident?.species}<br/>
                </span>
                <span className="resident__info">
                    <span><b>• Origin: </b></span>
                    {resident?.origin?.name}<br/>
                </span>
                <span className="resident__info">
                    <span><b>• Episodes where appear: </b></span>
                    {resident?.episode?.length}
                </span>
            </div>
        </div>
    )
}

export default ResidentCard;