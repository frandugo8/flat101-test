  
import styles from './mobileNavButton.module.scss';
import { toggleMobileNav } from '../../redux/slices/data.slice';
import { useAppSelector, RootState, useAppDispatch } from '../../redux/store/store';

export default function MobileNavButton() {
  const isMobileNavOpen = useAppSelector((state: RootState) => state.data.isMobileNavOpen)
  const dispatch = useAppDispatch()

  const handleMobileNavButtonClick = (): void => {
    dispatch(toggleMobileNav())
  }

  return (
    <button type="button" data-testid="mobileNavButton" className={styles.mobileNavButton} onClick={handleMobileNavButtonClick}>
      <svg
        className={isMobileNavOpen? `${styles.ham} ${styles.ham___isActive}` : styles.ham}
        viewBox="0 0 100 100">
        <path
          className={isMobileNavOpen? 
            `${styles.line} ${styles.line___top} ${styles.line___topActive}`
            : `${styles.line} ${styles.line___top}`}
          d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003
            -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40" />
        <path
          className={styles.line}
          d="m 30,50 h 40" />
        <path
          className={isMobileNavOpen?
            `${styles.line} ${styles.line___bottom} ${styles.line___bottomActive}`
            : `${styles.line} ${styles.line___bottom}`}
          d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,
          -27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40" />
      </svg>
    </button>
  );
}
