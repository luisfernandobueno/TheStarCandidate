import RichTextEditor from "../components/RichTextEditor";

export default function Edit({ question, fetchPost }) {

    return (
        <RichTextEditor
            question={question}
            fetchPost={fetchPost}
        />
    );

}