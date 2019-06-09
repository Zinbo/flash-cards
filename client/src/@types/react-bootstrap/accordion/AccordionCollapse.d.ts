import * as React from 'react'

import Collapse, { CollapseProps } from './Collapse'

import { BsPrefixComponent } from 'react-bootstrap/helpers'

export interface AccordionCollapseProps
  extends CollapseProps,
    React.HTMLAttributes<HTMLDivElement> {
  eventKey: string
}

declare class AccordionCollapse extends BsPrefixComponent<
  typeof Collapse,
  AccordionCollapseProps
> {}

export default AccordionCollapse
