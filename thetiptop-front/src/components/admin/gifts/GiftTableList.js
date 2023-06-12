import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table } from 'react-chakra-pagination';
import {
  Flex,
  Text,
  Box,
  Button,
  Heading,
  Avatar,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';

import { SessionContext } from '../../../context/SessionContext';
import { ROLES } from '../../../config/roles';
import DeleteGift from './DeleteGift';
import { FiGift } from 'react-icons/fi';
import { MySpinner } from '../../../styled-components';
import { handlePlural } from '../../../helpers/handlePlural';

export default function GiftTableList({
  gifts,
  page,
  handlePageChange,
  handleCheckout,
  handleDelete,
  isLoading,
}) {
  const navigate = useNavigate();
  const session = useContext(SessionContext);
  const isAdmin = session.role === ROLES.ADMIN;

  // Formatter for each gift
  const tableData = gifts?.map((gift, key) => ({
    id: gift.id,
    type: (
      <Flex key={key} align="center">
        <Avatar
          size="xs"
          src={`/img/${gift.typeDisplay}.jpg`}
          alt={gift.typeDisplay} />
        &nbsp;
        <Text>{gift.typeDisplay}</Text>
      </Flex>
    ),
    code: gift.code,
    picked: (
     gift.picked ?
     <CheckIcon color="green" /> :
     <CloseIcon color="red.500" />
    ),
    played: (
      gift.UserId ?
      <>
        <Button
          variant="outline"
          onClick={() => navigate(`/admin/user/${gift.UserId}`)}
        >
            UserId: {gift.UserId}
            &nbsp;
          <EditIcon />
        </Button>
      </> :
      <CloseIcon color="red.500" />
    ),
    checkedOut: (
        gift.checkedOut ?
          <CheckIcon color="green" /> :
          <CloseIcon color="red.500" />
    ),
    action: (
      <Flex justifyContent="space-between" alignItems="center">
        <Button
          w='100px'
          disabled={gift.UserId ? false : true}
          variant={gift.checkedOut ? 'secondary' : 'primary'}
          onClick={() => handleCheckout(gift)}
        >
          {gift.checkedOut ? 'Uncheck' : 'Check' }
        </Button>
        {isAdmin && (
          <DeleteGift id={gift.id} handleDelete={handleDelete} />
        )}
      </Flex>
    ),
  }));

  // Accessor to get a data in user object
  const tableColumns = [
    {
      Header: 'Id',
      accessor: 'id',
    },
    {
      Header: 'Type',
      accessor: 'type',
    },
    {
      Header: 'Picked',
      accessor: 'picked',
    },
    {
      Header: 'Played',
      accessor: 'played',
    },
    {
      Header: 'Checked Out',
      accessor: 'checkedOut',
    },
    {
      Header: '',
      accessor: 'action',
    },
  ];

  const CodeColumn = {
    Header: 'Code',
    accessor: 'code',
  };

  // Add the gift code display only for admins
  if (isAdmin) {
    tableColumns.splice(1, 0, CodeColumn);
  }

  let content;

  if (isLoading) {
    content = (<MySpinner />);
  } else {
    content = (
      <Box overflowX={'auto'}>
        <Heading size="sm" as="h3">
          {gifts?.length ?
            `${gifts?.length} ${handlePlural(gifts?.length, 'résultat')}` :
            '0 résultats'}
        </Heading>

        <Box mt="6">
          <Table
            colorScheme="brand.green1"
            // Fallback component when list is empty
            emptyData={{
              icon: FiGift,
              text: 'Aucun gift existant.',
            }}
            totalRegisters={gifts?.length}
            page={page}
            // Listen change page event and control the current page using state
            onPageChange={(page) => {
              handlePageChange(page);
            }}
            columns={tableColumns}
            data={tableData?.length ? tableData : []}
          />
        </Box>
      </Box>
    );
  }

  return (<>{content}</>);
};

GiftTableList.propTypes = {
  gifts: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  handleCheckout: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
