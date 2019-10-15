import React from 'react';
import {
    Card, CardText, CardBody, CardImg,
    CardTitle, CardSubtitle
} from 'reactstrap';
import Loading from './LoadingComponent';
import { FadeTransform } from 'react-animation-components';
import { baseUrl } from '../shared/baseUrl';

function RenderCard({ item, isLoading, errorMsg }) {
    if (isLoading) {
        return (
            <Loading />
        )
    } else if (errorMsg) {
        return (
            <h4>{errorMsg}</h4>
        )
    } else {
        return (
            <FadeTransform in transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
                <Card>
                    <CardBody>
                        <CardImg src={baseUrl + item.image} alt={item.name} />
                        <CardTitle>{item.name}</CardTitle>
                        {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                        <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
    }
}

function Home(props) {
    console.log('Home ', props);
    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard
                        item={props.dish}
                        isLoading={props.dishesLoading}
                        errorMsg={props.dishesErrMsg} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard
                        item={props.promotions}
                        isLoading={props.promotionsLoading}
                        errorMsg={props.promotionsErrMsg} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader}
                        isLoading={props.leadersLoading}
                        errorMsg={props.leadersErrMsg} />
                </div>
            </div>
        </div>
    );
}

export default Home;