import { ReactNode } from "react";
import Circular from "@mui/material/CircularProgress";

interface AppContainerProps {
  isLoading: boolean;
  component: ReactNode;
}

const AppContainer = ({ isLoading, component }: AppContainerProps) => {
  return <>{isLoading ? <Circular /> : component}</>;
};

export default AppContainer;
