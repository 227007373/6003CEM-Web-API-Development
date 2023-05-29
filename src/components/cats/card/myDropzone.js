import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './card.module.scss';
const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
};

const thumb = {};

const thumbInner = {};

const img = {};

const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

const MyDropzone = ({ setForm }) => {
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': [],
        },
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
            toBase64(acceptedFiles[0]).then((res) => {
                setForm((p) => {
                    return { ...p, image: res };
                });
            });
        },
        multiple: false,
    });

    const thumbs = files.map((file) => (
        <div
            className={`${styles.thumb}`}
            style={thumb}
            key={file.name}
        >
            <img
                src={file.preview}
                style={img}
                // Revoke data uri after image is loaded
                onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                }}
            />
        </div>
    ));

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, []);

    return (
        <section className={`container ${styles.dropzone}`}>
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                {thumbs.length == 0 ? (
                    <p>Drag 'n' drop some files here, or click to select files</p>
                ) : (
                    <aside style={thumbsContainer}>{thumbs}</aside>
                )}
            </div>
        </section>
    );
};
export default MyDropzone;
