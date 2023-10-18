import { Button, Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import { Translate } from "translate-easy";

const FullFile = ({ openFile, handleOpenFile, url }) => (
    <Dialog
        open={openFile}
        handler={handleOpenFile}
        className="dark:bg-gray-800 !max-h-[95vh] !overflow-hidden"
    >
        <DialogBody>
            <a href={url}>
                <embed src={url}
                    className="w-full"
                />
            </a>
        </DialogBody>

        <DialogFooter>
            <Button variant="gradient" onClick={handleOpenFile}>
                <Translate>Close</Translate>
            </Button>
        </DialogFooter>
    </Dialog>
);

export default FullFile