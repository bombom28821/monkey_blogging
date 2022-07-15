import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field } from "components/field";
import FieldCheckboxes from "components/field/FieldCheckboxes";
import ImageUpload from "components/image/ImageUpLoad";
import { Input } from "components/input";
import { Label } from "components/label";
import { Textarea } from "components/textarea";
import { auth, db } from "firebase-app/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import useFirebaseImage from "hooks/useFirebaseImage";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import { userRole, userStatus } from "utils/constants";

const UserAddNew = () => {
  const {
    control,
    watch,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { isValid, errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      username: "",
      avatar: "",
      email: "",
      password: "",
      description: "",
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createAt: new Date(),
    },
  });
  const {
    handleResetUpload,
    image,
    handleSelectImage,
    progress,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues);

  const handleCreateUser = async (values) => {
    console.log(values);
    if (!isValid) return;
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      addDoc(collection(db, "users"), {
        fullname: values.fullname,
        username: slugify(values.username || values.fullname, {
          lower: true,
          replacement: "",
          trim: true,
        }),
        email: values.email,
        password: values.password,
        avatar: image,
        status: Number(values.status),
        role: Number(values.role),
        createAt: serverTimestamp(),
      });
      reset({
        fullname: "",
        username: "",
        avatar: "",
        email: "",
        password: "",
        description: "",
        status: userStatus.ACTIVE,
        role: userRole.USER,
        createAt: new Date(),
      });
      handleResetUpload();
      toast.success(`Create user at email ${values.email} successfully`);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const watchStatus = watch("status");
  const watchRole = watch("role");
  return (
    <div>
      <DashboardHeading
        title="New user"
        desc="Add new user to system"
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
      <form onSubmit={handleSubmit(handleCreateUser)}>
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
          Add new user
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;
