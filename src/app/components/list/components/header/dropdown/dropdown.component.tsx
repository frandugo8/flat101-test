
import styles from './dropdown.module.scss';
import sortIcon from '../../../../../../assets/shared/sort.svg'
import { useState } from 'react';
import { SortOptionsType } from '../../../../../shared/models/sort-options.type';

interface HeaderDropdownProps {
  handleSelection(sortBy: SortOptionsType, isDesc: boolean): void 
}

export default function HeaderDropdownComponent({handleSelection}: HeaderDropdownProps) {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false)

  const toggleDropdown = (): void => {
    setIsDropdownVisible(!isDropdownVisible)
  }

  const [optionSelected, setOptionSelected] = useState<number>(0)

  const OPTIONS: Array<{
    key: SortOptionsType
    text: string
    isDesc: boolean
  }> = [{
    key: "name",
    text: "Nombre: descendente",
    isDesc: true
  },{
    key: "name",
    text: "Nombre: ascendente",
    isDesc: false
  },{
    key: "price",
    text: "Precio: de más bajo a más alto",
    isDesc: true
  },{
    key: "price",
    text: "Precio: de más alto a más bajo",
    isDesc: false
  }]

  const handleDropdownSelection = (index: number): void => {
    setOptionSelected(index)
    handleSelection(OPTIONS[index].key, OPTIONS[index].isDesc)
  }

  return (
    <div className={styles.header}>
      <img src={sortIcon} alt="sort" className={styles.header__icon}/>

      <button type="button" aria-label="dropdown-button" className={styles.dropdown} onClick={toggleDropdown}>
        {OPTIONS[optionSelected].text}

        {isDropdownVisible?
          <ul data-testid="dropdown-list" className={styles.list}>
            {OPTIONS.map((option, index) => 
              <li key={index} className={styles.list__row} onClick={() => handleDropdownSelection(index)}>{option.text}</li>
            )}
          </ul>
        : ""}
      </button>
    </div>
  );
}
