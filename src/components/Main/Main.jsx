import React, {useState, useEffect, useRef, useMemo} from 'react';
import FetchData from '../../API/FetchData';
import {getPageCount, getPagesArray} from '../utils/pageCount';
import "./Main.scss";
import Button from '../UI/Button/Button';
import Select from '../UI/Select/Select';
import GridViewIcon from '../../icons/grid.png';
import ListViewIcon from '../../icons/list.png';
import GridView from "../UI/GridView/GridView";
import ListView from '../UI/ListView/ListView';
import Pagination from '../UI/Pagination/Pagination';


const sortByName = [
    {value: "A - Z"},
    {value: "Z - A"}
]

const sortByArea = [
    {value: "Filter by area"},
    {value: "Smaller than Lithuania"},
    {value: "Bigger than Lithuania"},
]

const sortByRegion = [
    {value: "Filter by region"},
    {value: "Africa", },
    {value: "Americas"},
    {value: "Antarctic"},
    {value: "Asia"},
    {value: "Europe"},
    {value: "Oceania"},
   
]





const Main = () => {

    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(25);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [view, setView] = useState(false);
    const [sortType, setSortedType] = useState('default');
    const [sortArea, setSortArea] = useState('default');


    // const fetchAllCountries = async () => {
    //     try {
    //         setIsLoading(true);
    //         const response = await FetchData.getAllCountries(limit)
    //         setCountries([...response]);
    //         const totalCount = response.length
    //         setTotalPages(Math.ceil(totalCount / limit))
    //     } catch(err) {
    //         setError(err)
    //         setIsLoading(false)
    //         console.log(error.message)
    //     }
    // }

    const fetchFilteredCountries = async () => {
        try {
            setIsLoading(true);
            const response = await FetchData.getByNameRegionArea()
            setFilteredCountries([...response]);
        } catch(err) {
            setError(err)
            setIsLoading(false)
            console.log(error.message)
        }
    }

    const sortedCountries = useMemo(() => {
        let result = filteredCountries;

        if(sortType === 'A - Z') {
            result = [...filteredCountries].sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
        } else if (sortType === 'Z - A') {
            result = [...filteredCountries].sort((a, b) => {
                return b.name.localeCompare(a.name)
            })
        }
        return result;
    }, [filteredCountries, sortType])


    const sortedCountriesByArea = useMemo(() => {
        let result = filteredCountries;

        if(sortArea === 'Smaller than Lithuania') {
            result = filteredCountries.filter((countryArea) => countryArea.area < 65300);
            return result
        } else if (sortArea === 'Bigger than Lithuania') {
            result = filteredCountries.filter((countryArea) => countryArea.area > 65300);
            return result;
        }
    }, [filteredCountries, sortArea])

    

    useEffect(() => {
        // fetchAllCountries()
        fetchFilteredCountries()
   },[page])

   


    const changePage = (page) => {
        setPage(page)
    }

  
    console.log(sortType, sortArea)

    return (
        <main>
            <div className='main__content'>
                <div className='main__content__filter'>
                    <div className='filter flex flex-jc-fs'>
                        <Select defaultValue="default" onChange={(e) => setSortedType(e.target.value)}>
                            {sortByName.map(sort => {
                                return <option key={sort.value} value={sort.value} className='option'>{sort.value}</option>
                            })}
                        </Select>

                        <Select>
                            {sortByRegion.map(sortRegion => {
                                return <option key={sortRegion.value} value={sortRegion.value} defaultValue={sortRegion.selected === true} className="option">{sortRegion.value}</option>
                            })}
                        </Select>

                        <Select defaultValue="default" onChange={(e) => setSortArea(e.target.value)}>
                            {sortByArea.map(area => {
                                return <option key={area.value} value={area.value} className="option">{area.value}</option>
                            })}
                        </Select>

                        {view === true  ?
                            <button onClick={() => setView(false)} 
                                    className='grid flex flex-ai-c flex-jc-c'>
                                        <img width="18px" alt='grid-view-icon' 
                                        src={GridViewIcon}/>
                            </button>
                            :
                            <button onClick={() => setView(true)} 
                                    className='list flex flex-ai-c flex-jc-c'>
                                        <img width="18px" alt='list-view-icon' 
                                        src={ListViewIcon}/>
                            </button>
                        }
                    </div>
                    <div>
                    {!isLoading ? 
                        <div>Please wait, data is loading...</div>
                        :
                        <div className='countries__list flex flex-fw-w flex-jc-c'>
                            {(sortedCountries && sortedCountriesByArea) ?
                                sortedCountries
                                .filter(country => sortedCountriesByArea.includes(country))
                                .map((country, i) => {
                                return view === true ?
                                    <ListView index={i+1} country={country} key={i} />
                                    : 
                                    <GridView index={i+1} country={country} key={i} />
                                })
                            :
                            sortedCountries ?
                                sortedCountries.map((country, i) => {
                                return view === true ?
                                    <ListView index={i+1} country={country} key={i} />
                                    : 
                                    <GridView index={i+1} country={country} key={i} />
                                })
                            :
                            sortedCountriesByArea ?
                                sortedCountriesByArea.map((country, i) => {
                                return view === true ?
                                    <ListView index={i+1} country={country} key={i} />
                                    : 
                                    <GridView index={i+1} country={country} key={i} />
                                })
                            : null
                            }
                        </div>
                    }
                    {/* {!isLoading ? 
                        <div>Please wait, data is loading...</div>
                        :
                        <div class='countries__list flex flex-fw-w flex-jc-c'>
                            {sortedCountries ?
                            sortedCountries.map((country, i) => {
                                return view === true ?
                                <ListView index={i+1} country={country} key={i}  />
                                : 
                                <GridView index={i+1} country={country} key={i} />
                            })
                            :
                            sortedCountriesByArea ?
                                sortedCountriesByArea.map((country, i) => {
                                return view === true ?
                                    <ListView index={i+1} country={country} key={i}  />
                                    : 
                                    <GridView index={i+1} country={country} key={i} />
                                })
                                : null
                            }
                        </div>
                        } */}
                        
                    </div>
                </div>
            </div>
           
            <Pagination
                page={page}
                totalPages={totalPages}
                changePage={changePage}
            />
        </main>
    );
};

export default Main;