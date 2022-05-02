
import styles from './successfull-screen-form.module.scss';
import successIcon from '../../../../assets/shared/success.svg'
import { useNavigate } from 'react-router-dom';

interface SuccessfullScreenProps {
  handleNewProduct(): void
}
export default function SuccessfullScreenComponent({handleNewProduct}: SuccessfullScreenProps) {
  const navigate = useNavigate()

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <img className={styles.header__icon} src={successIcon} alt="success"/>
        <h1 className={styles.header__title}>Producto registrado con éxito</h1>
      </div>

      <div className={styles.buttons}>
        <button
          type="button"
          className={`${styles.buttons__button} ${styles.buttons__button___simple}`}
          onClick={handleNewProduct}>Registrar otro producto</button>

        <button
          type="button"
          className={styles.buttons__button}
          onClick={() => navigate("/products/page=1")}>Ver lista</button>
      </div>
    </div>
  )
}

