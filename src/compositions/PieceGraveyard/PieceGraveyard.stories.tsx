import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import { PieceGraveyard as Component } from "./PieceGraveyard"
import { pieceGraveyardMockProps } from "./PieceGraveyard.mockProps"

export default {
  title: `Piece Graveyard`,
  component: Component,
} as ComponentMeta<typeof Component>

export const PieceGraveyard: ComponentStory<typeof Component> = () => (
  <Component {...pieceGraveyardMockProps}>Text</Component>
)
