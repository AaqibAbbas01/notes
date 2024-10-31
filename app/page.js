"use client"; // Add this directive at the top

import { useEffect, useState } from 'react';
import Link from 'next/link';
import IconFolderDownloadFill from './components/IconFolderDownloadFill';
import IconShareFill from './components/IconShareFill';
import { getDocument } from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker.entry';

// Organizing documents into categories
const ebooks = {
  JavaScript: [
    { title: 'JavaScript ES6 Interview Guide', file: '/ebooks/JavaScript_ES6_Interview_Guide_1730402550.pdf' },
    { title: 'JavaScript Objects Overview', file: '/ebooks/javascriptobject2.pdf' },
    { title: 'JavaScript Basics - Part 1', file: '/ebooks/javascript-1.pdf' },
    { title: 'JavaScript Overview', file: '/ebooks/javascript1.pdf' },
    { title: 'JavaScript Array Methods', file: '/ebooks/javascriptarraymethods.pdf' },
    { title: 'JavaScript: Beginner to Advanced', file: '/ebooks/javascriptbeginnertoadvance.pdf' },
    { title: 'JavaScript Cheat Sheet', file: '/ebooks/javascriptcheetsheat.pdf' },
    { title: 'JavaScript Destructuring', file: '/ebooks/javascriptdestructing.pdf' },
    { title: 'JavaScript Objects Guide', file: '/ebooks/javascriptobject.pdf' },
    { title: 'JavaScript Reduce Method', file: '/ebooks/javascriptreduceMethod.pdf' },
    { title: 'JavaScript Shorthands', file: '/ebooks/javascriptshorthands.pdf' },
    { title: 'JavaScript Shorthands - Part 2', file: '/ebooks/javascriptshorthands2.pdf' },
    { title: 'JavaScript Tricks', file: '/ebooks/javascripttrick.pdf' },
    { title: 'JavaScript Dos and Don\'ts', file: '/ebooks/jsdondont.pdf' },
    { title: 'Modern JavaScript Concepts', file: '/ebooks/jsmodernconcepts.pdf' },
  ],
  Docker: [
    { title: 'Docker Basics', file: '/ebooks/docker1.pdf' },
    { title: 'Docker Commands Guide', file: '/ebooks/dockerCommands.pdf' }
  ],
  API: [
    { title: 'API Handbook', file: '/ebooks/apihandbook.pdf' },
    { title: 'API Questions', file: '/ebooks/apiquestions.pdf' },
    { title: 'API Test Cases', file: '/ebooks/apitestcases.pdf' },
    { title: 'API Testing Guide', file: '/ebooks/apitesting.pdf' },
    { title: 'Types of APIs', file: '/ebooks/Types_of_APIs_1730402841.pdf' },
    { title: 'Kusho API Testing Guide', file: '/ebooks/kushapi.pdf' },
    { title: 'Free API for QA', file: '/ebooks/freeapiforqa.pdf' },
    { title: 'API Test Plan', file: '/ebooks/apitestplan.pdf' }
  ],
  Testing: [
    { title: 'Automation Testing - Common Hurdles', file: '/ebooks/automationtestingcommonhurdles.pdf' },
    { title: 'Basic API Q&A', file: '/ebooks/basicapiqa.pdf' },
    { title: 'BDD with Cucumber', file: '/ebooks/bddcucumber.pdf' },
    { title: 'Cucumber Framework Guide', file: '/ebooks/cucumber.pdf' },
    { title: 'ISTQB Foundation Level Cheat Sheet', file: '/ebooks/istqbcheetsheet.pdf' },
    { title: 'Postman Interview Questions', file: '/ebooks/postmanquestions.pdf' },
    { title: 'Q&A for Testing', file: '/ebooks/qnatesting.pdf' },
    { title: 'Robot Framework Guide', file: '/ebooks/robotframework.pdf' },
    { title: 'SDET Interview Questions', file: '/ebooks/sdet_questions.pdf' },
    { title: 'Selenium Project Framework Structure', file: '/ebooks/Selenium_Project_Framework_Structure_1730044184.pdf' },
    { title: 'Selenium Essentials', file: '/ebooks/selenium.pdf' },
    { title: 'Testing Tools Overview', file: '/ebooks/testingtools.pdf' },
    { title: 'Test Scenarios vs Test Cases', file: '/ebooks/TestscenarioVStestcase.pdf' },
    { title: 'Test Case Documentation', file: '/ebooks/Testcases_Document_1730049375.pdf' }
  ],
  Database: [
    { title: 'MongoDB Cheat Sheet', file: '/ebooks/MongoDB_cheatsheet_1730044214.pdf' },
    { title: 'SQL Cheat Sheet', file: '/ebooks/SQL_Cheat_Sheet.pdf' },
    { title: 'SQL Notes', file: '/ebooks/SQL_notes.pdf' },
    { title: 'SQL Query Guide', file: '/ebooks/Sqlques.pdf' }
  ],
  DevOps: [
    { title: 'Jenkins Essentials', file: '/ebooks/Jenkins_1730325033.pdf' },
    { title: 'Jenkins Top 50 Questions', file: '/ebooks/jenkinstop50.pdf' },
    { title: 'K8s Essentials', file: '/ebooks/K8s_1730402789.pdf' },
    { title: 'Kubernetes Basics', file: '/ebooks/kubernetes.pdf' }
  ],
  WebDevelopment: [
    { title: 'HTML Forms Guide', file: '/ebooks/HTML_Forms_1729836078.pdf' },
    { title: 'Algorithm Essentials', file: '/ebooks/algo.pdf' },
    { title: 'JSON Fundamentals', file: '/ebooks/json.pdf' },
    { title: 'Object-Oriented Programming Guide', file: '/ebooks/oops.pdf' },
    { title: 'Tailwind CSS Essentials', file: '/ebooks/tailand_css_1730325452.pdf' }
  ],
  Playwright: [
    { title: 'Playwright Testing Guide', file: '/ebooks/playwright4.pdf' },
    { title: 'Playwright with Docker', file: '/ebooks/playwrightwithdocker.pdf' }
  ],
  Selenium: [
    { title: 'Explaining Automation Framework', file: '/ebooks/explainautomationframework.pdf' },
    { title: 'POM in Selenium', file: '/ebooks/POM_in_Selenium_1730325569.pdf' },
    { title: 'Part 1 Guide', file: '/ebooks/PART_01_1730325440.pdf' }
  ],
  Git: [

    { title: 'Git Cheat Sheet', file: '/ebooks/gitsheet.pdf' },
  ]
};


