
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import styles from './app.module.scss';
import FormComponent from './components/form/form.component';
import ListComponent from './components/list/list.component';
import MobileNavComponent from './components/mobile-nav/mobile-nav.component';
import NavigationMenuComponent from './components/navigation-menu/navigation-menu.component';

export default function AppComponent() {
  return (
    <BrowserRouter>

    <div className={styles.app}>

        <MobileNavComponent/>
  
        <div className={styles.content}>
          <NavigationMenuComponent/>

          <Routes>
            <Route path={"/products"} element={<ListComponent/>}/>
            <Route path={"/new"} element={<FormComponent/>}/>
            <Route path='*' element={<Navigate to="/products?page=1"/>}/>
          </Routes>
        </div>
    </div>
    </BrowserRouter>

  );
}
