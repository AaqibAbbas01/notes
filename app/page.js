"use client"; // Add this directive at the top


import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getDocument } from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker.entry';

const ebooks = [
  { title: 'API Handbook', file: '/ebooks/apihandbook.pdf' },
  { title: 'API Questions', file: '/ebooks/apiquestions.pdf' },
  { title: 'API Test Cases', file: '/ebooks/apitestcases.pdf' },
  { title: 'API Testing Guide', file: '/ebooks/apitesting.pdf' },
  { title: 'Array JavaScript Methods', file: '/ebooks/arrayjavascript.pdf' },
  { title: 'Basic API Q&A', file: '/ebooks/basicapiqa.pdf' },
  { title: 'BDD with Cucumber', file: '/ebooks/bddcucumber.pdf' },
  { title: 'Docker Basics', file: '/ebooks/docker1.pdf' },
  { title: 'ES6 Array Methods in JavaScript', file: '/ebooks/es6arraymethodsjavascript.pdf' },
  { title: 'Git Cheat Sheet', file: '/ebooks/gitsheet.pdf' },
  { title: 'ISTQB Foundation Level Cheat Sheet', file: '/ebooks/istqbcheetsheet.pdf' },
  { title: 'Java Interview Questions', file: '/ebooks/javaquestions.pdf' },
  { title: 'JavaScript Basics - Part 1', file: '/ebooks/javascript-1.pdf' },
  { title: 'JavaScript Array Methods', file: '/ebooks/javascriptarraymethods.pdf' },
  { title: 'JavaScript: Beginner to Advanced', file: '/ebooks/javascriptbeginnertoadvance.pdf' },
  { title: 'JavaScript Cheat Sheet', file: '/ebooks/javascriptcheetsheat.pdf' },
  { title: 'JavaScript Destructuring', file: '/ebooks/javascriptdestructing.pdf' },
  { title: 'JavaScript Objects', file: '/ebooks/javascriptobject.pdf' },
  { title: 'JavaScript Reduce Method', file: '/ebooks/javascriptreduceMethod.pdf' },
  { title: 'JavaScript Shorthands', file: '/ebooks/javascriptshorthands.pdf' },
  { title: 'JavaScript Shorthands - Part 2', file: '/ebooks/javascriptshorthands2.pdf' },
  { title: 'JavaScript Tricks', file: '/ebooks/javascripttrick.pdf' },
  { title: 'Jenkins Top 50 Questions', file: '/ebooks/jenkinstop50.pdf' },
  { title: 'JavaScript Dos and Don\'ts', file: '/ebooks/jsdondont.pdf' },
  { title: 'Working with JSON', file: '/ebooks/json.pdf' },
  { title: 'Kusho API Testing Guide', file: '/ebooks/kushapi.pdf' },
  { title: 'Playwright Testing - Part 4', file: '/ebooks/playwright4.pdf' },
  { title: 'Playwright with Docker', file: '/ebooks/playwrightwithdocker.pdf' },
  { title: 'Postman Interview Questions', file: '/ebooks/postmanquestions.pdf' },
  { title: 'SDET Interview Questions', file: '/ebooks/sdet_questions.pdf' },
  { title: 'Selenium Testing Guide', file: '/ebooks/selenium.pdf' },
  { title: 'SQL Cheat Sheet', file: '/ebooks/SQL_Cheat_Sheet.pdf' },
  { title: 'SQL Notes', file: '/ebooks/SQL_notes.pdf' },
  { title: 'Automation Testing Common Hurdles', file: '/ebooks/automationtestingcommonhurdles.pdf' },
  { title: 'Cucumber', file: '/ebooks/cucumber.pdf' },
  { title: 'Jmeter', file: '/ebooks/jmeter.pdf' },
  { title: 'JS Modern Concept', file: '/ebooks/jsmodernconcepts.pdf' },
  { title: 'Kubernetes', file: '/ebooks/kubernetes.pdf' },
  { title: 'QnA for Tetings', file: '/ebooks/qnatesting.pdf' },
  { title: 'Robot Framework', file: '/ebooks/robotframework.pdf' },
  { title: 'Testing Tools', file: '/ebooks/testingtools.pdf' },
  { title: 'Learn the Xpath', file: '/ebooks/xpath.pdf' },
];

