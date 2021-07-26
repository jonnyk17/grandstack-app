import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
export{LogoutButton}
import Button from '@material-ui/core/Button';
const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button variant="contained" color="primary" onClick={() => {logout({ returnTo: window.location.origin })}}>
      Log Out
    </Button>
  );
};

export default LogoutButton;