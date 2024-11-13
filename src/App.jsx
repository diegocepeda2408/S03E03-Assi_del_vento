import { useEffect, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch';
import CardInfo from './assets/components/CardInfo';
import ResidentsList from './assets/components/ResidentsList';
import Search from './assets/components/Search';
import { bg1, bg2, bg3, bg4, bg5, bg6, getRYMIcon} from './assets/img/Backgrounds';
import RYM from './assets/img/rick_&_morty_title.png'

const backgrounds = [bg1, bg2, bg3, bg4, bg5, bg6]

function App() {

  const [location,setLocation, loading, error] = useFetch();
  const [locationId, setLocationId] = useState(1);
  const [background, setBackground] = useState(backgrounds[Math.floor(Math.random()*backgrounds.length)]);

  const [page, setPage] = useState(1);
  const numberOfCards = 8;
  const residentLength = location ? location?.residents.length : 0
  const maxPage = Math.ceil(residentLength / numberOfCards)

  useEffect(() => {
    setLocation(`https://rickandmortyapi.com/api/location/${locationId}`)
    setBackground(backgrounds[Math.floor(Math.random()*backgrounds.length)])
  },[locationId]);

  const onPrev = () => {
    if (page > 1){
      setPage(page - 1)
    }
  }

  const onNext = () => {
    if (maxPage > 1){
      setPage(page + 1)
    }
  }

  const onClickPage = (newPage) => {
    setPage(newPage)
  }

  const currentPageItems = location ? location?.residents.slice((page - 1)*numberOfCards, page*numberOfCards) : []

  const paginationButtons = []
  const maxItems = Math.ceil(page/5) - 1

  for (let i=0 + 5*maxItems; i<maxPage; i++){
    if (paginationButtons.length < 5){
      paginationButtons.push(i + 1)
    }
  }

  return (
    <>
      {error && <p>{error}</p>}
      <div className='main__menu'>
        <header className="background__title" style={{backgroundImage: `url('${background}')`}}>
          <img src={RYM} alt="rick & morty" className='header__title'/>
        </header>
        <div className='app-planet-info'>
          <Search setLocationId={setLocationId}/>

          {loading ? (
            <div className="loading__img">
              <img className="starting__img" src={getRYMIcon}></img>
            </div>
          ):(
            <>
            <h1 className='planet__id'>ID: {locationId}</h1>
            <h2 className='planet__name'>{location?.name}</h2>
            <div className='card__info'>
              <CardInfo location={location}/>
            </div>
            <h1 className='planet__id'>Residents</h1>
            <ResidentsList residents={currentPageItems}/>
            </>
          )}
        </div>
        <div className='button__pages'>
          <p>page {page} of {maxPage}</p>
        </div>
        <div className='button__pages'>
          <button className="page__btn" onClick={onPrev} disabled={page===1}>Previous</button>
          {paginationButtons.map((items, index) => (
            <button className='number__btn' key={index} onClick={() => onClickPage(items)}>{items}</button>
          ))}
          <button className="page__btn" onClick={onNext} disabled={page===maxPage}>Next</button>
        </div>
      </div>
    </>
  )
};

export default App