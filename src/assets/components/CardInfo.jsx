function CardInfo({location}){
    return(
        <>
        <span className="planet__info">
            <h3 className="planet__info-title">Type</h3>
            <p>{location?.type}</p>
        </span>
        <span className="planet__info">
            <h3 className="planet__info-title">Dimension</h3>
            <p>{location?.dimension}</p>
        </span>
        <span className="planet__info">
            <h3 className="planet__info-title">Population</h3>
            <p>{location?.residents?.length}</p>
        </span>
      </>
    )
}

export default CardInfo;