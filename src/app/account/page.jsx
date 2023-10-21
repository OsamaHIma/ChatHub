"use client";
import { toast } from "react-toastify";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Translate } from "translate-easy";
import { MailIcon, Plus, AtSign } from "lucide-react";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import { useSession } from "next-auth/react";

const styles = {
  focused: {
    borderColor: "#2196f3",
  },
  accept: {
    borderColor: "#00e676",
    backgroundColor: "rgb(59 130 246 / 0.3)",
  },
  reject: {
    borderColor: "#ff1744",
    backgroundColor: "rgb(220 38 38 / 0.3)",
  },
};

const MyAccount = () => {
  const [user, setUser] = useState("");
  const { user: currentUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState();
  const [loading, setIsLoading] = useState(false);
  const [imagePath, setImagePath] = useState("");
  const [changesMade, setChangesMade] = useState(false);
  const { data: session, update } = useSession();

  // Set token and user on session change
  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
      setImagePath(
        `${currentUser.avatar}`,
      );
    }
  }, [currentUser]);

  const onChangeInput = ({ target: { name, value } }) => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    setChangesMade(true);
  };

  const updateSession = async (updatedUser) => {
    await update({
      ...session,
      user: {
        ...updatedUser,
      },
    });
  };

  // Save changes to user data
  const handleSaveChanges = async () => {
    if (!user) return;
    setIsLoading(true);
    const formData = new FormData();

    // Append the user data to the FormData object
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("name", user.name);
    formData.append("password", user.password);
    formData.append("about", user.about);

    // Append the image file to the FormData object
    formData.append("avatar", uploadedPhoto);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/edit_user`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (data.status) {
        toast.success(data.message);
        updateSession(data.user);
        setIsEditing(false);
        setChangesMade(false);
      }
    } catch (error) {
      toast.error(`Failed to update user information. ${error.massage}`);
      console.error(error);
    }
    setIsLoading(false);
  };

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/jfif": [],
      "image/png": [],
    },
    maxFiles: 1,
    disabled: !isEditing,
  });

  const style = useMemo(
    () => ({
      ...(isFocused && styles.focused),
      ...(isDragAccept && styles.accept),
      ...(isDragReject && styles.reject),
    }),
    [isFocused, isDragAccept, isDragReject],
  );
  useEffect(() => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setUploadedPhoto(file);
      setChangesMade(true);
      setImagePath(URL.createObjectURL(file));
    }
  }, [acceptedFiles, setUploadedPhoto]);

  useEffect(() => {
    setUser((prevState) => ({
      ...prevState,
      avatar: imagePath,
    }));
  }, [imagePath]);

  return (
    <div className="container px-10 py-12">
      <h1 className="mb-6 text-3xl font-bold">
        <Translate>Account Information</Translate>
      </h1>
      <div className="mb-8 flex items-center gap-3">
        <div
          {...getRootProps({
            className: "dropzone relative h-20 w-20 ",
            style,
          })}
          title="Upload your photo"
        >
          <input {...getInputProps()} />
          {imagePath ? (
            <div className="h-full w-full overflow-hidden rounded-full">
            <img
              alt="User avatar"
              src={imagePath}
              className="object-contain w-full "
            />
          </div>
          ) : (
            <div
              className={`flex h-full w-full items-center justify-center rounded-full ${isDragReject ? "!bg-red-500" : "!bg-gray-200"
                } text-xl font-bold text-gray-500`}
            >
              {user?.name && (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-xl font-bold text-gray-500 shadow">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          )}
          {isEditing && (
            <Plus
              size={30}
              className="absolute bottom-0 right-0 z-10 cursor-pointer rounded-full bg-indigo-500 p-1 text-gray-50"
            />
          )}
        </div>
        <div className="flex-1">
          <h2 className="mb-2 text-2xl font-bold">{user && user.name}</h2>
          <p className="w-full rounded-tl-md rounded-tr-md bg-indigo-50 px-4 py-2 text-gray-500 focus:outline-gray-200 dark:bg-slate-800 dark:text-slate-200">
            <MailIcon
              size={24}
              className="inline-block text-indigo-500  ltr:mr-2 rtl:ml-2"
            />
            {user && user.email}
          </p>
          <p className="w-full bg-indigo-50 px-4 py-2 text-gray-500 focus:outline-gray-200 dark:bg-slate-800 dark:text-slate-200">
            <AtSign
              size={24}
              className="inline-block text-indigo-500 ltr:mr-2 rtl:ml-2"
            />
            {user && user.username}
          </p>
        </div>
      </div>
      <h3 className="mb-4 w-full rounded-md py-2 font-bold dark:text-slate-200">
        <Translate>Personal Information:</Translate>
      </h3>
      <div className="grid gap-8 lg:grid-cols-2">
        <Input
          color="indigo"
          className={`${isEditing && "dark:text-gray-300"}`}
          label={<Translate>Name</Translate>}
          name="name"
          value={user && user.name}
          onChange={onChangeInput}
          disabled={!isEditing}
        />
        <Input
          color="indigo"
          className={`${isEditing && "dark:text-gray-300"}`}
          label={<Translate>Email</Translate>}
          name="email"
          value={user && user.email}
          onChange={onChangeInput}
          disabled={!isEditing}
        />
        <Textarea
          color="indigo"
          className={`${isEditing && "dark:text-gray-300"}`}
          label={<Translate>About</Translate>}
          name="about"
          value={user && user.about}
          onChange={onChangeInput}
          disabled={!isEditing}
        />
      </div>
      <div className="mt-3 flex justify-end">
        {isEditing ? (
          <>
            <Button
              disabled={loading}
              className="ltr:mr-4 rtl:mr-4"
              onClick={() => {
                setIsEditing(false);
                setChangesMade(false);
                setImagePath("");
              }}
              color="red"
            >
              <Translate>Cancel</Translate>
            </Button>

            <Button
              disabled={loading || !changesMade}
              color="indigo"
              className={`${isEditing && "dark:text-gray-300"}`}
              onClick={handleSaveChanges}
            >
              <Translate>Save Changes</Translate>
            </Button>
          </>
        ) : (
          <Button disabled={loading} onClick={() => setIsEditing(true)}>
            <Translate>Edit Information</Translate>
          </Button>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
