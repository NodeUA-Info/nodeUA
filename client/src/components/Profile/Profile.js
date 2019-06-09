import React from "react";
import { Link } from "react-router-dom";
import UserInfo from "../Profile/UserInfo";
import withAuth from "../withAuth";
import { Button } from "reactstrap";

const Profile = ({ session }) => {
  return (
    <div className="wrap">
      <UserInfo session={session} />
      {session.getCurrentUser.roles.map(role => {
        if (role === "admin") {
          return (
            <div className="admin_links">
              <Button color="info">
                <Link className="admin_link" to="/test/add">
                  Додати тест
                </Link>
              </Button>
              <Button color="info" className="admin_btn">
                <Link className="admin_link" to="/chapter/add">
                  Додати статтю
                </Link>
              </Button>
            </div>
          );
        }
      })}
    </div>
  );
};

export default withAuth(session => session && session.getCurrentUser)(Profile);
