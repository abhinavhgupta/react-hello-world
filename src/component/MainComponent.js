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
import { postCommentAction, fetchDishesAction, fetchCommentsAction, fetchPromotionsAction, fetchLeadersAction, postFeedbackAction } from '../redux/ActionCreator';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}


const mapDispatchToProps = (dispatch) => ({
    postCommentToProps: (dishId, rating, author, comment) => dispatch(postCommentAction(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishesAction()) },
    fetchComments: () => { dispatch(fetchCommentsAction()) },
    fetchPromos: () => { dispatch(fetchPromotionsAction()) },
    fetchLeaders: () => { dispatch(fetchLeadersAction()) },
    resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
    postFeedbackToProps: (firstName, lastName, telNum, agree, email, contactType, message) => dispatch(postFeedbackAction(firstName, lastName, telNum, agree, email, contactType, message))

})

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    /**
     * LifeCycle method will bound will be called or will be executed just after 
     * this component gets mounted into the view  of my applciation.
     * very good time to fetch any data that I require for my application
     * */
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    render() {
        const HomePage = () => {
            return (
                <Home
                    dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMsg={this.props.dishes.errorMessage}
                    promotions={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                    promotionsLoading={this.props.promotions.isLoading}
                    promotionsErrMsg={this.props.promotions.errorMessage}
                    leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                    leadersLoading={this.props.leaders.isLoading}
                    leadersErrMsg={this.props.leaders.errorMessage}
                />
            );
        }

        const AboutPage = () => {
            return (<About leaders={this.props.leaders.leaders}
                leadersLoading={this.props.leaders.isLoading}
                leadersErrMsg={this.props.leaders.errorMessage} />);
        }

        const DishWithId = ({ match }) => {
            return (
                <DishDetail dish={this.props.dishes.dishes.filter((dish) =>
                    dish.id === parseInt(match.params.dishId, 10))[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMsg={this.props.dishes.errorMessage}
                    comments={this.props.comments.comments.filter((comment) =>
                        comment.dishId === parseInt(match.params.dishId, 10))}
                    commentsErrMsg={this.props.comments.errorMessage}
                    postCommentToDishDetail={this.props.postCommentToProps} />
            )
        }

        return (
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route path="/home" component={HomePage}></Route>
                            <Route path="/aboutus" component={AboutPage}></Route>
                            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />}></Route>
                            <Route path="/menu/:dishId" component={DishWithId}></Route>
                            <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}
                                postFeedbackToFrom={this.props.postFeedbackToProps} />} />
                            <Redirect to="/home"></Redirect>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div >
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));