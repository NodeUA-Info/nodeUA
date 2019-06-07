import React from "react";
import withAuth from "../withAuth";
const Profile = () => <div>Profile</div>;

export default withAuth(session => session && session.getCurrentUser)(Profile);
