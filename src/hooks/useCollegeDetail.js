import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const fetchCollegeDetail = async (id) => {
  const { data } = await axios.get(`${BACKEND_URL}/api/colleges?filters[id][$eq]=${id}&populate=*`);
  return data.data[0] || null;
};

export default function useCollegeDetail(id) {
  return useQuery({
    queryKey: ['college', id],
    queryFn: () => fetchCollegeDetail(id),
    enabled: !!id,
  });
}
