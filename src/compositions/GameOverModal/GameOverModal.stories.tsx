import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import { GameOverModal as Component } from "./GameOverModal"
import { gameOverModalMockProps } from "./GameOverModal.mockProps"

export default {
  title: `Game Over Modal`,
  component: Component,
} as ComponentMeta<typeof Component>

export const GameOverModal: ComponentStory<typeof Component> = () => (
  <Component {...gameOverModalMockProps}>Text</Component>
)
