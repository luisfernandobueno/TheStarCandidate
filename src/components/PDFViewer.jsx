
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFViewer = () => {

    const [file, setFile] = useState(null);
    const [numPages, setNumPages] = useState(null);

    const handleFileChange = (event) => {

        const selectedFile = event.target.files[0];

        if (!selectedFile) {
            return;
        }

        // Make sure the file is a PDF
        if (selectedFile.type !== "application/pdf") {
            alert("Please select a PDF file.");
            return;
        }

        setFile(selectedFile);
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (

        <div className="w-full  flex flex-col gap-4 p-4">

            {/* Upload */}
            <div className="border rounded-lg m-3 p-2">
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                />
            </div>

            {/* PDF */}
            {file && (

                <div className="w-full flex flex-col items-center">

                    <Document
                        file={file}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading="Loading PDF..."
                        error="Could not load PDF."
                    >

                        {Array.from(
                            new Array(numPages),
                            (_, index) => (

                                <div
                                    key={`page_${index + 1}`}
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
