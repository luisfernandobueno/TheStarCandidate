import RichTextEditor from "../components/RichTextEditor";

export default function Edit({
    question,
    fetch_url,
    refreshData,
}) {

    return (
        <RichTextEditor
            question={question}
            mode="edit"
            fetch_url={fetch_url}
            refreshData={refreshData}
        />
    );

}