import React from "react";
import { navigate } from "@reach/router";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import RepeatOne from '@material-ui/icons/RepeatOneOutlined'
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import SpaOutLined from "@material-ui/icons/Spa";
import GroupWorkOutlined from '@material-ui/icons/GroupWorkOutlined'

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export default function NestedList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <RepeatOne />
        </ListItemIcon>
        <ListItemText primary="One" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            onClick={() => navigate("/dashboard/one/users")}
            className={classes.nested}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem
            button
            onClick={() => navigate("/dashboard/one/packages")}
            className={classes.nested}
          >
            <ListItemIcon>
              <GroupWorkOutlined />
            </ListItemIcon>
            <ListItemText primary="Service Packages" />
          </ListItem>
          <ListItem
            onClick={() => navigate("/dashboard/one/calendar")}
            button
            className={classes.nested}
          >
            <ListItemIcon>
              <SpaOutLined />
            </ListItemIcon>
            <ListItemText primary="Services" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
