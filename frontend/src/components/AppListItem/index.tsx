import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

interface AppListItemProps {
  title: string;
  onClick: () => void;
}

const AppListItem = ({ title, onClick }: AppListItemProps) => {
  return (
    <ListItem disablePadding role="list-item" className="list-item">
      <ListItemButton onClick={onClick}>
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  );
};

export default AppListItem;
