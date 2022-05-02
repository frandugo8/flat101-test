
import NavigationComponent from '../../shared/components/navigation/navigation.component';
import styles from './navigation-menu.module.scss';

export default function NavigationMenuComponent() {
  return (
    <div className={styles.navigation}>
      <NavigationComponent/>
    </div>
  );
}
