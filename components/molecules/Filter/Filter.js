import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { Icon } from "components/atoms";
import { faChevronRight, faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons'
import "./Filter.module.scss";

const Filter = forwardRef(({
  title = "ordenar por",
  descriptionDefault = 'Todos',
  items,
  itemSelected = null,
  searchEnabled = false,
  searchPlaceholder = "| procurar",
  handleChange,
  lazyFetchItems = null,
}, ref) => {
  const [itemsToShow, setItemsToShow] = useState([...items]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(itemSelected);
  const [searchValue, setSearchValue] = useState('');
  const searchRef = useRef(null);

  useImperativeHandle(ref, () => ({
    removeSelected() {
      setSelected(null);
      setOpen(false);
    },
  }));

  useEffect(() => {
    if (open) {
      if (lazyFetchItems) {
        lazyFetchItems();
      }
      if (searchEnabled) {
        searchRef.current.focus()
      }
    }
  }, [open]);

  useEffect(() => {
    setItemsToShow([...items]);
  }, [items])

  useEffect(() => {
    setItemsToShow([...items.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))]);
  }, [searchValue]);

  const selectedItem = items.find(item => item._id === selected);

  return (
    <div className="filter">
      {!open
        ? (
          <button
            className={`filter__button ${selectedItem ? "filter__button--active" : ""}`}
            onClick={() => setOpen(!open)}
          >
            <div className="filter__button__label">
              <p title='title'>{title}</p>
              <p title='desc'>{selectedItem ? selectedItem.name : descriptionDefault}</p>
            </div>

            <span className="filter__arrow">
              <Icon icon={faChevronRight} />
            </span>
          </button>
        )
        : (
          <div className="filter__list">
            <div className="filter__list__head" onClick={() => setOpen(false)}>
              <Icon icon={faChevronLeft} />
              <span>{title}</span>
            </div>

            {searchEnabled && (
              <input
                value={searchValue}
                ref={searchRef}
                className="filter__list__item"
                type="text"
                placeholder={searchPlaceholder}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            )}

            <div className="filter__list__scrollable">
              {itemsToShow.map(item => (
                <div
                  key={item._id}
                  className={`filter__list__item ${
                    item._id === selected ? "filter__list__item--selected" : ""
                    }`}
                  onClick={() => {
                    const newValue = selected === item._id ? '' : item._id
                    setSelected(newValue)
                    setOpen(false);
                    handleChange(newValue)
                  }}
                >
                  <div>
                    <input type="radio" checked={item._id === selected} id={`radio${item._id}`} />
                    <label htmlFor={`radio${item._id}`}>{item.name}</label>
                  </div>
                  {item._id === selected && (
                    <div className='filter__list__item__remove'>
                      <Icon icon={faTimes} onClick={() => {

                        setSelected('')
                        setOpen(false);
                        handleChange('')
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
});

export default Filter;
