import { useContext } from "react";
import UsersList from "../../components/UsersList";
import UsersRegister from "../../components/UsersRegister";
import "./styles.css";
import { UserContext } from "../../Context/userContext";

export default function Main() {
  const { usersData, setUsersData } = useContext(UserContext);

  function handleDeleteUser(userId) {
    const localUsersData = [...usersData];

    const index = localUsersData.findIndex((item) => item.id === userId);

    localUsersData.splice(index, 1);

    setUsersData(localUsersData);
  }

  return (
    <div className="container-main">
      <UsersRegister />
      <UsersList handleDeleteUser={handleDeleteUser} />
    </div>
  );
}
