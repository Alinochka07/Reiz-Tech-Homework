import React, { useState, useEffect, useMemo } from 'react';
import FetchData from '../../API/FetchData';
import './Main.scss';
import Select from '../UI/Select/Select';
import GridViewIcon from '../../icons/grid.png';
import ListViewIcon from '../../icons/list.png';
import GridView from '../UI/GridView/GridView';
import ListView from '../UI/ListView/ListView';
import Pagination from '../UI/Pagination/Pagination';


const sortByName = [
    {value: 'A - Z'},
    {value: 'Z - A'},
];

const sortByArea = [
    {value: 'All areas'},
    {value: 'Smaller than Lithuania'},
    {value: 'Bigger than Lithuania'},
];

const sortByRegion = [
    {value: 'All regions'},
    {value: 'Africa'},
    {value: 'Americas'},
    {value: 'Antarctic'},
    {value: 'Asia'},
    {value: 'Europe'},
    {value: 'Oceania'},
];



const Main = () => {

    const [filteredCountries, setFilteredCountries] = useState([]);
    const [totalPages, setTotalPages] = useState(21);
    const [limit, setLimit] = useState(12);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [view, setView] = useState(false);
    const [sortType, setSortedType] = useState('A - Z');
    const [sortArea, setSortArea] = useState('All areas');
    const [filterRegion, setFilterRegion] = useState('All regions');



    const fetchFilteredCountries = async () => {
        try {
        setIsLoading(true);
        const response = await FetchData.getByNameRegionArea();
        setFilteredCountries([...response]);
        setTotalPages(Math.ceil(response.length / limit));
        } catch (err) {
        setError(err);
        setIsLoading(false);
        console.log(error.message);
        }
    };

    useEffect(() => {
        fetchFilteredCountries();
    }, []);

    const handlePreviousPage = () => {
        setPageNumber((previousPageNumber) => previousPageNumber - 1);
    };

    const handleNextPage = () => {
        setPageNumber((previousPageNumber) => previousPageNumber + 1);
    };
  

    const sortedCountries = useMemo(() => {
        let result = filteredCountries;

        if (sortType === 'A - Z') {
        result = [...filteredCountries].sort((a, b) => {
            return a.name.common.localeCompare(b.name.common);
        });
        } else if (sortType === 'Z - A') {
        result = [...filteredCountries].sort((a, b) => {
            return b.name.common.localeCompare(a.name.common);
        });
        }
        return result;

    }, [filteredCountries, sortType]);


    const sortedCountriesByArea = useMemo(() => {
        let result = sortedCountries;

        if (sortArea === 'Smaller than Lithuania') {
            result = sortedCountries.filter((countryArea) => countryArea.area < 65300);
        } else if (sortArea === 'Bigger than Lithuania') {
            result = sortedCountries.filter((countryArea) => countryArea.area > 65300);
        } 
        return result;
    }, [sortedCountries, sortArea]);



    const filterCountriesByRegion = useMemo(() => {
        let result = sortedCountriesByArea;

        if (filterRegion !== 'All regions') {
        result = sortedCountriesByArea.filter((countryRegion) => countryRegion.region === filterRegion);
        } 

        return result;
    }, [sortedCountriesByArea, filterRegion]);


  
  const startIndex = (pageNumber - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedCountries = filterCountriesByRegion.slice(startIndex, endIndex);

  return (
        <main>
            <div className="main__content flex flex-fw-w">
                <div className="main__content__filter flex">
                    <div className='filter flex flex-jc-fe flex-fw-w'>
                        <Select defaultValue="A - Z" onChange={(e) => setSortedType(e.target.value)}>
                            {sortByName.map(sort => {
                                return <option key={sort.value} value={sort.value}>{sort.value}</option>
                            })}
                        </Select>

                        <Select defaultValue='All regions' label='Filter by region' onChange={(e) => setFilterRegion(e.target.value)}>
                            {sortByRegion.map(sortRegion => {
                                return <option key={sortRegion.value} value={sortRegion.value}>{sortRegion.value}</option>
                            })}
                        </Select>

                        <Select defaultValue="All areas" onChange={(e) => setSortArea(e.target.value)}>
                            {sortByArea.map(area => {
                                return <option key={area.value} value={area.value}>{area.value}</option>
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
                </div>
                <div className='main__listing flex flex-fw-w'>
                {!isLoading ? (
                    <div>Please wait, data is loading...</div>
                ) 
                : 
                    <div className="countries__list flex flex-fw-w flex-jc-c">
                        {paginatedCountries.map((country, i) => {
                        return view === true ? (
                        <ListView index={i + 1} country={country} key={i} />
                        ) : (
                        <GridView index={i + 1} country={country} key={i} />
                        );
                    })}
                    </div>
                }
                </div>
            </div>
            <div className='pagination__content flex flex-jc-c'>
                <Pagination
                    filteredCountries={filteredCountries}
                    sortedCountries={sortedCountries}
                    sortedCountriesByArea={sortedCountriesByArea}
                    filterCountriesByRegion={filterCountriesByRegion}
                    handlePreviousPage={handlePreviousPage}
                    handleNextPage={handleNextPage}
                    pageNumber={pageNumber} 
                    endIndex={endIndex}
                />
            </div>
        </main>
    );
};

export default Main;