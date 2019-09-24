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
import { addCommentAction } from '../redux/ActionCreator';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}


const mapDispatchToProps = (dispatch) => ({
    addCommentToProps: (dishId, rating, author, comment) => dispatch(addCommentAction(dishId, rating, author, comment))
})

class Main extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const HomePage = () => {
            return (
                <Home
                    dish={this.props.dishes.filter((dish) => dish.featured)[0]}
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
                <DishDetail dish={this.props.dishes.filter((dish) =>
                    dish.id === parseInt(match.params.dishId, 10))[0]}
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
                    <Route exact path='/contactus' component={Contact} />} />
                    <Redirect to="/home"></Redirect>
                </Switch>
                <Footer />
            </div >
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));