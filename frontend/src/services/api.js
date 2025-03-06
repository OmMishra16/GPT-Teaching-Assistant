const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

export const sendMessage = async (message, leetcodeUrl, sessionId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({ message, leetcodeUrl, sessionId }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error:', error);
    return { success: false, error: error.message };
  }
};

export const getProblemDetails = async (problemSlug) => {
  try {
    // Clean the slug by removing any query parameters
    const cleanSlug = problemSlug.split('?')[0].split('#')[0];
    
    console.log(`Requesting problem details for: ${cleanSlug}`);
    
    const response = await fetch(`${API_BASE_URL}/problems/${cleanSlug}`, {
      method: 'GET',
      headers: defaultHeaders,
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error (${response.status}): ${errorText}`);
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Problem details response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching problem details:', error);
    return { success: false, error: error.message };
  }
};

export const validateLeetCodeUrl = async (url) => {
  try {
    // Extract problem slug from URL, ignoring query parameters
    const urlMatch = url.match(/leetcode\.com\/problems\/([^\s/?]+)/);
    if (!urlMatch) {
      return { success: true, isValid: false };
    }
    
    const problemSlug = urlMatch[1];
    const response = await fetch(`${API_BASE_URL}/problems/validate/${problemSlug}`, {
      method: 'GET',
      headers: defaultHeaders,
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error:', error);
    return { success: false, error: error.message };
  }
};

export const getChatHistory = async (sessionId) => {
  const response = await fetch(`${API_BASE_URL}/chat/${sessionId}`);
  return response.json();
};
