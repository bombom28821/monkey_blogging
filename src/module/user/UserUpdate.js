import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field } from "components/field";
import FieldCheckboxes from "components/field/FieldCheckboxes";
import ImageUpload from "components/image/ImageUpLoad";
import { Input } from "components/input";
import { Label } from "components/label";
import { Textarea } from "components/textarea";
import { db } from "firebase-app/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useFirebaseImage from "hooks/useFirebaseImage";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { userRole, userStatus } from "utils/constants";

const UserUpdate = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
  });
  const [params] = useSearchParams();
  const userId = params.get("id");
  const imageUrl = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";

  const { image, setImage, handleSelectImage, progress, handleDeleteImage } =
    useFirebaseImage(setValue, getValues, imageName, handleUpdateImage);
  useEffect(() => {
    async function fetchData() {
      if (!userId) return;
      const docRef = doc(db, "users", userId);
      const dataUser = await getDoc(docRef);
      reset(dataUser.data());
      setImage(imageUrl);
    }
    fetchData();
  }, [reset, userId, imageUrl, setImage]);
  async function handleUpdateImage() {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
      avatar: "",
    });
  }
  const handleUpdateUser = async (values) => {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
      ...values,
      status: Number(values.status),
      role: Number(values.role),
      avatar: image,
    });
  };
  const watchStatus = watch("status");
  const watchRole = watch("role");
  return (
    <div>
      <DashboardHeading
        title="Update user"
        desc="Update user to system"
      ></DashboardHeading>
      <div className="rounded-full w-[200px] h-[200px] mx-auto mb-10">
        <ImageUpload
          className="!rounded-full h-full"
          image={image}
          onChange={handleSelectImage}
          progress={progress}
          handleDeleteImage={handleDeleteImage}
        ></ImageUpload>
      </div>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
            ></Input>
          </Field>
        </div>
        <div className="flex flex-col w-full mb-10 gap-y-3">
          <Label>Description</Label>
          <Textarea
            name="description"
            placeholder="Enter your description"
            control={control}
          ></Textarea>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                value={userStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.PENDING}
                value={userStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.BAN}
                value={userStatus.BAN}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.ADMIN}
                value={userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.MOD}
                value={userRole.MOD}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.USER}
                value={userRole.USER}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          kind="primary"
          className="mx-auto w-[200px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Update user
        </Button>
      </form>
    </div>
  );
};

export default UserUpdate;
