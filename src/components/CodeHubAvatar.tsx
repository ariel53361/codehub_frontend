import { Avatar } from "@chakra-ui/react";
import BASE_URL from "../services/base-url";
import { Link } from "react-router-dom";
import User from "../entities/User";

interface Props {
  user: User;
  additionalAttributes?: React.ComponentProps<typeof Avatar>;
}

const CodeHubAvatar = ({ user, additionalAttributes }: Props) => {
  return(  
  <Link to={`/user-details/${user.id}`}>
    <Avatar src={BASE_URL + user?.avatar} {...additionalAttributes} />
  </Link>
  )
};

export default CodeHubAvatar;
