import React from 'react';

import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

const Burger = ( props ) => {
    const transformedIngredients = Object.keys(props.ingredients).map(ingredientKey => {
        return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
            return <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />;
        });
    }).reduce((arr, el) => {
        console.log(arr);
        console.log(el);
        return arr.concat(el);
    }, []);
    console.log(transformedIngredients);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
};

export default Burger;