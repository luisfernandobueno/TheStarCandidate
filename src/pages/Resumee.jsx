import Header from "../components/Header";


 const Resumee = ({darkMode, setDarkMode}) => {
    return (<>
        <Header
                header="Resumee"
                darkMode={darkMode}
                setDarkMode={setDarkMode}
            />
        <section><h1>Welcome to Resumee section</h1></section>
        </>)
}


export default Resumee;