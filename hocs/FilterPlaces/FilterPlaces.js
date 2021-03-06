
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Icon } from "components/atoms";
import { faChevronRight, faTimes, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import "components/molecules/Filter/Filter.module.scss";
import { fetchPlace, fetchGeolocationsById } from '../../services/places';
import useDebounce from '../../utils/hooks/useDebounce';
import { Spinner } from '@zeit-ui/react'
import { useGeolocation } from 'react-use';


const FilterPlaces = forwardRef((props, ref) => {
    const [nearBy, setNearBy] = useState(false);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingPlaces, setLoadingPlaces] = useState(false);

    const [places, setPlaces] = useState([]);
    const searchRef = useRef(null);
    const nearById = 'nearBy';
    const geoLocation = useGeolocation()
    const debouncedSearchTerm = useDebounce(searchValue, 500);

    useImperativeHandle(ref, () => ({
        removeSelected() {
            setSelected(null);
            setOpen(false);
        },
    }));

    useEffect(() => {
        if (geoLocation && !geoLocation.loading && geoLocation.latitude && geoLocation.longitude) {
            setNearBy(true);
        } else {
            setNearBy(false);
        }
    }, [geoLocation])

    useEffect(() => {
        if (open) searchRef.current.focus()
    }, [open]);

    useEffect(() => {
        if (debouncedSearchTerm) {
            setLoading(true);
            fetchPlaces(debouncedSearchTerm.toLowerCase())
        }
    }, [debouncedSearchTerm]);

    async function fetchPlaces(search) {
        const placesResult = await fetchPlace(search);
        if (placesResult && placesResult.results && placesResult.results.length > 0) {
            setPlaces(placesResult.results.map(place => ({
                id: place.id,
                name: place.name,
                secondaryName: place.secondary,
            })));
            setLoading(false);
        }
    }

    async function handleSelect(value) {
        setLoadingPlaces(true);
        if (value === '') {
            props.handleChange(null);
            setLoadingPlaces(false);
            return false;
        }

        if (value === nearById) {
            if (geoLocation && !geoLocation.loading && geoLocation.latitude && geoLocation.longitude) {
                props.handleChange({
                    lat: geoLocation.latitude,
                    long: geoLocation.longitude,
                });
                return setLoadingPlaces(false);
            }
        }

        const newGeolocations = await fetchGeolocationsById([value]);
        if (newGeolocations && newGeolocations.length > 0) {
            props.handleChange({
                lat: newGeolocations[0].geolocation.lat,
                long: newGeolocations[0].geolocation.long,
            })
            return setLoadingPlaces(false);
        }
    }

    let items = [...places];
    if (nearBy && (!searchValue || searchValue.length === 0)) {
        items = [
            {
                id: nearById,
                name: 'Perto de mim',
            },
            ...items,
        ]
    }

    const selectedItem = items.find(item => item.id === selected);

    return (
        <div className="filter">
            {!open
                ? (
                    <button
                        className={`filter__button ${selectedItem ? "filter__button--active" : ""}`}
                        onClick={() => setOpen(!open)}
                    >
                        <div className="filter__button__label">
                            <p title='title'>Localização</p>
                            <p title='desc'>{selectedItem ? selectedItem.name : 'todos os locais'}</p>
                        </div>

                        <span className="filter__arrow">
                            {loadingPlaces
                                ? <Spinner size="small" />
                                : <Icon icon={faChevronRight} />
                            }


                        </span>
                    </button>
                )
                : (
                    <div className="filter__list">
                        <div className="filter__list__head" onClick={() => setOpen(false)}>
                            {loadingPlaces
                                ? <Spinner size="small" />
                                : <Icon icon={faChevronLeft} />
                            }
                            <span>Localização</span>
                        </div>


                        <input
                            value={searchValue}
                            ref={searchRef}
                            className="filter__list__item"
                            type="text"
                            placeholder='Pesquisar locais'
                            onChange={(e) => setSearchValue(e.target.value)}
                        />


                        <div className="filter__list__scrollable">
                            {loading && (
                                <div
                                    className='filter__list__item filter__list__item__loading'
                                >
                                    <label>A carregar resultados...</label>
                                </div>
                            )}
                            {items.map(item => (
                                <div
                                    key={item.id}
                                    className={`filter__list__item ${
                                        item.id === selected ? "filter__list__item--selected" : ""
                                        }`}
                                    onClick={() => {
                                        setSelected(item.id === selected ? null : item.id)
                                        handleSelect(item.id === selected ? '' : item.id)
                                        setOpen(false);
                                    }}
                                >
                                    <div>
                                        <input type="radio" checked={item.id === selected} id={`radio${item.id}`} />
                                        <label htmlFor={`radio${item.id}`}>{item.name} {item.secondaryName ? ` - ${item.secondaryName}` : ''}</label>
                                    </div>
                                    {item.id === selected && (
                                        <div className='filter__list__item__remove'>
                                            <Icon icon={faTimes} onClick={() => {
                                                setSelected('')
                                                handleSelect('')
                                                setOpen(false);
                                            }} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
        </div>
    );
})

export default FilterPlaces;