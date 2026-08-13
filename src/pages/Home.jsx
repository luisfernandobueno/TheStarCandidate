import Header from "../components/Header";
import Card from "../components/Card";
const Home = ({
    firstQuestion,

    darkMode,
    setDarkMode,

    data,
    setData,

    url,

    open,
    onClose,

    isFavorite,
    setIsFavorite,

    deleteQuestion,

    handleBack,
    handleNext,

    historyIndex,
    historyArr,
    setHistoryArr,

    setSelectedQuestion
}) => {

    

    return (
        <>
            <Header
                header="Home"
                darkMode={darkMode}
                setDarkMode={setDarkMode}
            />

            <Card
    url={url}

    data={data}
    setData={setData}

    info={firstQuestion}

    darkMode={darkMode}

    open={open}
    onClose={onClose}

    isFavorite={isFavorite}
    setIsFavorite={setIsFavorite}

    deleteQuestion={deleteQuestion}

    handleBack={handleBack}
    handleNext={handleNext}

    historyIndex={historyIndex}
    historyArr={historyArr}
    setHistoryArr={setHistoryArr}

    setSelectedQuestion={setSelectedQuestion}
/>
        </>
    );
};

export default Home;