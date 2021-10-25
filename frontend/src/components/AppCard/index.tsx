import { ReactNode } from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

interface AppCardProps {
  title: string;
  className?: string;
  children: ReactNode;
}

const AppCard = ({ title, className, children }: AppCardProps) => {
  return (
    <Card sx={{ minWidth: 275 }} className={className}>
      <CardHeader title={title} />
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default AppCard;