export default function Home() {
  const [thumbnails, setThumbnails] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredEbooks, setFilteredEbooks] = useState(ebooks);

  useEffect(() => {
    const generateThumbnails = async () => {
      const thumbs = {};
      for (const category in ebooks) {
        for (const book of ebooks[category]) {
          const thumbnail = await generateThumbnail(book.file);
          thumbs[book.file] = thumbnail;
        }
      }
      setThumbnails(thumbs);
    };
    generateThumbnails();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredEbooks(ebooks);
    } else {
      setFilteredEbooks({
        [selectedCategory]: ebooks[selectedCategory]
      });
    }
  }, [selectedCategory, searchQuery]);

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

  const handleShare = (book) => {
    const message = `Hello,

    I wanted to share this excellent SDET note titled "${book.title}". You can access it here: https://sdet.noiwic.com${book.file}.

    This resource has been collected by Aaqib Abbas for the SDET community to help aspiring and experienced professionals.
    
    Best regards,
    Aaqib Abbas`;

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const filterBooksByQuery = () => {
    const query = searchQuery.toLowerCase();
    const filtered = {};

    for (const category in ebooks) {
      const matchedBooks = ebooks[category].filter((book) =>
        book.title.toLowerCase().includes(query)
      );
      if (matchedBooks.length) {
        filtered[category] = matchedBooks;
      }
    }
    setFilteredEbooks(filtered);
  };

  useEffect(() => {
    filterBooksByQuery();
  }, [searchQuery]);

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.heading}>SDET Notes Collection by Aaqib Abbas</h1>

      <div style={styles.filterContainer}>
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={styles.select}
        >
          <option value="All">All</option>
          {Object.keys(ebooks).map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div style={styles.thumbnailGrid}>
        {Object.keys(filteredEbooks).map((category) => (
          <div key={category} style={styles.categoryRow}>
            <h2 style={styles.categoryHeading}>{category}</h2>
            <div style={styles.thumbnailContainer}>
              {filteredEbooks[category].map((book, index) => (
                <div key={index} style={styles.thumbnailCard}>
                  {thumbnails[book.file] ? (
                    <img
                      src={thumbnails[book.file]}
                      alt="PDF Thumbnail"
                      style={styles.thumbnail}
                    />
                  ) : (
                    <span style={styles.loadingText}>Loading...</span>
                  )}
                  <p style={styles.title}>{book.title}</p>
                  <div style={styles.actions}>
                    <Link href={`/read?file=${encodeURIComponent(book.file)}`}>
                      <button style={styles.readButton}>Read</button>
                    </Link>
                    <div style={styles.iconContainer}>
                      <a href={book.file} download={book.title} style={styles.iconLink}>
                        <IconFolderDownloadFill style={styles.icon} title="Download" />
                      </a>
                      <button onClick={() => handleShare(book)} style={styles.iconButton}>
                        <IconShareFill style={styles.icon} title="Share" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: '20px',
    backgroundColor: '#f3f7fa',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    margin: '20px 0',
    fontSize: '2.5rem',
    color: '#2c3e50',
    fontWeight: '600',
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '20px 0',
    gap: '10px',
  },
  searchInput: {
    flex: '1',
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #b0bec5',
    backgroundColor: '#ffffff',
    color: '#333',
  },
  select: {
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    color: '#333',
    border: '1px solid #b0bec5',
    width: '150px',
  },
  categoryRow: {
    marginBottom: '30px',
  },
  categoryHeading: {
    fontSize: '1.75rem',
    color: '#34495e',
    fontWeight: '500',
    borderBottom: '2px solid #3498db',
    paddingBottom: '5px',
  },
  thumbnailContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    gap: '20px',
    overflowX: 'auto',
    padding: '10px 0',
  },
  thumbnailCard: {
    minWidth: '180px',
    borderRadius: '12px',
    padding: '15px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
    textAlign: 'center',
  },
  thumbnail: {
    width: '100%',
    height: 'auto',
    borderRadius: '6px',
    marginBottom: '10px',
  },
  loadingText: {
    fontSize: '0.9rem',
    color: '#95a5a6',
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  readButton: {
    padding: '8px 15px',
    backgroundColor: '#3498db',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
  },
  iconContainer: {
    display: 'flex',
    gap: '10px',
  },
  icon: {
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
};







