import RichTextEditor from "../components/RichTextEditor";
import Header from "../components/Header";
import CategoriesSelector from "../components/CategoriesSelector";
import { useState } from "react";


export default function AddNew({
    question,
    fetch_url,
    data,
    setData,
    refreshData,
    darkMode,
    setDarkMode
}) {

    const [topic, setTopic] = useState("Encouragement");
    return (
        <>
        <Header
                header="Add New"
                darkMode={darkMode}
                setDarkMode={setDarkMode}
            />
            {/* <CategoriesSelector
      setTopic={setTopic}/> */}
        <RichTextEditor
            question={question}
            mode="create"
            fetch_url={fetch_url}
            data={data}
            setData={setData}
            refreshData={refreshData}
        />
        
      
        </>
    );

}