
import NavigationComponent from '../../shared/components/navigation/navigation.component';
import { RootState, useAppSelector } from '../../shared/redux/store/store';
import styles from './mobile-nav.module.scss';

export default function MobileNavComponent() {
  const isMobileNavOpen = useAppSelector((state: RootState) => state.data.isMobileNavOpen)

  return (
    <>
      {isMobileNavOpen?
        <div data-testid={"mobile-nav"} className={styles.navigation}>
          <NavigationComponent/>
        </div>
        : ""}
    </>
  )
}
