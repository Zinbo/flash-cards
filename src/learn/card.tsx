import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo } from '@fortawesome/free-solid-svg-icons'

interface CardProps {
    front: string,
    back: string,
    number: number
}

const Categories: React.FC<CardProps> = (props: CardProps) => {
    const [facingFront, toggleFacingFront] = useState(true);
    //TODO: Display card number
    return (
        <div className="card-holder">
            <div className="card">
                <div className='card__flip-card'>
                    <span onClick={() => toggleFacingFront(!facingFront)}>
                        <FontAwesomeIcon icon={faRedo} />
                    </span>
                </div>
                {facingFront ?
                    <div className="card__content--front">{props.front}</div> :
                    <div className="card__content--back">{props.back}</div>}
                    {
                        //TODO: Implement buttons
                        facingFront ? 
                        (<div className="card__actions"><Button>I Already Know It!</Button></div>) :
                        (<div className="card__actions">
                            <Button className="card__prev-button">I knew it!</Button>
                            <Button className="card__next-button">Got it wrong...</Button>
                        </div>)
                    }
            </div>


        </div>
    );
}

export default Categories;