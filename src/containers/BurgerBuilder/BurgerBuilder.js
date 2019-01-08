import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
}

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: null,
      totalPrice: 4,
      puchasable: false,
      purchasing: false,
      loading: false,
      error: false
    }
  }

  componentDidMount () {
    axios.get('https://burger-builder-35d8c.firebaseio.com/ingredients.json')
    .then(response => {
      this.setState({ingredients: response.data})
    })
    .catch(error => {
      this.setState({error: true})
    })
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({puchasable: sum > 0})
  }
  

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount<= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.setState({loading: true});
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'name surname',
        address: {
          street: 'teststreet',
          zip: '1234',
          country: 'pl'
        },
        email: 'mail.test.pl'
      },
      deliveryMethod: 'fast'
    }
    axios.post('/order.json', order)
      .then(response => {
        this.setState({loading: false, purchasing: false});
        console.log(response);
      })
      .catch(error => {
        this.setState({loading: false, purchasing: false});
        console.log(error)
      });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    if (this.state.loading) {
      orderSummary = <Spinner />
    }
    if (this.state.ingredients) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls 
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled = {disabledInfo}
            puchasable = {this.state.puchasable}
            ordered={this.purchaseHandler}
            price = {this.state.totalPrice}
          />
        </React.Fragment>
      );
      orderSummary = (
        <OrderSummary 
          ingredients={this.state.ingredients} 
          price={this.state.totalPrice}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}/>
      )
    }

    return (
      <React.Fragment>
        <Modal 
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);