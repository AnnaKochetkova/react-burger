import React from 'react';
import logo from './logo.svg';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <main className={styles.main} style={{width: 1220, display: 'flex', justifyContent: 'space-between', margin: '0 auto'}}>
          <BurgerIngredients/>
          <BurgerConstructor/>
      </main>
      
    </div>
  );
}

export default App;
