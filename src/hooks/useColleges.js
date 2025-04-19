import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchColleges = async () => {
  const { data } = await axios.get('http://localhost:1337/api/colleges?populate=*');
  return data;
};

export default function useColleges() {
  return useQuery({
    queryKey: ['colleges'],
    queryFn: fetchColleges,
  });
}
