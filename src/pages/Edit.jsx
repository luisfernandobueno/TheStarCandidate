import RichTextEditor from "../components/RichTextEditor";
import Header from "../components/Header";

export default function Edit({
    question,
    fetch_url,
    refreshData,
    darkMode,
    setDarkMode,
    data,
    setData,
    historyIndex,
    historyArr,
    setHistoryArr,
    setHistoryIndex,
    setSelectedQuestion
}) {

    return (
        <>
            <Header
                header="Edit"
                darkMode={darkMode}
                setDarkMode={setDarkMode}
            />

            <RichTextEditor
    question={question}
    mode="edit"
    fetch_url={fetch_url}
    refreshData={refreshData}
    data={data}
    setData={setData}
    historyIndex={historyIndex}
    historyArr={historyArr}
    setHistoryArr={setHistoryArr}
    setHistoryIndex={setHistoryIndex}
    setSelectedQuestion={setSelectedQuestion}
/>
        </>
    );
}