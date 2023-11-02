'use client'
import { Button, Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import { FileIcon } from "lucide-react";
import { Translate } from "translate-easy";

const PreviewUploadedFile = ({ openFile, handleOpenFile, url, file,handelSendFile }) => {
    const formatFileSize = (size) => {
        if (size === 0) {
          return '0 B';
        }
      
        const units = ['B', 'KB', 'MB', 'GB', 'TB'];
        const base = 1024;
        const digitGroups = Math.floor(Math.log10(size) / Math.log10(base));
      
        return `${(size / Math.pow(base, digitGroups)).toFixed(1)} ${units[digitGroups]}`;
      }
    return (
        <Dialog
            open={openFile}
            handler={handleOpenFile}
            className="dark:bg-gray-800 !max-h-[95vh] !max-w-fit overflow-y-auto"
            size="xs"
        >
            <DialogBody>

                {
                    file && (
                        (
                            <div className="file-preview flex items-center mt-4">
                                {file.type.includes("image") ? (
                                    <img
                                        src={url}
                                        alt="Preview"
                                        className="file-preview-image max-w-32 max-h-32"
                                    />
                                ) : file.type.includes("video") ? (
                                    <video
                                        src={url}
                                        alt="Preview"
                                        className="file-preview-video max-w-32 max-h-32"
                                        controls
                                    />
                                ) : (
                                    <div className="file-preview-icon flex items-center justify-center bg-gray-300 w-32 h-32">
                                        <FileIcon />
                                    </div>
                                )}
                                <div className="file-preview-details ml-4">
                                    <p className="file-preview-name font-bold truncate max-w-full">{file.name}</p>
                                    <p className="file-preview-size text-gray-500 text-sm">{formatFileSize(file.size)}</p>
                                </div>
                            </div>
                        )
                    )
                }

            </DialogBody>

            <DialogFooter className="flex items-center gap-7">
                <Button variant="gradient" onClick={handleOpenFile}>
                    <Translate>Close</Translate>
                </Button>
                <Button variant="gradient" color="green" onClick={handelSendFile}>
                    <Translate>Send</Translate>
                </Button>
            </DialogFooter>
        </Dialog>
    )
};

export default PreviewUploadedFile