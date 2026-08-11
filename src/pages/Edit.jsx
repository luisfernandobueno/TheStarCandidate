import RichTextEditor from "../components/RichTextEditor";
import Header from "../components/Header";
import CategoriesSelector from "../components/CategoriesSelector";
import { useState } from "react";


export default function Edit({
    question,
    fetch_url,
    refreshData,
    darkMode,
    setDarkMode,
    data,
    setData,
    historyIndex, historyArr
}) {

    /* const [topic, setTopic] = useState(
        question?.topic || "Encouragement"
    ); */

    return (
        <>

            <Header
                header="Edit"
                darkMode={darkMode}
                setDarkMode={setDarkMode}
            />
            {/* <CategoriesSelector
                topic={topic}
                setTopic={setTopic}
            /> */}
            <RichTextEditor
                question={question}
                mode="edit"
                fetch_url={fetch_url}
                refreshData={refreshData}
                data={data}
            setData={setData}
            historyIndex={
                                historyIndex
                            }

                            historyArr={
                                historyArr
                            }
            />
            

        </>
    );

}