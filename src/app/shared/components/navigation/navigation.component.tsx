  
import styles from './navigation.module.scss';
import cartIcon from '../../../../assets/nav/cart.svg'
import addIcon from '../../../../assets/nav/add.svg'
import { useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store/store';
import { toggleMobileNav } from '../../redux/slices/data.slice';

export default function NavigationComponent() {
  const OPTIONS: Array<{
    img: string
    key: "products" | "add"
    label: string
  }> = [{
    img: cartIcon,
    key: "products",
    label: "Productos"
  },{
    img: addIcon,
    key: "add",
    label: "Registrar un producto"
  }]

  const navOption = useAppSelector((state: RootState) => state.data.navOption)
  const navOpisMobileNavOpention = useAppSelector((state: RootState) => state.data.isMobileNavOpen)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleClick = (option: "products" | "add"): void => {
    navigate(option === "products"? "/products?page=1" : "/new")

    if (navOpisMobileNavOpention) dispatch(toggleMobileNav())
  }

  return (
    <nav className={styles.navigation}>
      {OPTIONS.map((option, index) => 
        <div
          data-testid={`${option.key}_navigation`}
          key={index}
          className={navOption === option.key? `${styles.option} ${styles.option___selected}` : styles.option}
          onClick={() => handleClick(option.key)}>
          <img src={option.img} className={styles.option__icon} alt={option.key}/>
          <div className={styles.option__label}>{option.label}</div>
        </div>
      )}
    </nav>
  );
}
