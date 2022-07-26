import AccessControl from "accesscontrol";

const roles = new AccessControl();

roles
  .grant("USER") // --> USER ROLE
  .readOwn("profile");

roles
  .grant("ADMIN") // --> ADMIN ROLE
  .extend("USER")
  .updateOwn("profile");

export default roles;
