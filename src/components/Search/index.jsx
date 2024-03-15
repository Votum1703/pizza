import React from 'react'
import styles from './Search.module.scss'

export const Search = ({searchValue, setSearchValue}) => {
  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground="new 0 0 32 32"
        id="EditableLine"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_42_"
          r="9"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          id="XMLID_44_"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"
        />
      </svg>      
      <input 
      value={searchValue}
      onChange={(event) => setSearchValue(event.target.value)} 
      className={styles.input} 
      placeholder='Поиск пиццы...' />
     {searchValue && ( 
     <svg onClick={() => setSearchValue('')}
      className={styles.clearIcon} xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 20 20">
      <rect x="0" fill="none" width="20" height="20"/>
      <g><path d="M14.95 6.46L11.41 10l3.54 3.54-1.41 1.41L10 11.42l-3.53 3.53-1.42-1.42L8.58 10 5.05 6.47l1.42-1.42L10 8.58l3.54-3.53z"/></g>
      </svg>)}

    </div>
    
  )
}

export default Search
