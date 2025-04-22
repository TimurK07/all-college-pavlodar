import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const fetchColleges = async () => {
  const { data } = await axios.get(`${BACKEND_URL}/api/colleges?populate=*`);
  return data;
};

export default function useColleges() {
  return useQuery({
    queryKey: ['colleges'],
    queryFn: fetchColleges,
  });
}
