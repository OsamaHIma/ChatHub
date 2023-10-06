import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useState } from "react";
import { Translate } from "translate-easy";
const FullImage = ({ openFullImage, handleOpenImage, user }) => (
  <Dialog
    open={openFullImage}
    handler={handleOpenImage}
    className="dark:bg-gray-800"
  >
    <DialogBody>
      <img
        alt="User avatar"
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/uploads/${user.avatar}`}
        className="w-full object-cover object-center"
      />
    </DialogBody>

    <DialogFooter>
      <Button variant="gradient" onClick={handleOpenImage}>
        <Translate>Close</Translate>
      </Button>
    </DialogFooter>
  </Dialog>
);
const UserProfile = ({ user, open, handleOpen }) => {
  const [openFullImage, setOpenFullImage] = useState(false);
  const handleOpenImage = () => setOpenFullImage(!openFullImage);

  return (
    <>
      <Dialog open={open} handler={handleOpen} className="dark:bg-gray-800">
        <DialogHeader className="flex flex-wrap items-center gap-3">
          {user.avatar && (
            <img
              alt="User avatar"
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/uploads/${user.avatar}`}
              className="max-w-[6rem] cursor-pointer rounded-full"
              onClick={handleOpenImage}
            />
          )}
          <h1 className="text-3xl dark:text-gray-200">
            <Translate>{user.name}'s Profile</Translate>
          </h1>
        </DialogHeader>
        <DialogBody divider>
          {user.about ? (
            <>
              <h3 className="text-xl text-gray-400">
                <Translate>About:</Translate>
              </h3>
              <p className="dark:text-slate-200">
                <Translate>{user.about}</Translate>
              </p>
            </>
          ) : (
            <p className="dark:text-gray-200">
              {user.name} did't setup the profile yet
            </p>
          )}
        </DialogBody>

        <DialogFooter>
          <Button variant="gradient" onClick={handleOpen}>
            <Translate>Close</Translate>
          </Button>
        </DialogFooter>
      </Dialog>
      <FullImage
        user={user}
        handleOpenImage={handleOpenImage}
        openFullImage={openFullImage}
      />
    </>
  );
};

export default UserProfile;
