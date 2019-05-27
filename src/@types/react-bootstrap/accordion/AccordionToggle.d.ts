import * as React from 'react'
import { BsPrefixComponent } from 'react-bootstrap/helpers'
import Button from './Button'

export interface AccordionToggleProps {
  eventKey: string
  onClick?: (event?: React.SyntheticEvent) => void
}

declare class AccordionToggle<As extends React.ReactType = 'button'> extends BsPrefixComponent<
  As,
  AccordionToggleProps
> {}

export default AccordionToggle
