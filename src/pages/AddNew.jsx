import RichTextEditor from "../components/RichTextEditor";

export default function AddNew({
    question,
    fetch_url,
    data,
    setData,
    refreshData,
}) {

    return (
        <RichTextEditor
            question={question}
            mode="create"
            fetch_url={fetch_url}
            data={data}
            setData={setData}
            refreshData={refreshData}
        />
    );

}