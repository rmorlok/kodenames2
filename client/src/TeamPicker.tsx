import Typography from "@mui/material/Typography";
import * as React from "react";
import {Button, Card, CardContent, CardHeader, TextField, InputAdornment, Icon, Grid} from "@mui/material";
import {FiberNew, Close, FastForward} from "@mui/icons-material";
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import {Player, Team} from "./api/models";
import {BLUE_TEXT_CSS, RED_TEXT_CSS} from "./colors";
import Avatar from "@mui/material/Avatar";

type Props = {
    tableId: string;
    player: Player;
    players: Player[];
    playTeam: (t: Team) => void;
    makeSpymaster: () => void;
    leaveTable: () => void;
    logout: () => void;
    startGame: () => void;
};

type Column = {
    team: Team;
    display: string;
    css: object,
};

const columns: Column[] = [
    {
        team: 'red',
        display: 'Red',
        css: RED_TEXT_CSS,
    },
    {
        team: 'blue',
        display: 'Blue',
        css: BLUE_TEXT_CSS,
    }
];

export function TeamPicker({
    tableId,
    player,
    players,
    playTeam,
    makeSpymaster,
    leaveTable,
    logout,
    startGame,
}: Props) {
    const hasSpymaster = (color: Team) => {
        return players.findIndex((p) => p.team === color && p.isSpyMaster) !== -1;
    };

    const isMe = (p: Player) => p === player;

    const isMyTeam = (color: Team) => {
        return players.findIndex((p) => p.team === color && isMe(p)) !== -1;
    };

    const playersForTeam = (color: Team) => {
        return players
            .filter((p) => p.team === color)
            .sort((a, b) => {
                if(a.isSpyMaster) {
                    return -1;
                } else if (b.isSpyMaster) {
                    return 1;
                } else {
                    return a.user.name.localeCompare(b.user.name);
                }
            });
    };

    return (
        <Card sx={{ width: 600, maxWidth: 600 }} variant={'outlined'}>
            <CardContent>
                <Typography variant="h1" component="div" sx={{display: 'flex', justifyContent: 'center'}}>
                    Pick Teams
                </Typography>
                <Typography variant="h2" component="div" sx={{display: 'flex', justifyContent: 'center'}}>
                    Table ID#{tableId}
                </Typography>
            </CardContent>
            <CardContent>
                <Grid container spacing={2}>
                    {columns.map((c) => (
                        <Grid container xs={6} direction={'column'}>
                            <Typography variant="h3" component="div" sx={{...c.css, display: 'flex', justifyContent: 'center'}}>
                                {c.display} Team
                            </Typography>
                            {playersForTeam(c.team).map((p) => (
                                <Grid container direction={'row'}>
                                    <Avatar alt={p.user.name} src={p.user.picture} />
                                    <Typography variant="h5" component="span">
                                        {p.user.name}
                                    </Typography>
                                    {p.isSpyMaster ? (<FingerprintIcon />) : (<Icon />)}
                                </Grid>
                            ))}

                        </Grid>
                    ))}
                </Grid>
            </CardContent>
            <CardContent>
                <Typography variant="h5" component="div" sx={{...RED_TEXT_CSS, display: 'flex', justifyContent: 'center'}}>
                    {hasSpymaster('red') ? '' : 'Red needs a spymaster'}
                </Typography>
                <Typography variant="h3" component="div" sx={{...BLUE_TEXT_CSS, display: 'flex', justifyContent: 'center'}}>
                    {hasSpymaster('blue') ? '' : 'Blue needs a spymaster'}
                </Typography>
            </CardContent>
            <CardContent sx={{display: "flex"}}>
                <Button color={'secondary'} startIcon={<Close />} onClick={logout} sx={{flex: 1}}>
                    Logout
                </Button>
                <Button variant="contained" endIcon={<FiberNew />} onClick={leaveTable} sx={{flex: 1}}>
                    Leave Table
                </Button>
                <Button variant="contained" endIcon={<FiberNew />} onClick={startGame} sx={{flex: 1}}>
                    Start Game
                </Button>
            </CardContent>
        </Card>
    );
}