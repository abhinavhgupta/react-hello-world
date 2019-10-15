
import React from 'react';
import { Card, CardImg, CardText, CardBody, Label, CardTitle, ModalHeader, ModalBody, BreadcrumbItem, Breadcrumb, Button, Modal } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import Loading from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

// render a particular dish
function RenderDish({ dish }) {
    return (
        <FadeTransform in transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
            <Card key={dish.id}>
                <CardImg src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle >{dish.name}</CardTitle>
                    <CardText>
                        {dish.description}
                    </CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    );
}

// render comments 
function RenderComments({ comments, postComment, dishId }) {
    if (comments != null) {
        const commentsArea = comments.map((comment) => {
            return (
                <Fade in>
                    <li className="list-unstyled" key={comment.id}>
                        <p>{comment.comment}</p>
                        <p> -- {comment.author} , {comment.date}</p>
                    </li>
                </Fade>
            );
        });

        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    <Stagger in >
                        {commentsArea}
                    </Stagger>
                </ul>
                <CommentForm
                    dishId={dishId}
                    postCommentToFrom={postComment} />
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}


const DishDetail = (props) => {
    if (props.dishesLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    } else if (props.dishesErrMsg) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errmsg}</h4>
                </div>
            </div>
        )

    } else if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/menu'>
                                Menu
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active >
                            {props.dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments
                            comments={props.comments}
                            postComment={props.postCommentToDishDetail}
                            dishId={props.dish.id} />
                    </div>
                </div>
            </div>
        );
    } else {
        return (<div></div>);
    }

}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postCommentToFrom(this.props.dishId, values.rating, values.name, values.comment);
    }

    render() {
        return (
            <div className="container">
                <Button type="submit" outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-lg" />
                    Submit Comment
                    </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <div>
                                    <Control.select
                                        model=".rating"
                                        name="rating"
                                        id="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </div>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="name">Your Name</Label>
                                <div>
                                    <Control.text
                                        model=".name"
                                        id="name"
                                        name="name"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <div>
                                    <Control.textarea
                                        model=".comment"
                                        id="comment"
                                        name="comment"
                                        rows="6"
                                        className="form-control" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div md={{ offset: 2 }}>
                                    <Button type="submit" color="primary">
                                        Submit
                  </Button>
                                </div>
                            </div>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div >
        );
    }
}

export default DishDetail;