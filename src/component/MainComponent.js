import React from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';
import { addCommentAction, fetchDishesAction } from '../redux/ActionCreator';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}


const mapDispatchToProps = (dispatch) => ({
    addCommentToProps: (dishId, rating, author, comment) => dispatch(addCommentAction(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishesAction()) },
    resetFeedbackForm: () => { dispatch(actions.reset('feedback')) }

})

class Main extends React.Component {

    constructor(props) {
        super(props);
    }

    /**
     * LifeCycle method will bound will be called or will be executed just after 
     * this component gets mounted into the view  of my applciation.
     * very good time to fetch any data that I require for my application
     * */
    componentDidMount() {
        console.log('componentDidMount', this.props);
        this.props.fetchDishes();
    }

    render() {
        console.log('Main ', this.props);
        const HomePage = () => {
            return (
                <Home
                    dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    errMsg={this.props.dishes.errorMessage}
                    promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }

        const AboutPage = () => {
            return (<About leaders={this.props.leaders} />);
        }

        const DishWithId = ({ match }) => {
            return (
                <DishDetail dish={this.props.dishes.dishes.filter((dish) =>
                    dish.id === parseInt(match.params.dishId, 10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    errmsg={this.props.dishes.errorMessage}
                    comments={this.props.comments.filter((comment) =>
                        comment.dishId === parseInt(match.params.dishId, 10))}
                    addCommentToDishDetail={this.props.addCommentToProps} />
            )
        }

        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={HomePage}></Route>
                    <Route path="/aboutus" component={AboutPage}></Route>
                    <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />}></Route>
                    <Route path="/menu/:dishId" component={DishWithId}></Route>
                    <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                    <Redirect to="/home"></Redirect>
                </Switch>
                <Footer />
            </div >
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));