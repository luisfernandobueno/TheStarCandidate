import Header from "../components/Header";
import Card from "../components/Card";
import BottomNavbar from "../components/BottomNavbar";

const Home = ({
    firstQuestion,
    darkMode,
    setDarkMode,
    handleBack, handleNext, historyIndex
}) => {
    window.speechSynthesis.cancel();

    const questionSearched = JSON.parse(
        localStorage.getItem("questionSearched")
    );

    return (
        <>
            

                <Header
                    header="Home"
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                />

                <Card
                    info={questionSearched || firstQuestion}
                    darkMode={darkMode}
                />

                <BottomNavbar handleBack={handleBack} handleNext={handleNext} historyIndex={historyIndex}/>
            
        </>
    );
};

export default Home;