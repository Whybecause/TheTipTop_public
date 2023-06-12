import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import {
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  FormControl,
  Textarea,
} from '@chakra-ui/react';
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdOutlineEmail,
} from 'react-icons/md';
import { BsPerson } from 'react-icons/bs';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

import { ErrorContext } from '../context/ErrorContext';
import { mailService } from '../services/mailService';
import { mailRegex } from '../config/variables';
import Layout from '../components/layout/Layout';
import { MyInput, MyLabel } from '../styled-components';

function Contact() {
  /* eslint-disable-next-line no-unused-vars */
  const [state, dispatch] = useContext(ErrorContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleSendMessage = async (data) => {
    const result = await mailService.sendMail('contact', data);
    dispatch({
      type: 'SHOW_SUCCESS',
      payload: result.data.content,
    });
  };

  return (
    <Layout width='100vw' pageTitle="Contact" metaTitle="Contactez-nous">
      <Flex margin="0 auto">
        <Box
          bg="brand.green1"
          color="black"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
        >
          <Box p={4} display="flex" flexDir={{ base: 'column', md: 'row' }}>

            <Box pr='5' mb='5'>
              <Heading>Une question?</Heading>
              <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                    Remplissez le formulaire et <br/>
                    nous vous répondrons dans les plus brefs délais.
              </Text>

              <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                <VStack pl={0} spacing={3} alignItems="flex-start">
                  <Button
                    size="md"
                    height="48px"
                    width="300px"
                    variant="secondary"
                    leftIcon={<MdPhone size="20px" />}>
                        01000000
                  </Button>
                  <Button
                    size="md"
                    height="48px"
                    width="300px"
                    variant="secondary"
                    leftIcon={<MdEmail size="20px" />}>
                        thetiptopg1analytics@gmail.com
                  </Button>
                  <Button
                    size="md"
                    height="48px"
                    width="300px"
                    variant="secondary"
                    leftIcon={<MdLocationOn size="20px" />}>
                        Paris, France
                  </Button>
                </VStack>
              </Box>

              <HStack
                mt={{ lg: 10, md: 10 }}
                spacing={5}
                px={5}
                alignItems="flex-start">
                <IconButton
                  aria-label="twitter"
                  size="lg"
                  isRound={true}
                  _hover={{ bg: '#0D74FF' }}
                  icon={<FaTwitter size="28px" />}
                />
                <IconButton
                  aria-label="youtube"
                  size="lg"
                  isRound={true}
                  _hover={{ bg: '#0D74FF' }}
                  icon={<FaYoutube size="28px" />}
                />
                <IconButton
                  aria-label="instagram"
                  size="lg"
                  isRound={true}
                  _hover={{ bg: '#0D74FF' }}
                  icon={<FaInstagram size="28px" />}
                />
              </HStack>
            </Box>

            <Box bg="white" borderRadius="lg">
              <Box m={8} color="#0B0E3F">
                <VStack
                  as="form"
                  spacing={5}
                  onSubmit={handleSubmit(handleSendMessage)}
                >

                  <MyInput
                    value="name"
                    type="text"
                    label="Votre nom"
                    placeholder="Votre nom"
                    id="nameContact"
                    register={register}
                    errors={errors}
                    required={true}
                    leftIcon={<BsPerson color="gray.800" />}
                  />

                  <MyInput
                    value="email"
                    type="email"
                    label="Mail"
                    placeholder="Votre mail"
                    id="mailContact"
                    register={register}
                    errors={errors}
                    required={true}
                    pattern={mailRegex}
                    leftIcon={<MdOutlineEmail color="gray.800" />}
                  />

                  <FormControl id="message">
                    <MyLabel
                      label="Message"
                      htmlFor="message"
                      isRequired
                    />
                    <Textarea
                      focusBorderColor = 'brand.green4'
                      borderColor = 'brand.green2'
                      placeholder="Entrez votre message"
                      bg="brand.green5"
                      {...register('message', { required: true })}
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    w="full"
                    isLoading={isSubmitting}
                  >
                        Envoyer
                  </Button>

                </VStack>
              </Box>
            </Box>

          </Box>
        </Box>
      </Flex>
    </Layout>
  );
}

export { Contact };
