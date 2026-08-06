import Header from "../components/Header";
import Card from "../components/Card";

import {

    favoriteState
} from "../javascript/script";



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
    deleteQuestion
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
                url={url}
                data={data}
                info={questionSearched || firstQuestion}
                darkMode={darkMode}
                open={open}
                onClose={onClose}
                isFavorite={isFavorite}
                setIsFavorite={setIsFavorite}
                deleteQuestion={deleteQuestion}
            />



        </>
    );
};

export default Home;