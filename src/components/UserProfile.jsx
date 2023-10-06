import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Translate } from "translate-easy";

const UserProfile = ({ user, open, handleOpen }) => {
  return (
    <>
      <Dialog open={open} handler={handleOpen} className="dark:bg-gray-800">
        <DialogHeader className="flex flex-wrap items-center gap-3">
          {user.avatar && (
            <img
              alt="User avatar"
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/uploads/${user.avatar}`}
              className="max-w-[5rem] rounded-full"
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
    </>
  );
};

export default UserProfile;
