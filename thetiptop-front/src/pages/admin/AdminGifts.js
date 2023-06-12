import React, { useContext, useState } from 'react';

import useApiError from '../../hooks/useApiError';
import Layout from '../../components/layout/Layout';
import SearchWrapper from '../../components/shared/SearchWrapper';
import { ErrorContext } from '../../context/ErrorContext';
import { trackCheckoutGift } from '../../helpers/googleAnalytics';
import { giftService } from '../../services/giftService';


function AdminGifts() {
  /* eslint-disable-next-line no-unused-vars */
  const [state, dispatch] = useContext(ErrorContext);
  const [gifts, setGifts] = useState([]);
  const [filtersFromParams, setFiltersFromParams] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, updateApiError, resetApiError] = useApiError();
  const ALLOWED_PARAMS_FILTERS = {
    picked: ['ALL', 'TRUE', 'FALSE'],
    played: ['ALL', 'TRUE', 'FALSE'],
    checkedOut: ['ALL', 'TRUE', 'FALSE'],
  };

  const handleCheckout = async (gift) => {
    const result = await giftService.checkout(
        gift.id,
        { checkedOut: !gift.checkedOut },
    );

    dispatch({
      type: 'SHOW_SUCCESS',
      payload: result.data.content,
    });

    setGifts(gifts.map((oldGift) =>
      (oldGift.id === gift.id ?
        { ...gift, checkedOut: !gift.checkedOut } :
        oldGift
      ),
    ));

    trackCheckoutGift(gift.UserId);
  };


  const handleDelete = async (id) => {
    const result = await giftService.deleteById(id);
    dispatch({
      type: 'SHOW_SUCCESS',
      payload: result.data.content,
    });

    setGifts(gifts.filter((gift) => gift.id !== id));
  };

  const searchProps = (value) =>
    [value.typeDisplay, value.code, value.UserId];

  const fetchGifts = async () => {
    try {
      const gifts = await giftService.getAll();
      setGifts(gifts.data.content);
      setIsLoading(false);
      resetApiError();
    } catch (error) {
      setIsLoading(false);
      updateApiError(error);
    }
  };

  React.useEffect(() => {
    fetchGifts();
  }, []);

  return (
    <Layout
      pageTitle="Gifts"
      metaTitle="Gifts"
      width='8xl'
      showAdminSidebar={true}
      withDefaultPadding={true}
    >
      <SearchWrapper
        searchType='gifts'
        data={gifts}
        searchProps={searchProps}
        filtersFromParams={filtersFromParams}
        setFiltersFromParams={setFiltersFromParams}
        isLoading={isLoading}
        ALLOWED_PARAMS_FILTERS={ALLOWED_PARAMS_FILTERS}
        handleCheckout={handleCheckout}
        handleDelete={handleDelete}
        apiError={apiError}
      />
    </Layout>
  );
}

export default AdminGifts;
