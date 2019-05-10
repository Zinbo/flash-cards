import React from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';

interface Category {
    id: number,
    name: string
}

interface LearnState {
    categories: Category[],
    loading: boolean
}

class ShowCategories extends React.Component<RouteComponentProps, LearnState> {
    state: LearnState = {
        loading: true,
        categories: []
    }

    componentDidMount() {
        //TODO: Load categories
        const categories: Category[] = [
            {
                id: 1,
                name: "Data Structures"
            },
            {
                id: 2,
                name: "Algorithms"
            },
            {
                id: 3,
                name: "Java"
            },
            {
                id: 4,
                name: "C++"
            }
        ]
        window.setTimeout(() => {
            this.setState({
                loading: false,
                categories
            })
        }, 2000);
    }

    render() {
        //TODO: Show stats
        const loadingElement = <h1>Loading!</h1>;
        const categories = <ButtonToolbar>
            {this.state.categories.map((category) => {
                return <Button style={{ marginRight: "10px" }} variant="outline-primary" onClick={() => this.props.history.push(`/cardstage?categoryId=${category.id}`)} >{category.name}</Button>
            })}
        </ButtonToolbar>
        return (
            <div>
                {
                    this.state.loading ?
                        loadingElement :
                        categories
                }
            </div>
        )
    }
}
export default ShowCategories;