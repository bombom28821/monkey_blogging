import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { LabelStatus } from "components/label";
import { Table } from "components/table";
import { auth, db } from "firebase-app/firebase-config";
import { deleteUser } from "firebase/auth";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { userRole, userStatus } from "utils/constants";

const UserTable = () => {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapshot) => {
      const result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUserList(result);
    });
  }, []);
  const handleDeleteUser = async (user) => {
    const docRef = doc(db, "users", user.id);
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteDoc(docRef);
          Swal.fire(
            "Deleted!",
            `${user.fullname} has been deleted.`,
            "success"
          );
        }
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  const renderUserItem = (user) => {
    return (
      <tr key={user.id}>
        <td title={user.id}>{user.id.slice(0, 5) + "..."}</td>
        <td className="whitespace-nowrap">
          <div className="flex items-center gap-x-3">
            <img
              src={user.avatar}
              alt=""
              className="object-cover w-10 h-10 rounded-md"
            />
            <div className="flex-1">
              <h3>{user.fullname}</h3>
              <time className="text-sm text-gray-400">
                {new Date(user.createAt.seconds * 1000).toLocaleDateString()}
              </time>
            </div>
          </div>
        </td>
        <td>{user.username}</td>
        <td title={user.email}>{user.email.slice(0, 8) + "..."}</td>
        <td>
          {user.status === userStatus.ACTIVE && (
            <LabelStatus type="success">Active</LabelStatus>
          )}
          {user.status === userStatus.PENDING && (
            <LabelStatus type="warning">Pending</LabelStatus>
          )}
          {user.status === userStatus.BAN && (
            <LabelStatus type="danger">Ban</LabelStatus>
          )}
        </td>
        <td>{renderRoleLabel(user.role)}</td>
        <td>
          <div className="flex items-center gap-x-3">
            <ActionView></ActionView>
            <ActionEdit
              onClick={() => navigate(`/manage/update-user?id=${user.id}`)}
            ></ActionEdit>
            <ActionDelete onClick={() => handleDeleteUser(user)}></ActionDelete>
          </div>
        </td>
      </tr>
    );
  };
  const renderRoleLabel = (role) => {
    switch (role) {
      case userRole.ADMIN:
        return "ADMIN";
      case userRole.MOD:
        return "MOD";
      case userRole.USER:
        return "USER";

      default:
        break;
    }
  };
  if (!userList && userList.length <= 0) return null;
  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Info</th>
          <th>Username</th>
          <th>Email address</th>
          <th>Status</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {userList.length > 0 && userList.map((user) => renderUserItem(user))}
      </tbody>
    </Table>
  );
};

export default UserTable;
