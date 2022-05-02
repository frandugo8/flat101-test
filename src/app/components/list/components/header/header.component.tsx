
import MobileNavButton from '../../../../shared/components/mobileNavButton/mobileNavButton.component';
import { SortOptionsType } from '../../../../shared/models/sort-options.type';
import HeaderDropdownComponent from './dropdown/dropdown.component';
import styles from './header.module.scss';
import SearcherComponent from './searcher/searcher.component';

interface HeaderProps {
  handleSelection(option: SortOptionsType, isDesc: boolean): void 
  handleSearch(text: string): void
}

export default function HeaderComponent({handleSelection, handleSearch}: HeaderProps) {
  return (
    <div className={styles.header}>

      <MobileNavButton/>

      <h1 className={styles.header__title}>Productos</h1>

      <div className={styles.tools}>
        <SearcherComponent handleSearch={handleSearch}/>

        <div className={styles.tools__dropdown}>
          <HeaderDropdownComponent handleSelection={handleSelection}/>
        </div>
      </div>

    </div>
  );
}
