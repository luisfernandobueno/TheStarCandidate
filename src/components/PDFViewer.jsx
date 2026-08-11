
import { useEffect, useState } from "react";
import { openDB } from "idb";

import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";


// ============================================================
// PDF.JS WORKER
// ============================================================

pdfjs.GlobalWorkerOptions.workerSrc =
    `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


// ============================================================
// DATABASE
// ============================================================

const dbPromise = openDB("pdf-storage", 1, {

    upgrade(db) {

        // Create a storage area for our PDF
        if (!db.objectStoreNames.contains("files")) {

            db.createObjectStore("files");

        }

    }

});


// ============================================================
// COMPONENT
// ============================================================

const PDFViewer = () => {

    const [file, setFile] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [loading, setLoading] = useState(true);


    // ========================================================
    // LOAD PDF WHEN THE COMPONENT OPENS
    // ========================================================

    useEffect(() => {

        const loadSavedPDF = async () => {

            try {

                const db = await dbPromise;

                // Get the PDF we previously saved
                const savedFile = await db.get(
                    "files",
                    "my-pdf"
                );

                if (savedFile) {

                    setFile(savedFile);

                }

            } catch (error) {

                console.error(
                    "Couldn't load saved PDF:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };

        loadSavedPDF();

    }, []);


    // ========================================================
    // SELECT PDF
    // ========================================================

    const handleFileChange = async (event) => {

        const selectedFile = event.target.files[0];

        if (!selectedFile) {
            return;
        }


        // Make sure it's a PDF

        if (selectedFile.type !== "application/pdf") {

            alert("Please select a PDF file.");

            return;

        }


        try {

            const db = await dbPromise;

            // Save the actual File object
            await db.put(
                "files",
                selectedFile,
                "my-pdf"
            );

            // Display it immediately
            setFile(selectedFile);

        } catch (error) {

            console.error(
                "Couldn't save PDF:",
                error
            );

        }

    };


    // ========================================================
    // PDF LOADED
    // ========================================================

    const onDocumentLoadSuccess = ({ numPages }) => {

        setNumPages(numPages);

    };


    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {

        return (
            <div>
                Loading saved PDF...
            </div>
        );

    }


    // ========================================================
    // SCREEN
    // ========================================================

    return (

        <div className="w-full  flex flex-col">

            {/* Upload */}

            <div className="m-4 p-2 border rounded-lg ">

                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                />

            </div>


            {/* PDF */}

            {file && (

                <div className="w-full flex justify-center">

                    <Document
                        file={file}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading="Loading PDF..."
                        error="Couldn't load PDF."
                    >

                        {Array.from(
                            new Array(numPages),
                            (_, index) => (

                                <div
                                    key={index}
                                    className="mb-4"
                                >

                                    <Page
                                        pageNumber={index + 1}
                                        width={Math.min(
                                            window.innerWidth - 32,
                                            900
                                        )}
                                    />

                                </div>

                            )
                        )}

                    </Document>

                </div>

            )}

        </div>

    );

};

export default PDFViewer;
