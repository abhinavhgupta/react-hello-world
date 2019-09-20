import React from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../assets/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { COMMENTS } from '../assets/comments';
import { PROMOTIONS } from '../assets/promotions';
import { LEADERS } from '../assets/leaders';
import DishDetail from './DishdetailComponent';
import About from './AboutComponent';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS
        };
    }



    render() {
        const HomePage = () => {
            return (
                <Home
                    dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                    promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.state.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }

        const AboutPage = () => {
            return (<About leaders={this.state.leaders} />);
        }

        const DishWithId = ({ match }) => {
            console.log(match);
            return (
                < DishDetail dish={this.state.dishes.filter((dish) =>
                    dish.id === parseInt(match.params.dishId, 10)
                )[0]}
                    comments={this.state.comments.filter((comment) =>
                        comment.dishId === parseInt(match.params.dishId, 10))} >

                </DishDetail >
            )
        }

        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={HomePage}></Route>
                    <Route path="/aboutus" component={AboutPage}></Route>
                    <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />}></Route>
                    <Route path="/menu/:dishId" component={DishWithId}></Route>
                    <Route exact path='/contactus' component={Contact} />} />
                    <Redirect to="/home"></Redirect>
                </Switch>
                <Footer />
            </div >
        );
    }
}

export default Main;