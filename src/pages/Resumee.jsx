import Header from "../components/Header";
import PDFViewer from "../components/PDFViewer";




 const Resumee = ({darkMode, setDarkMode}) => {
    return (<>
        <Header
                header="Resumee"
                darkMode={darkMode}
                setDarkMode={setDarkMode}
            />
        <PDFViewer />
        </>)
}


export default Resumee;