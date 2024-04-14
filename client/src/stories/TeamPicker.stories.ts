import type { Meta, StoryObj } from '@storybook/react';
import {TeamPicker} from "../TeamPicker";
import {Team} from "../api/models";
import {generateFakePlayers} from "./fake_users";


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Pregame/TeamPicker',
  component: TeamPicker,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
  },
  args: { },
} satisfies Meta<typeof TeamPicker>;

export default meta;
type Story = StoryObj<typeof meta>;


const {fake_players, this_player} = generateFakePlayers();

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Normal: Story = {
  args: {
    tableId: "8675309",
    player: this_player,
    players: fake_players,
    playTeam: (t: Team) => {
      if(this_player.team === t) {
        return;
      }

      this_player.team = t;
      this_player.isSpyMaster = false;
    },
    makeSpymaster: () => {
      if(this_player.isSpyMaster) {
        return;
      }

      fake_players.forEach((p) => {
        if(p.team === this_player.team) {
          p.isSpyMaster = false;
        }

        this_player.isSpyMaster = true;
      })
    },
    leaveTable: () => { alert('You left the table'); },
    logout: () => { alert('You logged out'); },
    startGame: () => { alert('You started the game'); },
  },
};
