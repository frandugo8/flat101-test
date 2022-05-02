
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import MobileNavButton from '../../shared/components/mobileNavButton/mobileNavButton.component';
import { Product } from '../../shared/models/product.interface';
import { setNavOption } from '../../shared/redux/slices/data.slice';
import { useAppDispatch } from '../../shared/redux/store/store';
import { ProductsRemoteService } from '../../shared/services/remote/products/products.remote.service';
import styles from './form.module.scss';
import SuccessfullScreenComponent from './successfull-screen/successfull-screen-form.component';

export default function FormComponent() {
  const { register, handleSubmit, reset } = useForm<Product>()

  const OPTIONS: Array<{
    text: string
    key: "name" | "price" | "imageURL"
    type: string
    isRequired: boolean
  }> = [{
    text: "Nombre",
    key: "name",
    type: "text",
    isRequired: true
  },{
    text: "Precio del \u33A1 en €",
    key: "price",
    type: "number",
    isRequired: true
  },{
    text: "Imagen URL",
    key: "imageURL",
    type: "text",
    isRequired: false
  }]

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setNavOption({navOption: "add"}))
  })

  const [hasUploadError, setHasUploadError] = useState<boolean>(false)
  const [uploadedSuccessfully, setUploadedSuccessfully] = useState<boolean>(false)

  const onSubmit: SubmitHandler<Product> = data => {
    ProductsRemoteService.saveProduct(data).then(() => {
      setUploadedSuccessfully(true)
      reset()
    }).catch(() => {
      setHasUploadError(true)
    })
  }

  const handleNewProduct = (): void => {
    setUploadedSuccessfully(false)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>

        <MobileNavButton/>

        {!uploadedSuccessfully?
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h1>Registrar un producto</h1>

            {hasUploadError? <div className={styles.form__error}>No se ha podido guardar correctamente. Vuelve a intentarlo</div> : ""}

            {OPTIONS.map((option, index: number) =>
              <div key={index} className={styles.option}>
                <label className={styles.label}>
                  {option.text}
                  {option.isRequired? <span className={styles.label__required}>(Obligatorio)</span> : ""}
                </label>

                <input
                  type={option.type}
                  aria-label={option.key}
                  className={styles.input}
                  {...register(option.key)}
                  required={option.isRequired}
                  maxLength={30}/>
              </div>
            )}

            <div className={styles.option}>
              <label className={styles.label}>Descripción</label>
              <textarea aria-label={"description"} className={styles.textarea} {...register("description")} placeholder={undefined} maxLength={300}/>
            </div>

            <input className={styles.submit} aria-label="submit" type="submit"/>
          </form>
          
          : <SuccessfullScreenComponent handleNewProduct={handleNewProduct}/>}
      </div>
    </div>
  )
}

