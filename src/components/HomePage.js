import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(image4.jpg)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }
}));

export default function HomePage() {
  const classes = useStyles();
    return (
        <div className={classes.root} style={{ textAlign: "center" }}>
          <h2>Organize your life with TodoApp</h2>
        </div>
    );
}
