import { useQuery } from '@tanstack/react-query';
import { fetchAllContent, fetchSectionContent } from '../services/contentService.js';

const useContent = (section) => {
  const queryFn = section ? () => fetchSectionContent(section) : fetchAllContent;
  return useQuery({ queryKey: ['content', section || 'all'], queryFn });
};

export default useContent;
