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
    { title: 'Test Scenario vs Test Case', file: '/ebooks/TestscenarioVSTestcase.pdf' },
];

export default function Home() {
  const [thumbnails, setThumbnails] = useState({});

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

  return (
      <div style={styles.wrapper}>
          <h1 style={styles.heading}>SDET Notes Collection by Aaqib Abbas</h1>
          <table style={styles.table}>
              <thead>
                  <tr style={styles.tableHeader}>
                      <th style={styles.tableHeaderCell}>Thumbnail</th>
                      <th style={styles.tableHeaderCell}>Title</th>
                      <th style={styles.tableHeaderCell}>Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {ebooks.map((book, index) => (
                      <tr key={index} style={styles.tableRow}>
                          <td style={styles.thumbnailCell}>
                              {thumbnails[book.file] ? (
                                  <img src={thumbnails[book.file]} alt="PDF Thumbnail" style={styles.thumbnail} />
                              ) : (
                                  <span style={styles.loadingText}>Loading...</span>
                              )}
                          </td>
                          <td style={styles.titleCell}>{book.title}</td>
                          <td style={styles.actionCell}>
                              <Link href={`/read?file=${encodeURIComponent(book.file)}`}>
                                  <span style={styles.readLink}>Read</span>
                              </Link>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  );
}

const styles = {
  wrapper: {
      margin: '40px auto',
      maxWidth: '1200px',
      background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
      borderRadius: '12px',
      padding: '30px',
      boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
      transition: 'all 0.3s ease',
      transform: 'scale(1)',
  },
  heading: {
      textAlign: 'center',
      marginBottom: '40px',
      color: '#ffffff',
      fontSize: '2.5rem',
      letterSpacing: '1px',
      fontWeight: 'bold',
      fontFamily: "'Montserrat', sans-serif",
      textShadow: '2px 2px 5px rgba(0,0,0,0.3)',
  },
  table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      overflow: 'hidden',
      fontFamily: "'Poppins', sans-serif",
      boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
  },
  tableHeader: {
      backgroundColor: '#2c3e50',
      color: '#ffffff',
      textTransform: 'uppercase',
  },
  tableHeaderCell: {
      padding: '20px',
      fontSize: '1rem',
      fontWeight: '600',
      textAlign: 'left',
  },
  tableRow: {
      borderBottom: '1px solid #e2e6ea',
      transition: 'background 0.3s',
  },
  tableRowHover: {
      backgroundColor: '#f8f9fa',
  },
  thumbnailCell: {
      padding: '15px',
      width: '15%',
  },
  thumbnail: {
      width: '50px',
      height: '50px',
      borderRadius: '6px',
      boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
  },
  loadingText: {
      color: '#7f8c8d',
      fontStyle: 'italic',
  },
  titleCell: {
      padding: '15px',
      fontWeight: 'bold',
      color: '#2c3e50',
      fontSize: '1rem',
  },
  actionCell: {
      padding: '15px',
  },
  readLink: {
      color: '#2980b9',
      textDecoration: 'none',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'color 0.2s',
  },
  readLinkHover: {
      color: '#2c82c9',
  },
};