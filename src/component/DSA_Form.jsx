import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AccordionItem from './AccordionItem';
import service from '../Appwrite/coonfiguration';
import authService from '../Appwrite/Authenticatioon';

const DSA_Headers = () => {
  const [expanded, setExpanded] = useState(false);
  const [items, setItems] = useState([]);
  const [searchTerms, setSearchTerms] = useState({});
  const [randomQuestion, setRandomQuestion] = useState(null);
  const [searchResults, setSearchResults] = useState({});
  const navigate = useNavigate();
  const titles = ['Basic', 'Array', 'String', 'Linked List', 'Stack', "Recusion", "Binary Tree"];

  useEffect(() => {
    const fetchUserAndQuestions = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          const result = await service.getQuestions(user.$id);
          if (result && result.documents) {
            setItems(result.documents);
          }
        }
      } catch (error) {
        console.error('Error fetching user or questions:', error);
      }
    };
    fetchUserAndQuestions();
  }, []);

  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded((prev) => ({ ...prev, [panel]: isExpanded }));
  };

  const handleCheckboxChange = async (event, questionId, completed) => {
    event.stopPropagation();
    setItems((prevItems) =>
      prevItems.map((item) => item.$id === questionId ? { ...item, completed } : item
      )
    );
    try {
      await service.updateQuestionStatus(questionId, completed);
    } catch (error) {
      console.error('Error updating question status:', error);
      setItems((prevItems) =>
        prevItems.map((item) => item.$id === questionId ? { ...item, completed: !completed } : item
        )
      );
    }
  };

  const handleSearchChange = async (e, title) => {
    const searchTerm = e.target.value;
    setSearchTerms({ ...searchTerms, [title]: searchTerm });

    if (searchTerm.trim() === '') {
      const user = await authService.getCurrentUser();
      if (user) {
        const result = await service.getQuestions(user.$id);
        if (result && result.documents) {
          setSearchResults((prevResults) => ({
            ...prevResults,
            [title]: result.documents.filter((item) => item.title === title),
          }));
        }
      }
    } else {
      const result = await service.searchQuestions(searchTerm);
      if (result && result.documents) {
        setSearchResults((prevResults) => ({
          ...prevResults,
          [title]: result.documents.filter((item) => item.title === title),
        }));
      }
    }
  };

  const handlePickRandom = (title) => {
    const filtered = items.filter((item) => item.title === title);
    if (filtered.length > 0) {
      const randomIndex = Math.floor(Math.random() * filtered.length);
      setRandomQuestion(filtered[randomIndex]);
    }
  };

  useEffect(() => {
    if (randomQuestion) {
      navigate(`/question/${randomQuestion.$id}`);
    }
  }, [randomQuestion, navigate]);

  const getCompletedCount = (title) => {
    const filtered = items.filter((item) => item.title === title);
    const completed = filtered.filter((item) => item.completed).length;
    return `${completed}/${filtered.length} Done`;
  };

  return (
    <div className='flex flex-col items-center'>
      {titles.map((title) => (
        <AccordionItem
          key={title}
          title={title}
          expanded={expanded}
          handleExpand={handleExpand}
          handlePickRandom={handlePickRandom}
          searchTerm={searchTerms[title] || ''}
          handleSearchChange={handleSearchChange}
          getCompletedCount={getCompletedCount}
          items={items}
          searchResults={searchResults}
          handleCheckboxChange={handleCheckboxChange}
          navigate={navigate}
        />
      ))}
    </div>
  );
};

export default DSA_Headers;
