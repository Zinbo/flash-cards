import * as React from 'react'

import { BsPrefixComponent } from 'react-bootstrap/helpers'
import AccordionCollapse from './AccordionCollapse'
import AccordionToggle from './AccordionToggle'

export interface AccordionProps extends React.HTMLProps<Accordion> {
  activeKey?: string
  defaultActiveKey?: string
}

declare class Accordion<As extends React.ElementType = 'div'> extends BsPrefixComponent<
  As,
  AccordionProps
> {
  public static Toggle: typeof AccordionToggle
  public static Collapse: typeof AccordionCollapse
}

export default Accordion
