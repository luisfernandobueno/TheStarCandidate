const url_interview_data = "https://getpantry.cloud/apiv1/public/b0f739090ece026cc71470723277bc6e";




export const setupFloatingActions = () => {
    const floatingActionsTrigger = document.querySelector("#floating-actions-trigger");
    const floatingActionsMenu = document.querySelector("#floating-actions-menu");

    if (!floatingActionsTrigger || !floatingActionsMenu) return;

    let floatingActionsPressTimer;
    let floatingActionsLongPressTriggered = false;

    // Open menu after long press
    floatingActionsTrigger.addEventListener("pointerdown", () => {
        floatingActionsLongPressTriggered = false;

        floatingActionsPressTimer = setTimeout(() => {
            floatingActionsMenu.classList.add("open");
            floatingActionsLongPressTriggered = true;
        }, 0);
    });

    // Cancel if released too early
    const cancelFloatingActionsPress = () => {
        clearTimeout(floatingActionsPressTimer);
    };

    floatingActionsTrigger.addEventListener("pointerup", cancelFloatingActionsPress);
    floatingActionsTrigger.addEventListener("pointerleave", cancelFloatingActionsPress);
    floatingActionsTrigger.addEventListener("pointercancel", cancelFloatingActionsPress);

    // Prevent the click generated after a long press
    floatingActionsTrigger.addEventListener("click", (e) => {
        if (floatingActionsLongPressTriggered) {
            e.preventDefault();
            e.stopPropagation();
        }
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
        if (
            !floatingActionsMenu.contains(e.target) &&
            e.target !== floatingActionsTrigger
        ) {
            floatingActionsMenu.classList.remove("open");
        }
    });

    // Close after selecting an option
    floatingActionsMenu.querySelectorAll("button").forEach(option => {
        option.addEventListener("click", () => {
            console.log("Selected:", option.textContent);
            floatingActionsMenu.classList.remove("open");
        });
    });
}


export const readOutLoud = (info) => {
    console.log("Hello world from TTS");

    // If TTS is already active, stop it and exit
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        console.log("TTS - Stopped!");
        return;
    }

    const tts = `${info.question}
    ${info.answer}`;

    console.log(tts);

    const utterance = new SpeechSynthesisUtterance(tts);

    // English language
    utterance.lang = "en-US";

    // Voice settings
    //utterance.pitch = 2

    window.speechSynthesis.speak(utterance);

    console.log("TTS - Text read!");

    // To stop the TTS manually:
    // window.speechSynthesis.cancel();
};

export const favoriteState = () => {
    favorite_btn.classList.toggle("active");
    console.log("Favorite Button Clicked!")
    /* console.log("Lenght favorites list: ", data.filter(item => item.favorite).length)

    data[currentIndex_jsonData].favorite =
        favorite_btn.classList.contains("active");

    console.log(data[currentIndex_jsonData]);
    console.log("Lenght favorites list: ", data.filter(item => item.favorite).length) */

    //fetchPost(data);
}


/* SENDS THE DATA TO UPLOAD IT ONLINE */
/* SENDS THE DATA TO UPLOAD IT ONLINE */
export const fetchPost = (data) => {

    originalData.lines = data;

    fetch(url_interview_data, {
        method: "POST", // ALWAYS USE POST!!!, DO NOT FUCKING CHANGE IT!!! if you use put, you end up duplicating the whole json
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(originalData)
    })
        .then(response => {
            console.clear()
            console.log("inside fetch post response")
            console.log("Status:", response.status);
            console.log("FETCH POST response.json(): ", response.json())


            return response.json();
        })
        .then(result => console.log(result))
        .catch(error => console.error(error));

    console.log("FINAL DATA AFTER FETCH")
    console.log(originalData)
    //fetchGet();
}


export const fetchGet = async () => {    return fetch(url_interview_data)
        .then(res => res.json())
        .then(json => {
            //console.log(json);

            const data = json.lines;
            //console.log(data);

            return data;
        });
}


