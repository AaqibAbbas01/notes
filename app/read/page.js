"use client";

import { useSearchParams } from 'next/navigation';
import PdfViewer from '../components/PdfViewer';

const ReadPage = () => {
    const searchParams = useSearchParams();
    const file = searchParams.get('file');

    const decodedFile = decodeURIComponent(file); // Decode the file URL

    return (
        <div>
            <h1>Software Development Engineer in Test Notes</h1>
            <p>Developed by Aaqib Abbas</p>
            {decodedFile ? (
                <PdfViewer fileUrl={decodedFile} />
            ) : (
                <p>No eBook selected.</p>
            )}
        </div>
    );
};

export default ReadPage;
