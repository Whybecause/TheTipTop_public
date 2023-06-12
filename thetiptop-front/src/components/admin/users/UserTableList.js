import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-chakra-pagination';
import { Box, Heading } from '@chakra-ui/react';

import { MySpinner } from '../../../styled-components';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { FiUser } from 'react-icons/fi';
import { handlePlural } from '../../../helpers/handlePlural';

function UserTableList({
  users,
  page,
  handlePageChange,
  isLoading,
}) {
  const tableData = users?.map((user, key) => ({
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    newsletter: (
      user.acceptedNewsletter ?
      <CheckIcon color="green" /> :
      <CloseIcon color="red.500" />
    ),
    role: user.role,
    action: (
      <a href={`/admin/user/${user.id}`}>EDIT</a>
    ),
  }));

  // Accessor to get a data in user object
  const tableColumns = [
    {
      Header: 'Id',
      accessor: 'id',
    },
    {
      Header: 'Username',
      accessor: 'username',
    },
    {
      Header: 'Firstname',
      accessor: 'firstName',
    },
    {
      Header: 'Lastname',
      accessor: 'lastName',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Newsletter',
      accessor: 'newsletter',
    },
    {
      Header: 'Role',
      accessor: 'role',
    },
    {
      Header: '',
      accessor: 'action',
    },
  ];

  let content;

  if (isLoading) {
    content = (<MySpinner />);
  } else {
    content = (
      <Box overflowX={'auto'}>
        <Heading size="sm" as="h3">
          {users?.length ?
            `${users?.length} ${handlePlural(users?.length, 'résultat')}` :
            '0 résultats'}
        </Heading>

        <Box mt="6">
          <Table
            colorScheme="brand.green1"
            // Fallback component when list is empty
            emptyData={{
              icon: FiUser,
              text: 'No user founded.',
            }}
            totalRegisters={users?.length}
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
}

UserTableList.propTypes = {
  users: PropTypes.array,
  page: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default UserTableList;
