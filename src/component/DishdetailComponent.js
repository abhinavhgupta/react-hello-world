
import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb } from 'reactstrap';
import { Link } from 'react-router-dom';


// render a particular dish
function RenderDish({ dish }) {
    return (
        // <Card key={dish.id}
        //     onClick={() => this.props.onClick(dish.id)}>
        <Card key={dish.id}
        >
            <CardImg src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle >{dish.name}</CardTitle>
                <CardText>
                    {dish.description}
                </CardText>
            </CardBody>
        </Card>
    );
}
// render comments 
function RenderComments({ comments }) {
    if (comments != null) {
        const commentsArea = comments.map((comment) => {
            return (
                <li className="list-unstyled" key={comment.id}>
                    <p>{comment.comment}</p>
                    <p> -- {comment.author} , {comment.date}</p>
                </li>
            );
        });

        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {commentsArea}
                </ul>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}
const DishDetail = (props) => {
    console.log(props);
    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row"> <Breadcrumb>

                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active >{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {/* {this.RenderDish(props.dish)} */}
                        <RenderDish dish={props.dish}></RenderDish>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}></RenderComments>
                        {/* {this.RenderComments(props.dish.comments)} */}
                    </div>
                </div></div>
        );
    } else {
        return (<div></div>);
    }

}
export default DishDetail;