import React, { useState, Component, useRef, useEffect} from "react";
import '../css/Dashboard.css';
import "7.css/dist/7.css";
import cirno from "../gifs/cirno.gif";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Dashboard(this: any){
    const [FileName, setFileName] = useState("");
    const [FileContent, setFileContent] = useState(">");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFileName(event.target.value);
    };

    const handleFileContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
         setFileContent(event.target.value);
    };


    const checkEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            setFileContent(FileContent => FileContent + "\n>");
        }
    };


    function handleSave(){
        if(FileName == ""){
            toast.error("Please enter valid file name");
        }
        if(FileContent == ">" || FileContent == ""){
            toast.info("Why don't you try writing something first?")
        }
        else{
            const blob = new Blob([FileContent], { type: "text/plain;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = FileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    function clearItems(){
        setFileContent(">");
        setFileName("");
        if(fileInputRef.current){
            fileInputRef.current.value = '';
        }
    }

    const showFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = e.target.files;
        if (files && files.length > 0) {
            if(!files[0].name.endsWith('txt')){
                toast.error("Make sure to enter only txt files!");
                e.target.value = '';
            }
            else{
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target) {
                        const text = e.target.result;
                        setFileContent(text as string);
                        setFileName(files[0].name.replace('.txt', ''));
                    }
                };
                reader.readAsText(files[0]);
            }
        }
      }

      useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000); // Update every second

        return () => {
            clearInterval(timer);
        };
    }, []);

    return(
        <div className = "dashboard">
            <ToastContainer theme="colored"></ToastContainer>
            <div className = "dashboard__header">
                <h3>Super Secret Dashboard</h3>
                <h4>Current Date and Time: {currentDateTime.toLocaleString()}</h4>
                <img className = "cirno" src={cirno} alt="fumo fumo" />
            </div>
            <div className="dashboard__content">
                <div>
                    <input className="dashboard__fileName" placeholder="FileName" value={FileName} onChange={handleFileNameChange}></input>
                </div>
                <textarea className="dashboard__notes" value={FileContent} onChange={handleFileContentChange} onKeyDown={checkEnter}></textarea>   
                <div className="buttons">
                    <button className="dashboard__saveNotes" onClick={handleSave}>Save</button>
                    <button className="dashboard__clearNotes" onClick={clearItems}>Clear</button>
                    <input type="file" className="dashboard__chooseFile" onChange={showFile} ref={fileInputRef}></input>
                </div>           
            </div>
        </div>
    )
};