export default function Home() {
  const [thumbnails, setThumbnails] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEbooks, setFilteredEbooks] = useState(ebooks);
  const [currentPage, setCurrentPage] = useState(1);
  const [ebooksPerPage] = useState(5);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const generateThumbnails = async () => {
      const thumbs = {};
      for (const book of ebooks) {
        const thumbnail = await generateThumbnail(book.file);
        thumbs[book.file] = thumbnail;
      }
      setThumbnails(thumbs);
    };
    generateThumbnails();
  }, []);

  useEffect(() => {
    setFilteredEbooks(
      ebooks.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  // Pagination Logic
  const indexOfLastEbook = currentPage * ebooksPerPage;
  const indexOfFirstEbook = indexOfLastEbook - ebooksPerPage;
  const currentEbooks = filteredEbooks.slice(indexOfFirstEbook, indexOfLastEbook);

  const generateThumbnail = async (fileUrl) => {
    const loadingTask = getDocument(fileUrl);
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 0.3 });

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    await page.render(renderContext).promise;

    return canvas.toDataURL();
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const exportToCSV = () => {
    const csvContent = [
      ['Title', 'Link'],
      ...filteredEbooks.map(book => [book.title, `read?file=${encodeURIComponent(book.file)}`])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'ebooks.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = (book) => {
    const message = `Hello,

    I wanted to share this excellent SDET note titled "${book.title}". You can access it here: https://sdet.noiwic.com${book.file}.

    This resource has been collected by Aaqib Abbas for the SDET community to help aspiring and experienced professionals.
    
    Best regards,
    Aaqib Abbas`;

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div style={darkMode ? styles.darkWrapper : styles.wrapper}>
      <h1 style={styles.heading}>SDET Notes Collection by Aaqib Abbas</h1>
      <button onClick={toggleDarkMode} style={styles.darkModeButton}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <input
        type="text"
        placeholder="Search notes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={styles.searchInput}
      />
      <button onClick={exportToCSV} style={styles.exportButton}>Export to CSV</button>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={styles.tableHeaderCell}>Thumbnail</th>
            <th style={styles.tableHeaderCell}>Title</th>
            <th style={styles.tableHeaderCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEbooks.map((book, index) => (
            <tr key={index} style={styles.tableRow}>
              <td style={styles.thumbnailCell}>
                {thumbnails[book.file] ? (
                  <img
                    src={thumbnails[book.file]}
                    alt="PDF Thumbnail"
                    style={styles.thumbnail}
                  />
                ) : (
                  <span style={styles.loadingText}>Loading...</span>
                )}
              </td>
              <td style={styles.titleCell}>{book.title}</td>
              <td style={styles.actionCell}>
                <Link href={`/read?file=${encodeURIComponent(book.file)}`}>
                  <button style={styles.readButton}>Read</button>
                </Link>
                <a href={book.file} download={book.title}>
                  <button style={styles.downloadButton}>Download</button>
                </a>
                <button style={styles.shareButton} onClick={() => handleShare(book)}>
                  Share on WhatsApp
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={styles.pagination}>
        {Array.from({ length: Math.ceil(filteredEbooks.length / ebooksPerPage) }).map((_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)} style={styles.paginationButton}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    height: '100vh',
    width: '100vw',
    margin: '0',
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
  },
  darkWrapper: {
    height: '100vh',
    width: '100vw',
    margin: '0',
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#2c3e50',
  },
  heading: {
    textAlign: 'center',
    margin: '20px 0',
    color: '#ffffff',
    fontSize: '2.5rem',
    fontWeight: 'bold',
  },
  searchInput: {
    width: '90%',
    margin: '0 auto',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  exportButton: {
    width: '150px',
    margin: '20px auto',
    padding: '10px',
    backgroundColor: '#2980b9',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  darkModeButton: {
    width: '150px',
    margin: '0 auto 20px auto',
    padding: '10px',
    backgroundColor: '#1abc9c',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  table: {
    width: '90%',
    margin: '0 auto',
    borderCollapse: 'collapse',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  tableHeader: {
    backgroundColor: '#2c3e50',
    color: '#ffffff',
  },
  tableHeaderCell: {
    padding: '15px',
    fontSize: '1rem',
    fontWeight: '600',
  },
  tableRow: {
    borderBottom: '1px solid #e2e6ea',
  },
  thumbnailCell: {
    padding: '10px',
    width: '15%',
  },
  thumbnail: {
    width: '50px',
    height: '50px',
    borderRadius: '6px',
  },
  titleCell: {
    padding: '10px',
    fontWeight: 'bold',
    fontSize: '1rem',
    color: '#000000',
  },
  actionCell: {
    padding: '10px',
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  readButton: {
    padding: '8px 12px',
    backgroundColor: '#2980b9',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  downloadButton: {
    padding: '8px 12px',
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  shareButton: {
    padding: '8px 12px',
    backgroundColor: '#25D366',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  pagination: {
    margin: '20px auto',
    textAlign: 'center',
  },
  paginationButton: {
    padding: '10px',
    margin: '0 5px',
    backgroundColor: '#2980b9',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },

  // Media query for mobile responsiveness
  '@media (max-width: 600px)': {
    wrapper: {
      padding: '10px',
    },
    searchInput: {
      width: '100%',
      padding: '8px',
    },
    tableHeaderCell: {
      padding: '10px',
      fontSize: '0.9rem',
    },
    tableRow: {
      flexDirection: 'column',
    },
    readButton: {
      padding: '6px 10px',
    },
    downloadButton: {
      padding: '6px 10px',
    },
    shareButton: {
      padding: '6px 10px',
    },
    paginationButton: {
      padding: '6px 8px',
    },
  },
};





