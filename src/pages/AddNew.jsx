import RichTextEditor from "../components/RichTextEditor";
import Header from "../components/Header";

export default function AddNew({
    question,
    fetch_url,
    data,
    setData,
    refreshData,
    darkMode,
    setDarkMode,
    historyIndex,
    historyArr,
    setHistoryArr,
    setHistoryIndex,
    setSelectedQuestion
}) {

    return (
        <>
            <Header
                header="Add New"
                darkMode={darkMode}
                setDarkMode={setDarkMode}
            />

            <RichTextEditor
    question={question}
    mode="create"
    fetch_url={fetch_url}
    data={data}
    setData={setData}
    refreshData={refreshData}
    historyIndex={historyIndex}
    historyArr={historyArr}
    setHistoryArr={setHistoryArr}
    setHistoryIndex={setHistoryIndex}
    setSelectedQuestion={setSelectedQuestion}
/>
        </>
    );
}