"use client";

import { useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the PdfViewer component to ensure it's only rendered on the client
const PdfViewer = dynamic(() => import('../components/PdfViewer'), { ssr: false });

const PdfViewerWrapper = () => {
    const [decodedFile, setDecodedFile] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const file = params.get('file');
        if (file) {
            setDecodedFile(decodeURIComponent(file));
        }
    }, []);

    return (
        <Suspense fallback={<div>Loading PDF...</div>}>
            {decodedFile ? (
                <PdfViewer fileUrl={decodedFile} />
            ) : (
                <p style={styles.errorMessage}>No eBook selected. Please go back and select an eBook.</p>
            )}
        </Suspense>
    );
};

export default function ReadPage() {
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Software Development Engineer in Test Notes</h1>
            <p style={styles.subHeader}>Developed by Aaqib Abbas</p>
            <PdfViewerWrapper />
        </div>
    );
}

const styles = {
    container: {
        margin: '0',
        padding: '0',
        textAlign: 'center',
        background: 'linear-gradient(to right, #6a11cb, #2575fc)',
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
        color: '#ffffff',
        height: '100vh',
        width: '100vw',
    },
    header: {
        fontSize: '2.5rem',
        marginBottom: '20px',
        fontWeight: 'bold',
        letterSpacing: '1px',
        lineHeight: '1.2',
    },
    subHeader: {
        fontSize: '1.2rem',
        marginBottom: '30px',
        lineHeight: '1.5',
    },
    errorMessage: {
        fontSize: '1.2rem',
        color: '#ffcccb',
        padding: '10px',
    },
};
