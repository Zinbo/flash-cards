import React from 'react';
import { ButtonToolbar, Button, Col, Row } from 'react-bootstrap';
import queryString from 'query-string';
import Card from './card';
import Loading from '../common/loading'

interface MyProps {
    location: any
}

type CardData = {
    front: string;
    back: string;
}

interface MyState {
    loading: boolean,
    cards: JSX.Element[],
    categoryName: string,
    currentCardIndex: number
}

class CardStage extends React.Component<MyProps, MyState> {
    state: MyState = {
        loading: true,
        cards: [],
        categoryName: '',
        currentCardIndex: 0
    }

    getCards(categoryId: number): JSX.Element[] {
        // TODO: Need to actually load card data here based on categoryId
        const cardData = [
            {
                front: "What is merge sort?",
                back: "fdjfdfjhdjfdhfdjf"
            },
            {
                front: "What is bubble sort?",
                back: "dhfdjdshfsjfhdsfjsd"
            }
        ]

        return cardData.map((cardDatum, index) =>
            <Card
                front={cardDatum.front}
                back={cardDatum.back}
                number={index}
            />
        );

    }

    getCategoryName(categoryId: number) {
        //TODO: Get category name
        return "Algorithms";
    }

    componentDidMount() {
        let params = queryString.parse(this.props.location.search);
        let categoryId: number = NaN;
        if (typeof params.categoryId === "string") categoryId = Number(params.categoryId);
        if (isNaN(categoryId)) return; //TODO: Need to handle this
        const categoryName = this.getCategoryName(categoryId);
        const cards = this.getCards(categoryId);

        window.setTimeout(() => {
            this.setState({
                loading: false,
                cards,
                currentCardIndex: 0,
                categoryName
            })
        }, 1000);
    }

    render() {
        //TODO design navbar to select card
        //TODO: Display category name
        //TODO Display loading in center of page
        const isFirstCard = this.state.currentCardIndex === 0;
        const isLastCard = this.state.currentCardIndex === this.state.cards.length - 1;
        if(this.state.loading) return <Loading />
        return (
            <section className="card-stage">
                <Row>
                    <Col xs="12">
                        <h1>{this.state.categoryName}</h1>
                    </Col>
                </Row>
                {this.state.cards[this.state.currentCardIndex]}
                <ButtonToolbar>
                    <Button style={{ marginRight: "10px" }} variant="outline-primary" onClick={() => {
                        this.setState({ currentCardIndex: this.state.currentCardIndex - 1 });
                    }} disabled={isFirstCard} >Prev</Button>
                    <Button style={{ marginRight: "10px" }} variant="outline-primary" onClick={() => {
                        this.setState({ currentCardIndex: this.state.currentCardIndex + 1 });
                    }} disabled={isLastCard} >Next</Button>
                </ButtonToolbar>
            </section>
        )
    }
}

export default CardStage;