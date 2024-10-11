import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Apiurl } from '../../Apiurl/Apiurl';
import './Filedown.css';

const Filedown = ({ filePaths }) => {
    const [fileUrls, setFileUrls] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            if (filePaths === '' || filePaths === null) {
                return;
            }

            const urls = [];
            for (let fileName of filePaths) {
                const response = await axios.get(`${Apiurl.exam_sharing_board_images}`, {
                    params: { file_name: fileName },
                    responseType: 'blob'
                });

                const fileUrl = URL.createObjectURL(response.data);
                urls.push({ url: fileUrl, name: fileName });
            }
            setFileUrls(urls);
        };

        fetchFiles();
    }, [filePaths]);

    return (
        <div>
            {fileUrls.map(file => (
                <div key={file.name}>
                    <a href={file.url} download={file.name}>다운클릭 {file.name}</a>
                </div>
            ))}
        </div>
    );
};

export default Filedown;