import React, { useState } from 'react';
import axios from 'axios';
import { Upload, Button, Progress, message } from 'antd';
import {UploadOutlined, CheckCircleOutlined, FileSearchOutlined, CloseCircleOutlined, RobotOutlined } from '@ant-design/icons';

import st from './UploadFiles.module.css';
import {configApi} from "../../../configApi";

const UploadFiles = () => {
    const [fileList, setFileList] = useState([]);
    const [uploadProgress, setUploadProgress] = useState({});
    //const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = ({ file, fileList }) => {
        setFileList(fileList);
    };

    const updateStatusList = (index, status, msg = '') => {
        console.log(updateStatusList);
        setFileList(prevList =>
            prevList.map( (file, i) => {
                console.log(i, index, status);
                return i === index ? { ...file, myStatus: status, msg } : file; }
            )
        );
    }

    const [test, setTest] = useState(0);
    const testStatus = (index) => {
        switch (test) {
            case 0 :
                updateStatusList(index, 'loading');
            break;
            case 1 :
                updateStatusList(index, 'loaded');
                break;
            case 2 :
                updateStatusList(index, 'basic_parsing');
                break;
            case 3 :
                updateStatusList(index, 'ai_parsing');
                break;
            case 4 :
                updateStatusList(index, 'error', 'error`s text');
                break;
        }
        if (test === 4) setTest(0);
        else setTest(test + 1);
    }

    const uploadFileWithProgress = async (file, index) => {
        const formData = new FormData();
        formData.append('pdf_files', file.originFileObj);
        //console.log('uploadFileWithProgress');

        //для теста вида разных статусов
        testStatus(index);


        let answer;
        try {


            /*основной код запроса
            updateStatusList(index, 'loading');

            answer = await axios.post(configApi.UPLOAD_FILE, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress((prevProgress) => ({
                        ...prevProgress,
                        [file.uid]: percentCompleted,
                    }));
                },
            });

            updateStatusList(index, 'loaded');*/
            //message.success(`${file.name} успешно загружен`);
        } catch (error) {

            if (answer.errors) {
                updateStatusList(index, 'error', answer.errors.pdf_files[0] );
            }
            console.error(`Ошибка загрузки файла ${file.name}:`, error);
            message.error(`Ошибка загрузки файла ${file.name}`);
        }
    };

    const uploadFiles = async () => {
        //setUploadStatus('Загрузка...');
        const maxParallelUploads = 10;
        const uploadQueue = [...fileList];
        //console.log('uploadFiles');

        const uploadBatch = async () => {
            const batch = uploadQueue.splice(0, maxParallelUploads);
            await Promise.all(batch.map( (file, index) => uploadFileWithProgress(file, index)));
            if (uploadQueue.length > 0) {
                await uploadBatch();
            }
        };

        await uploadBatch();
        //setUploadStatus('Загрузка завершена');
    };

    const uploadList = fileList.map( (file) => {
        if (file.myStatus !== 'default') return (
        <div key={file.uid} className={st.file_progress}>
            <span className={st.file_name}>{file.name}</span>
            {
                file.myStatus === 'loading' &&
                (<Progress percent={uploadProgress[file.uid] || 0} />)
            }

            {
                file.myStatus === 'loaded' &&
                (<CheckCircleOutlined style={ {color : '#009900' }}/>)
            }
            {
                file.myStatus ==='basic_parsing' &&
                (<FileSearchOutlined style={ {color : '#1890FF'} }/>)
            }
            {
                file.myStatus === 'ai_parsing' &&
                (<RobotOutlined style={ {color : '#1890FF'} }/>)
            }
            {
                file.myStatus === 'error' &&
                (<><p className={st.file_error}>{file.msg}</p><CloseCircleOutlined style={ {color : '#D32F2F' }}/></>)
            }

            {/*console.log(fileList)*/}


        </div>
    )
    else return (<></>)
    } )


    return (
        <div className={st.upload_container}>
            <Upload
                multiple
                onChange={handleFileChange}
                beforeUpload={() => false}
                fileList={fileList.map(file => ({
                    ...file,
                    myStatus: file.myStatus || 'default',
                    msg: file.msg || '',
                }))}
                className={st.upload_input}
            >
                <Button icon={<UploadOutlined />}>Выберите файлы</Button>
            </Upload>
            <Button type="primary" onClick={uploadFiles} disabled={!fileList.length} className={st.upload_button}>
                Загрузить файлы
            </Button>
            <div className={st.progress_container}>
                {/*uploadStatus && <p className={st.upload_status}>{uploadStatus}</p>*/}
                { uploadList }
            </div>
        </div>
    );
};

export default UploadFiles;

