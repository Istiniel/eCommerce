import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/redux/hooks';
import { selectCustomer } from '../../app/redux/features/AuthSlice/AuthSlice';

const useProtectedPage = () => {
  const navigate = useNavigate();
  const customer = useAppSelector(selectCustomer);

  useEffect(() => {
    if (!customer) {
      navigate('/', { replace: true });
    }
  }, [customer, navigate]);

};

export default useProtectedPage;
