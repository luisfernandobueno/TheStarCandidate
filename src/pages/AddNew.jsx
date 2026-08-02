import RichTextEditor from "../components/RichTextEditor";

export default function AddNew({ fetchPost }) {

    return (
        <RichTextEditor
            question={{}}
            fetchPost={fetchPost}
        />
    );

}