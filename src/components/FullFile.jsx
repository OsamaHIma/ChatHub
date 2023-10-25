'use client'
import { Button, Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import { Translate } from "translate-easy";

const FullFile = ({ openFile, handleOpenFile, url }) => (
    <Dialog
        open={openFile}
        handler={handleOpenFile}
        className="dark:bg-gray-800 !max-h-[95vh] overflow-y-auto"
        size="xs"
    >
        <DialogBody>
            <a href={url} target="_blank">
                <embed src={url}
                    className="max-w-full mx-auto rounded-lg"
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