import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { FiGift } from 'react-icons/fi';

import { userService } from '../../services/userService';
import { ErrorContext } from '../../context/ErrorContext';
import Layout from '../../components/layout/Layout';
import Loading from '../../components/layout/Loading';
import UserEdit from '../../components/shared/UserEdit';
import RoleSelect from '../../components/admin/users/edit/RoleSelect';
import NewsletterStatus
  from '../../components/admin/users/edit/NewsletterStatus';
import UserDelete from '../../components/shared/UserDelete';
import ErrorMessage from '../../components/error/ErrorMessage';
import GiftCard from '../../components/dashboard/user/GiftCard';
import { giftService } from '../../services/giftService';
import { SessionContext } from '../../context/SessionContext';
import { ROLES } from '../../config/roles';
import { trackCheckoutGift } from '../../helpers/googleAnalytics';

function AdminUserEdit() {
  const params = useParams();
  /* eslint-disable-next-line no-unused-vars */
  const [state, dispatch] = useContext(ErrorContext);
  const [user, setUser] = useState({ username: 'User Edit' });
  const session = useContext(SessionContext);
  const isAdmin = session.role === ROLES.ADMIN;
  const [userGifts, setUserGifts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const getUser = async () => {
    try {
      const result = await userService.getById(params.id);
      setUser(result.data.content);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getUserGifts = async () => {
    try {
      const result = await giftService.getUserGifts(params.id);
      setUserGifts(result.data.content);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleAdminCheckout = async (gift) => {
    const result = await giftService.checkout(
        gift.id,
        { checkedOut: !gift.checkedOut },
    );

    dispatch({
      type: 'SHOW_SUCCESS',
      payload: result.data.content,
    });

    setUserGifts(userGifts.map((oldGift) =>
      (oldGift.id === gift.id ?
        { ...gift, checkedOut: !gift.checkedOut } :
        oldGift
      ),
    ));

    trackCheckoutGift(gift.UserId);
  };

  const onUserSave = async (data) => {
    const result = await userService.update(params.id, data);
    dispatch({
      type: 'SHOW_SUCCESS',
      payload: result.data.message,
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getUserGifts();
  }, []);

  let giftList;

  if (!userGifts?.length) {
    giftList = (
      <Box
        margin="0 auto"
        mb='2em'
        p="5"
        bg="gray.100"
        rounded="lg"
        width={{ base: '100%', md: '50%' }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Icon as={FiGift} w='20px' h='20px'/>
        <Text ml='2' fontSize="lg">Cet utilisateur n&apos; aucun gift</Text>
      </Box>
    );
  } else {
    giftList = (
      <SimpleGrid columns={[1, 2, 2]} spacing={10}>
        {userGifts.map((gift) => (
          <GiftCard
            key={gift.id}
            gift={gift}
            type='admin'
            handleAdminCheckout={handleAdminCheckout}
          />
        ))}
      </SimpleGrid>
    );
  }


  let content = (
    <>
      {giftList}

      {isAdmin && (
        <>
          <NewsletterStatus
            hasAcceptedNewsletter={user.acceptedNewsletter ? true : false}
          />

          <form onSubmit={handleSubmit(onUserSave)}>
            <RoleSelect user={user} register={register}/>
            <UserEdit
              user={user}
              register={register}
              errors={errors}
            />
            <Flex
              mt={['1em', null, null, null]}
              justifyContent="center"
              alignItems="center"
            >
              <Button
                type="submit"
                variant="secondary"
                isLoading={isSubmitting}
              >
                Sauvegarder les changements
              </Button>
            </Flex>
          </form>


          <Divider my='2em'/>
          <UserDelete userId={params.id} setUser={setUser} />
        </>
      )}
    </>
  );

  // Case: no user found
  if (Object.keys(user)?.length === 1 && !isLoading) {
    content = (
      <ErrorMessage
        content='Ooops...Impossible d&apos;accéder à cet utilisateur'
      />
    );
  }


  return (
    <Layout
      pageTitle={user.username}
      metaTitle={user.username}
      width='8xl'
      showAdminSidebar={true}
    >
      <Loading isLoading={isLoading}>
        <Box p='2'>{content}</Box>
      </Loading>
    </Layout>
  );
}

export default AdminUserEdit;
