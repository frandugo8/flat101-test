
import React, { useRef } from 'react';
import styles from './searcher.module.scss';
import searchIcon from '../../../../../../assets/shared/search.svg'

interface SearcherProps {
  handleSearch(text: string): void
}

export default function SearcherComponent({handleSearch}: SearcherProps) {
  const inputRef = useRef<any>()

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter") {
      handleSearch(inputRef.current.value)
    }
  }

  return (
    <div className={styles.searcher}>
      <input
        ref={inputRef}
        type="text"
        placeholder={"Buscar productos"}
        className={styles.searcher__input}
        onKeyDown={handleKeyDown}/>

      <button type="button" data-testid="search-button" className={styles.searchButton} onClick={() => handleSearch(inputRef.current.value)}>
        <img src={searchIcon} className={styles.searchButton__icon} alt="search"/>
      </button>
    </div>
  );
}
