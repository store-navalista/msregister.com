import { SVG } from "@/components/SVG";
import clsx from "clsx";
import React, { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import css from "./DragDrop.module.css";

const DragDrop: FC<{ uploadedFile: File | null; setUploadedFile: Dispatch<SetStateAction<File | null>> }> = ({ uploadedFile, setUploadedFile }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            handleFile(files[0]);
        }
    };

    const handleFile = (file: File) => {
        setUploadedFile(file);
    };

    return (
        <div className={clsx(css.drag_drop, uploadedFile && css.uploaded, isDragOver && css.drag_over)}>
            <div className={css.drop_zone} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={handleClick}>
                {uploadedFile ? (
                    <button
                        className={css.change_btn}
                        onClick={(e) => {
                            e.stopPropagation();
                            setUploadedFile(null);
                        }}
                    >
                        {uploadedFile.name}
                    </button>
                ) : (
                    <div style={{ position: "relative" }}>
                        <p className={css.desc}>*This field is required</p>
                        <div className={css.drop_wrapper}>
                            <SVG.FileExport className={css.icon} />
                            <p>Select a file or drag it here</p>
                            <div className={css.dashed} />
                        </div>
                    </div>
                )}
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileInput} style={{ display: "none" }} />
        </div>
    );
};

export default DragDrop;
