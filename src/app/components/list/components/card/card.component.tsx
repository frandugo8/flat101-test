
import { useState } from 'react';
import { Product } from '../../../../shared/models/product.interface';
import styles from './card.module.scss';
import undefinedImage from '../../../../../assets/shared/undefined.png'
import favIcon from '../../../../../assets/shared/fav.svg'
import filledFavIcon from '../../../../../assets/shared/fav-filled.svg'

interface CardProps {
  product: Product  
}

export default function CardComponent({product}: CardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>()
  const [isFavButtonClicked, setIsFavButtonClicked] = useState<boolean>(false)

  return (
    <div className={styles.card}>
  
      <button aria-label="fav-button" type="button" className={styles.fav} onClick={() => setIsFavButtonClicked(!isFavButtonClicked)}>
        <img
          style={{visibility: isFavButtonClicked? "hidden" : "visible"}}
          src={favIcon}
          className={styles.fav__icon}
          alt="fav"/>
        <img
          style={{visibility: isFavButtonClicked? "visible" : "hidden"}}
          src={filledFavIcon}
          className={styles.fav__icon}
          alt="fav-filled"/>
      </button>
  
      <div className={styles.image}>
        <img
          style={{display: isImageLoaded? "block" : "none"}}
          src={product.imageURL}
          className={styles.image__content}
          alt="product_image"
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setIsImageLoaded(false)}/>

        <img
          style={{display: isImageLoaded? "none" : "block"}}
          src={undefinedImage}
          className={styles.image__content}
          alt="default_image"/>
      </div>
      
      <div className={styles.details}>
        <div className={styles.details__name}>{product.name}</div>
        {product.description? <div className={styles.details__description}>{product.description}</div> : ""}
        <div className={styles.details__price}>{`${product.price}€/\u33A1`}</div>
      </div>
    </div>
  );
}
